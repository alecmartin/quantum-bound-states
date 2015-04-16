// Copyright 2002-2015, University of Colorado Boulder

/**
* Draws the top panel containing the configure potential button and the superposition state button
* Also holds the potential combo box to switch between potentials
*/
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  // var PotentialComboBox = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialComboBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var VStrut = require( 'SUN/VStrut' );
  var Panel = require( 'SUN/Panel' );
  var Range = require( 'DOT/Range' );
  // var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var Coulomb1DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DPotential' );
  var Coulomb3DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DPotential' );
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var Slider = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/Slider' );


  var closeString = require( 'string!QUANTUM_BOUND_STATES/close-string' );
  var offsetString = require( 'string!QUANTUM_BOUND_STATES/offset-string' );
  // var widthString = require( 'string!QUANTUM_BOUND_STATES/width-string' );
  // var heightString = require( 'string!QUANTUM_BOUND_STATES/height-string' );
  // var harmonicString = require( 'string!QUANTUM_BOUND_STATES/harmonic-oscillator' );
  // var coulomb3dString = require( 'string!QUANTUM_BOUND_STATES/coulomb_3d' );
  // var coulomb1dString = require( 'string!QUANTUM_BOUND_STATES/coulomb_1d' );
  // var assymetricString = require( 'string!QUANTUM_BOUND_STATES/assymetric' );
  // var squareString = require( 'string!QUANTUM_BOUND_STATES/square' );
/**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function ConfigurePotentialPanel( model) {
    // Panel.call( this, options );
    var thisNode = this;

    var potentials;
    // optionfont
    var optionFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    var parent = new Node();
    // var potentialWellInstance = null;

    var potential = model.currentPotentialProperty.value;
    var potentialWellName = potential.name;
    var offsetHBox;
    var widthHBox;
    var heightHBox;

    //Sliders, so many sliders
    var squarePotentialOffsetSlider;
    var assymetricPotentialOffsetSlider;
    var coulomb1DPotentialOffsetSlider;
    var coulomb3DPotentialOffsetSlider;
    var harmonicPotentialOffsetSlider;
    var squarePotentialWidthSlider;
    var assymetricPotentialWidthSlider;
    var harmonicPotentialWidthSlider;
    var squarePotentialHeightSlider;
    var assymetricPotentialHeightSlider;

    //boxwidth
    var boxwidth = 240;
    var sliderPadding = 32;

    var closeButton = new TextPushButton( closeString, {
      font: optionFont,
      baseColor: 'lightgrey',
      xMargin: 10,
      minWidth: 100,
      scale: 1.5,
      listener: function() {
        model.showConfigurePotentialPanelProperty.value = false;
        // console.log(potentialWellName);
      }
    } );

    var sliderProperties = function(property, rangeMin, rangeMax){
      sliderProperties = {
      // sliderX: 60 - 630,
      type: 'button',
      buttonStep: 0.1,
      title: offsetString+":",
      sliderSize: new Dimension2( 200, 80 ),
      property: property,
      patternValueUnit: " Ev",
      rounding: 1,
      range: new Range( rangeMin, rangeMax ),
      trackSize: new Dimension2( boxwidth - (2 * sliderPadding), 2 ),
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
      // left: 10,
      // top: 10,
      trackLineWidth: 0.2,
      // titleVerticalOffset: -10,
      tick: { step: 0.1, minText: String(rangeMin), maxText: String(rangeMax), midTick: false }
    };
    return sliderProperties;
  };


  var init = function(){
    potentials = model.potentials;
    console.log(potentials);

      //build the sliders
      var potential;
      //square offset
      potential = potentials[0];
      console.log(potential);
      console.log("$$$$$$$$$$$$$$$$$");
      console.log(potential.minEnergy);
      console.log(potential.minEnergy.value);
      squarePotentialOffsetSlider = new Slider( 
        sliderProperties( potential.wellOffsetProperty, potential.minEnergy, potential.maxEnergy )
        );
            //assymetric offset
            potential = potentials[1];
      assymetricPotentialOffsetSlider = new Slider( 
        sliderProperties( potential.wellOffsetProperty, potential.minEnergy, potential.maxEnergy )
        );
                  //1D Coulomb offset
            potential = potentials[2];
      coulomb3DPotentialOffsetSlider = new Slider( 
        sliderProperties( potential.wellOffsetProperty, potential.minEnergy, potential.maxEnergy )
        );
                  //3D Coulomb offset
            potential = potentials[3];
      coulomb1DPotentialOffsetSlider = new Slider( 
        sliderProperties( potential.wellOffsetProperty, potential.minEnergy, potential.maxEnergy )
        );
                  //harmonic offset
            potential = potentials[4];
      harmonicPotentialOffsetSlider = new Slider( 
        sliderProperties( potential.wellOffsetProperty, potential.minEnergy, potential.maxEnergy )
        );
    };

    init();

    var buildHBox = function(content){
      return new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), content, new HStrut( 15 ) ] } );
    };

    var setPotentialWellProperties = function(){
      if ( potential instanceof SquareWellPotential ) {
        offsetHBox = buildHBox(squarePotentialOffsetSlider);
        // potentialWellName = potential.name;
        // squareWellPlot.visible = true;
        // asymmetricWellPlot.visible = false;
        // coulomb1DWellPlot.visible = false;
        // coulomb3DWellPlot.visible = false;
        // harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof AsymmetricPotential ) {
        offsetHBox = buildHBox(assymetricPotentialOffsetSlider);
        // squareWellPlot.visible = false;
        // asymmetricWellPlot.visible = true;
        // coulomb1DWellPlot.visible = false;
        // coulomb3DWellPlot.visible = false;
        // harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof Coulomb1DPotential ) {
        offsetHBox = buildHBox(coulomb1DPotentialOffsetSlider);
        // squareWellPlot.visible = false;
        // asymmetricWellPlot.visible = false;
        // coulomb1DWellPlot.visible = true;
        // coulomb3DWellPlot.visible = false;
        // harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof Coulomb3DPotential ) {
        offsetHBox = buildHBox(coulomb3DPotentialOffsetSlider);
        // squareWellPlot.visible = false;
        // asymmetricWellPlot.visible = false;
        // coulomb1DWellPlot.visible = false;
        // coulomb3DWellPlot.visible = true;
        // harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof HarmonicOscillatorPotential ) {
        offsetHBox = buildHBox(harmonicPotentialOffsetSlider);
        // squareWellPlot.visible = false;
        // asymmetricWellPlot.visible = false;
        // coulomb1DWellPlot.visible = false;
        // coulomb3DWellPlot.visible = false;
        // harmonicOscillatorWellPlot.visible = true;
      }
      // console.log("well offset property:");
      // console.log(potential);
      // // console.log(potential.value.name);
      // console.log(potential.value.wellOffsetProperty);
      // console.log(potentialOffsetMin);
      // console.log(potentialOffsetMax);
    };
    
    setPotentialWellProperties();
    console.log("setPotentialWellProperties ran successfully");


    // var offsetHBox = new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), squarePotentialOffsetSlider, new HStrut( 15 ) ] } );

    var configurePotentialVBox = new VBox( {
      children: [
      new HBox( { children: [ new HStrut( boxwidth - 20 ) ] } ),
      new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), new Text( potentialWellName, optionFont ), new HStrut( 15 ) ] } ), 
      new VStrut( 10 ),
      new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), offsetHBox, new HStrut( 15 ) ] } ), 
      new VStrut( 10 ),
      new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), closeButton, new HStrut( 15 ) ] } ),
      new VStrut( 10 ),
      ],
      align: 'left'
    } );
    
    console.log("configurePotentialVBox defined");

    Panel.call( this, configurePotentialVBox, {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    } );
    this.addChild( parent );

    console.log("panel called. wtf?");

    // link the visibility of this panel to a button press
    model.showConfigurePotentialPanelProperty.link( function( ) {
      thisNode.visible = model.showConfigurePotentialPanelProperty.value;
    } );

    //link the currentPotentialPanel
    model.currentPotentialProperty.link( function() {
      potential = model.currentPotentialProperty.value;
      potentialWellName = model.currentPotentialProperty.name;
      // maxEnergy = model.getMaxEnergy();
      // yScale = height / (maxEnergy - model.getMinEnergy());
      setPotentialWellProperties();
    } );

  }

  return inherit( Panel, ConfigurePotentialPanel );

} );
