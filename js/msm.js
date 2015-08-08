/*
 * msm.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $ */

var msm = (function () {
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {},
    stateMap  = {
      $docbox      : null,
      idto_resize  : undefined,
      opacity_num  : 1
    },

    jqueryMap = {},

    setJqueryMap, setSunOpacity,
    onClick,      onResize,

    initModule;

  //----------------- END MODULE SCOPE VARIABLES ---------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin private DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $docbox = stateMap.$docbox;
    jqueryMap = {
      $clickers : $docbox.find( 'h1,h2,h3,p,li' ),
      $box      : $docbox.find( '.msm-box' ),
      $sun      : $docbox.find( '.msm-sun' ),
      $window   : $( window )
    };
  };
  // End private DOM method /setJqueryMap/

  // Begin private DOM method /setSunOpacity/
  setSunOpacity = function () {
    stateMap.opacity_num = stateMap.opacity_num === 1 ?
      (Math.random() * 0.5 + 0.2).toFixed(2)
      : 1;

    // css3 takes care of smooth transitions
    jqueryMap.$sun.css( 'opacity', stateMap.opacity_num );
    setTimeout( function () {
      setSunOpacity();
    }, 2500 );
  };
  // End private DOM method /setSunOpacity/
  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // Begin private event handler /onClick/
  onClick = function ( event ) {
    var $clicked = $( this );
    $clicked.css( 'background-color', '#fff');
    setTimeout( function () {
      $clicked.css( 'background-color', '' );
    }, 500 );
  };
  // End private event handler /onClick/

  // Begin private event handler /onResize/
  onResize = function ( event ) {
    var width, margin_width;
    if ( stateMap.idto_resize ){ return; }
    stateMap.idto_resize = setTimeout( function (){
      stateMap.idto_resize = undefined;
    }, 200 );

    // we do this later because it is expensive
    width = $(this).width();
    if ( width > 992 ) {
      margin_width = Math.floor( ( width - 960 ) / 2 );
      jqueryMap.$box.css({
          'margin-left'  : margin_width,
          'margin-right' : margin_width
      });
    }
    else {
      jqueryMap.$box.css({
        'margin-left'  : '',
        'margin-right' : ''
      });
    }
  };
  // End private event handler /onResize/
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /initModule/
  initModule = function ( $docbox ) {
    stateMap.$docbox = $docbox;
    setJqueryMap();

    // hook up event handlers
    jqueryMap.$window.on( 'resize', onResize );
    jqueryMap.$clickers.on( 'click', onClick );

    // initial conditions - get content centered, sun glow
    onResize( window );
    setSunOpacity();
  };
  // End public method /initModule/

  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
// End /msm/ root namespace
