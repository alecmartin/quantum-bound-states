// Copyright 2002-2015, University of Colorado Boulder

/**
* Configure potential panel for the harmonic oscillator well
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

  // strings
  var offsetString = require( 'string!QUANTUM_BOUND_STATES/offset-string' );
  var frequencyString = require( 'string!QUANTUM_BOUND_STATES/frequency-string' );
  var electronVoltString = require( 'string!QUANTUM_BOUND_STATES/electron-volt' );
  var fsinverseString = require( 'string!QUANTUM_BOUND_STATES/fs.inverse' );
  var closeString = require( 'string!QUANTUM_BOUND_STATES/close-string' );
  
/**
  * @param {PotentialWell} potential
  * @param {TextPushButton} closeButton
  * @param {function} getSliderProperties
  * @constructor
  */
  function ConfigureHarmonicOscillatorPanel( potential, buttonOptions, getSliderProperties, boxWidth, options ) {
    var optionFont = { font: new PhetFont( 14 ), fill: "palegoldenrod" };
    var offsetText = new Text( offsetString, optionFont );
    var frequencyText = new Text( frequencyString, optionFont );

    var frequencyRange = QuantumBoundStatesConstants.FREQUENCY_RANGE;
    
    var offsetSlider = new Slider( 
      getSliderProperties( potential.wellOffsetProperty, potential.minEnergy, potential.maxEnergy, electronVoltString )
    );
    var frequencySlider = new Slider( 
      getSliderProperties( potential.frequencyProperty, frequencyRange.min, frequencyRange.max, fsinverseString )
    );

    var width = offsetSlider.width;
    var height = offsetSlider.height;
    var offsetSliderRectangle = new Rectangle( 0, 0, width, height, 0, 0, { fill:'black' } );
    offsetSliderRectangle.addChild( offsetSlider );
    var frequencySliderRectangle = new Rectangle( 0, 0, width, height, 0, 0, { fill:'black' } );
    frequencySliderRectangle.addChild( frequencySlider );

    var offsetHBox = new HBox( { children:
      [ new HStrut( 10 ),
        new VStrut( 10 ),
        offsetSliderRectangle,
        new HStrut( 15 ) ]
    } );
    var frequencyHBox = new HBox( { children:
      [ new HStrut( 10 ),
        new VStrut( 10 ),
        frequencySliderRectangle,
        new HStrut( 15 ) ]
    } );
    
    var closeButton = new TextPushButton( closeString, buttonOptions );
    
    var configurePotentialVBox = new VBox( {
      children: [
        new HBox( { children: [ new HStrut( boxWidth - 20 ) ] } ),
        offsetText,
        offsetHBox, 
        frequencyText,
        frequencyHBox, 
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

  return inherit( Panel, ConfigureHarmonicOscillatorPanel );

} );
