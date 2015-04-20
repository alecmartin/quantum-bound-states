// Copyright 2002-2015, University of Colorado Boulder

/**
* Constructor for the panel that holds the mass slider
*/
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Range = require( 'DOT/Range' );
  var Shape = require( 'KITE/Shape' );
  var Slider = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/Slider' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  
  //strings
  var particleMassString = require( 'string!QUANTUM_BOUND_STATES/bottom-chart-particle-mass' );

  /**
  * @param {Property} particleMassProperty
  * @constructor
  */
  function ParticleMassPanel( particleMassProperty, options ) {

    // constants
    var optionFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    
    //boxWidth specifies the width of the panel
    var boxWidth = 240;
    var sliderPadding = 32;
    var arrowHeight = 15;
    var arrowWidth = arrowHeight * (Math.sqrt( 3 ) / 2); // height of equilateral triangle
    var rightArrow = new Path( null, { fill: 'black' } );
    var leftArrow = new Path( null, { fill: 'black' } );
    var particleMassMin = QuantumBoundStatesConstants.PARTICLE_MASS_RANGE.min * QuantumBoundStatesConstants.ELECTRON_MASS;
    var particleMassMax = QuantumBoundStatesConstants.PARTICLE_MASS_RANGE.max * QuantumBoundStatesConstants.ELECTRON_MASS;
    rightArrow.shape = new Shape().moveTo( 0, 0 ).lineTo( 0, arrowHeight ).lineTo( arrowWidth, arrowHeight /2 ).close(); 
    leftArrow.shape = new Shape().moveTo( arrowWidth, 0 ).lineTo( arrowWidth, arrowHeight ).lineTo( 0, arrowHeight /2 ).close(); // down arrow
    
    var particleMassSlider = new Slider( {
      type: 'button',
      buttonStep: ( particleMassMax - particleMassMin ) / 10,
      title: "",
      sliderSize: new Dimension2( 200, 80 ),
      property: particleMassProperty,
      patternValueUnit: " mₑ",
      titleDivisor: QuantumBoundStatesConstants.ELECTRON_MASS,
      rounding: 2,
      range: new Range( particleMassMin, particleMassMax ),
      trackSize: new Dimension2( boxWidth - (2 * sliderPadding), 2 ),
      thumbSize: new Dimension2( 11, 22 ),
      trackStroke: 'white',
      trackFill: 'white',
      majorTickStroke: 'white',
      minorTickStroke: 'black',
      textFont: new PhetFont( 14 ),
      labelFont: new PhetFont( 12 ),
      labelColor: 'white',
      textColor: 'black',
      arrowHeight: 13,
      trackLineWidth: 0.2,
      tick: {
        step: 0.1,
        minText: String( QuantumBoundStatesConstants.PARTICLE_MASS_RANGE.min  ),
        maxText: String( QuantumBoundStatesConstants.PARTICLE_MASS_RANGE.max ),
        midTick: false
      }
    } );

    
    var particleMassVBox = new VBox( {
      children: [ 
        new HBox( { children: [ new HStrut( boxWidth - 20 ) ] } ),
        new HBox( { children: [ new HStrut( 10 ), new Text( particleMassString, optionFont ), new HStrut( 15 ) ] } ), 
        new HBox( { children: [ new HStrut( 10 ), particleMassSlider ] } ), 
      ],
      align: 'left'
    } );

    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    }, options );
    Panel.call( this, particleMassVBox, options );

  }
  return inherit( Panel, ParticleMassPanel );

} );