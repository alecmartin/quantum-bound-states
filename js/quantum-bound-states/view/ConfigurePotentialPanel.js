// Copyright 2002-2015, University of Colorado Boulder

/**
* Draws the top panel containing the configure potential button and the superposition state button
* Also holds the potential combo box to switch between potentials
*/
define( function( require ) {
  'use strict';

  // modules
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var ConfigureSquareAsymPanel = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/potentials/ConfigureSquareAsymPanel' );
  var ConfigureCoulombPanel = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/potentials/ConfigureCoulombPanel' );
  var ConfigureHarmonicOscillatorPanel = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/potentials/ConfigureHarmonicOscillatorPanel' );
  var Coulomb1DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DPotential' );
  var Coulomb3DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DPotential' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  
  
/**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function ConfigurePotentialPanel( model, options ) {
    Node.call( this );
    
    var boxWidth = 240;
    var sliderPadding = 32;

    var optionFont = { font: new PhetFont( 14 ), fill: "palegoldenrod" };
    
    var buttonOptions = {
      font: optionFont,
      baseColor: 'lightgrey',
      xMargin: 10,
      minWidth: 100,
      scale: 1.5,
      listener: function() {
        model.showConfigurePotentialPanelProperty.value = false;
      }
    };

    var getSliderProperties = function( property, rangeMin, rangeMax, pattern ){
      var sliderProperties = {
        type: 'button',
        buttonStep: 0.1,
        sliderSize: new Dimension2( 200, 80 ),
        property: property,
        patternValueUnit: pattern,
        rounding: 1,
        range: new Range( rangeMin, rangeMax ),
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
        tick: { step: 0.1, minText: String( rangeMin ), maxText: String( rangeMax ), midTick: false }
      };
      return sliderProperties;
    };
    
    var configureSquarePanel = new ConfigureSquareAsymPanel( model.potentials[ 0 ], buttonOptions, getSliderProperties, boxWidth );
    var configureAsymPanel = new ConfigureSquareAsymPanel( model.potentials[ 1 ], buttonOptions, getSliderProperties, boxWidth );
    var configure1DCoulombPanel = new ConfigureCoulombPanel( model.potentials[ 2 ], buttonOptions, getSliderProperties, boxWidth );
    var configure3DCoulombPanel = new ConfigureCoulombPanel( model.potentials[ 3 ], buttonOptions, getSliderProperties, boxWidth );
    var configureHarmonicOscillatorPanel = new ConfigureHarmonicOscillatorPanel( model.potentials[ 4 ], buttonOptions, getSliderProperties, boxWidth );

    this.addChild( configureSquarePanel );
    this.addChild( configureAsymPanel );
    this.addChild( configure1DCoulombPanel );
    this.addChild( configure3DCoulombPanel );
    this.addChild( configureHarmonicOscillatorPanel );

    var setPotentialWellProperties = function() {
      var potential = model.currentPotentialProperty.value;
      configureSquarePanel.visible = false;
      configureAsymPanel.visible = false;
      configure1DCoulombPanel.visible = false;
      configure3DCoulombPanel.visible = false;
      configureHarmonicOscillatorPanel.visible = false;
      if ( potential instanceof SquareWellPotential ) {
        configureSquarePanel.visible = model.showConfigurePotentialPanelProperty.value;
      }
      else if ( potential instanceof AsymmetricPotential ) {
        configureAsymPanel.visible = model.showConfigurePotentialPanelProperty.value;
      }
      else if ( potential instanceof Coulomb1DPotential ) {
        configure1DCoulombPanel.visible = model.showConfigurePotentialPanelProperty.value;
      }
      else if ( potential instanceof Coulomb3DPotential ) {
        configure3DCoulombPanel.visible = model.showConfigurePotentialPanelProperty.value;
      }
      else if ( potential instanceof HarmonicOscillatorPotential ) {
        configureHarmonicOscillatorPanel.visible = model.showConfigurePotentialPanelProperty.value;
      }
    };
    
    setPotentialWellProperties();
    this.mutate( options );
    
    // link the visibility of this panel to a button press
    model.showConfigurePotentialPanelProperty.link( setPotentialWellProperties );
    
    //link the currentPotentialPanel
    model.currentPotentialProperty.link( setPotentialWellProperties );
  }

  return inherit( Node, ConfigurePotentialPanel );

} );
