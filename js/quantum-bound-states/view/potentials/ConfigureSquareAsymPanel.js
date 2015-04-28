// Copyright 2002-2015, University of Colorado Boulder

/**
* Configure potential panel for square and asymmetric wells
*/
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Slider = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/Slider' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SUN/VStrut' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );

  var offsetString = require( 'string!QUANTUM_BOUND_STATES/offset-string' );
  var widthString = require( 'string!QUANTUM_BOUND_STATES/width-string' );
  var heightString = require( 'string!QUANTUM_BOUND_STATES/height-string' );
  var electronVoltString = require( 'string!QUANTUM_BOUND_STATES/electron-volt' );
  var nanometerString = require( 'string!QUANTUM_BOUND_STATES/nanometer' );
  var closeString = require( 'string!QUANTUM_BOUND_STATES/close-string' );
  
/**
  * @param {PotentialWell} potential
  * @param {TextPushButton} closeButton
  * @param {function} getSliderProperties
  * @constructor
  */
  function ConfigureSquareAsymPanel( potential, buttonOptions, getSliderProperties, boxWidth, options ) {
    var optionFont = { font: new PhetFont( 14 ), fill: "palegoldenrod" };
    var offsetText = new Text( offsetString, optionFont );
    var widthText = new Text( widthString, optionFont );
    var heightText = new Text( heightString, optionFont );

    var wellWidthRange = QuantumBoundStatesConstants.WELL_WIDTH_RANGE;
    var wellHeightRange = QuantumBoundStatesConstants.WELL_HEIGHT_RANGE;
    
    var offsetSlider = new Slider( 
      getSliderProperties( potential.wellOffsetProperty, potential.minEnergy, potential.maxEnergy, electronVoltString )
    );
    var widthSlider = new Slider( 
      getSliderProperties( potential.wellWidthProperty, wellWidthRange.min, wellWidthRange.max, nanometerString )
    );
    var heightSlider = new Slider( 
      getSliderProperties( potential.wellHeightProperty, wellHeightRange.min, wellHeightRange.max, electronVoltString )
    );

    var width = offsetSlider.width;
    var height = offsetSlider.height;
    var offsetSliderRectangle = new Rectangle( 0, 0, width, height, 0, 0, { fill:'black' } );
    offsetSliderRectangle.addChild( offsetSlider );
    var widthSliderRectangle = new Rectangle( 0, 0, width, height, 0, 0, { fill:'black' } );
    widthSliderRectangle.addChild( widthSlider );
    var heightSliderRectangle = new Rectangle( 0, 0, width, height, 0, 0, { fill:'black' } );
    heightSliderRectangle.addChild( heightSlider );

    var offsetHBox = new HBox( { children:
      [ new HStrut( 10 ),
        new VStrut( 10 ),
        offsetSliderRectangle,
        new HStrut( 15 ) ]
    } );
    var widthHBox = new HBox( { children:
      [ new HStrut( 10 ),
        new VStrut( 10 ),
        widthSliderRectangle,
        new HStrut( 15 ) ]
    } );
    var heightHBox = new HBox( { children:
      [ new HStrut( 10 ),
        new VStrut( 10 ),
        heightSliderRectangle,
        new HStrut( 15 ) ]
    } );
    
    var closeButton = new TextPushButton( closeString, buttonOptions );
    
    var configurePotentialVBox = new VBox( {
      children: [
        new HBox( { children: [ new HStrut( boxWidth - 20 ) ] } ),
        offsetText,
        offsetHBox, 
        widthText,
        widthHBox,
        heightText,
        heightHBox, 
        closeButton,
      ],
      align: 'center',
      spacing: 8
    } );
    
    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    }, options );
    
    Panel.call( this, configurePotentialVBox, options );
  }

  return inherit( Panel, ConfigureSquareAsymPanel );

} );
