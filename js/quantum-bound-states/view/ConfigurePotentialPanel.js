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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var VStrut = require( 'SUN/VStrut' );
  var Panel = require( 'SUN/Panel' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var Coulomb1DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DPotential' );
  var Coulomb3DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DPotential' );
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var Slider = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/Slider' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  // var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  var closeString = require( 'string!QUANTUM_BOUND_STATES/close-string' );
  var offsetString = require( 'string!QUANTUM_BOUND_STATES/offset-string' );
  var widthString = require( 'string!QUANTUM_BOUND_STATES/width-string' );
  var heightString = require( 'string!QUANTUM_BOUND_STATES/height-string' );
  var fsinverseString = require( 'string!QUANTUM_BOUND_STATES/fs.inverse' );
  // var fsinverseString = new SubSupText(fsinverse, {});
  var electronvoltString = require( 'string!QUANTUM_BOUND_STATES/electron-volt' );
  var nanometerString = require( 'string!QUANTUM_BOUND_STATES/nanometer' );
  
  
  // var harmonicString = require( 'string!QUANTUM_BOUND_STATES/harmonic-oscillator' );
  // var coulomb3dString = require( 'string!QUANTUM_BOUND_STATES/coulomb_3d' );
  // var coulomb1dString = require( 'string!QUANTUM_BOUND_STATES/coulomb_1d' );
  // var asymmetricString = require( 'string!QUANTUM_BOUND_STATES/asymmetric' );
  // var squareString = require( 'string!QUANTUM_BOUND_STATES/square' );
/**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function ConfigurePotentialPanel( model, options ) {
    // Panel.call( this, options );
    var thisNode = this;

    var potentials;
    // optionfont
    var optionFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    // var potentialWellInstance = null;
    var offsetText = new Text( offsetString, optionFont );
    var widthText = new Text( widthString, optionFont );
    var heightText = new Text( heightString, optionFont );


    var potential = model.currentPotentialProperty.value;
    var offsetHBox;
    var widthHBox;
    var heightHBox;

    var wellWidthRange = QuantumBoundStatesConstants.WELL_WIDTH_RANGE;
    var wellHeightRange = QuantumBoundStatesConstants.WELL_HEIGHT_RANGE;
    //Sliders, so many sliders
    var squarePotentialOffsetSlider;
    var asymmetricPotentialOffsetSlider;
    var coulomb1DPotentialOffsetSlider;
    var coulomb3DPotentialOffsetSlider;
    var harmonicPotentialOffsetSlider;
    var squarePotentialWidthSlider;
    var asymmetricPotentialWidthSlider;
    var harmonicPotentialWidthSlider;
    var squarePotentialHeightSlider;
    var asymmetricPotentialHeightSlider;
    var potentialWellName = model.currentPotentialProperty.name;
    // var potentialOffsetMin = 0;
    // var potentialOffsetMax = 0;
    // var potentialWellInstance;
    var configurePotentialVBox = new VBox({});


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

    var sliderProperties = function(property, rangeMin, rangeMax, pattern){
      var sliderProperties = {
      // sliderX: 60 - 630,
      type: 'button',
      buttonStep: 0.1,
      title: offsetString,
      sliderSize: new Dimension2( 200, 80 ),
      property: property,
      patternValueUnit: pattern,
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
    // console.log("finished");
    return sliderProperties;
  };


  var init = function(){
    potentials = model.potentials;
    // console.log(potentials);

      //build the sliders
      squarePotentialOffsetSlider = new Slider( 
        sliderProperties( potentials[0].wellOffsetProperty, potentials[0].minEnergy, potentials[0].maxEnergy, electronvoltString )
        );
      squarePotentialWidthSlider = new Slider( 
        sliderProperties( potentials[0].wellWidthProperty, wellWidthRange.min, wellWidthRange.max, nanometerString )
        );
      squarePotentialHeightSlider = new Slider( 
        sliderProperties( potentials[0].wellHeightProperty, wellHeightRange.min, wellHeightRange.max, electronvoltString )
        );
      asymmetricPotentialOffsetSlider = new Slider( 
        sliderProperties( potentials[1].wellOffsetProperty, potentials[1].minEnergy, potentials[1].maxEnergy, electronvoltString )
        );
      asymmetricPotentialWidthSlider = new Slider( 
        sliderProperties( potentials[1].wellWidthProperty, wellWidthRange.min, wellWidthRange.max, nanometerString )
        );
      asymmetricPotentialHeightSlider = new Slider( 
        sliderProperties( potentials[1].wellHeightProperty, wellHeightRange.min, wellHeightRange.max, electronvoltString )
        );
      coulomb1DPotentialOffsetSlider = new Slider( 
        sliderProperties( potentials[2].wellOffsetProperty, potentials[2].minEnergy, potentials[2].maxEnergy, electronvoltString )
        );
      coulomb3DPotentialOffsetSlider = new Slider( 
        sliderProperties( potentials[3].wellOffsetProperty, potentials[3].minEnergy, potentials[3].maxEnergy, electronvoltString )
        );
      harmonicPotentialOffsetSlider = new Slider( 
        sliderProperties( potentials[4].wellOffsetProperty, potentials[4].minEnergy, potentials[4].maxEnergy, electronvoltString )
        );
      harmonicPotentialWidthSlider = new Slider( 
        sliderProperties( potentials[4].frequencyProperty, wellWidthRange.min, wellWidthRange.max, fsinverseString )
        );
      // console.log("harmonic slider initd");
    };

    init();

    var width = squarePotentialOffsetSlider.width;
    var height = squarePotentialOffsetSlider.height;
    var offsetSliderRectangle = new Rectangle(0, 0, width, height, 0, 0, {fill:'black', stroke: 'black'});
    offsetSliderRectangle.addChild( squarePotentialOffsetSlider );
    offsetSliderRectangle.addChild( asymmetricPotentialOffsetSlider );
    offsetSliderRectangle.addChild( coulomb1DPotentialOffsetSlider );
    offsetSliderRectangle.addChild( coulomb3DPotentialOffsetSlider );
    offsetSliderRectangle.addChild( harmonicPotentialOffsetSlider );
    var widthSliderRectangle = new Rectangle(0, 0, width, height, 0, 0, {fill:'black', stroke: 'black'});
    widthSliderRectangle.addChild( squarePotentialWidthSlider );
    widthSliderRectangle.addChild( asymmetricPotentialWidthSlider );
    widthSliderRectangle.addChild( harmonicPotentialWidthSlider );
    var heightSliderRectangle = new Rectangle(0, 0, width, height, 0, 0, {fill:'black', stroke: 'black'});
    heightSliderRectangle.addChild( squarePotentialHeightSlider );
    heightSliderRectangle.addChild( asymmetricPotentialHeightSlider );

    offsetHBox = new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),
        offsetSliderRectangle,
        new HStrut( 15 ) ] } );
    widthHBox = new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),
        widthSliderRectangle,
        new HStrut( 15 ) ] } );
    heightHBox = new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),
        heightSliderRectangle,
        new HStrut( 15 ) ] } );

    //adds hboxes to the configure potential panel
    var reapplyHbox = function(){
      // initially remove it all!
      removeWidthHbox();
      removeHeightHbox();
      removeOffsetHbox();
      configurePotentialVBox.removeChild(closeButton);
      // add it back in
      configurePotentialVBox.addChild(offsetText);
      configurePotentialVBox.addChild(offsetHBox);
      configurePotentialVBox.addChild(widthText);
      configurePotentialVBox.addChild(widthHBox);
      configurePotentialVBox.addChild(heightText);
      configurePotentialVBox.addChild(heightHBox);
      configurePotentialVBox.addChild(closeButton);
    };

    //removes the Offset hbox to the configure potential panel
    var removeOffsetHbox = function(){
      configurePotentialVBox.removeChild(offsetHBox); 
      configurePotentialVBox.removeChild(offsetText);
    };

    //removes the Width hbox to the configure potential panel
    var removeWidthHbox = function(){
      configurePotentialVBox.removeChild(widthHBox); 
      configurePotentialVBox.removeChild(widthText);
    };

    //removes the Height hbox to the configure potential panel
    var removeHeightHbox = function(){
      configurePotentialVBox.removeChild(heightHBox);
      configurePotentialVBox.removeChild(heightText); 
    };


    var setPotentialWellProperties = function(){
      
        squarePotentialOffsetSlider.visible = false;
        squarePotentialWidthSlider.visible = false;
        squarePotentialHeightSlider.visible = false;
        asymmetricPotentialOffsetSlider.visible = false;
        asymmetricPotentialWidthSlider.visible = false;
        asymmetricPotentialHeightSlider.visible = false;
        coulomb1DPotentialOffsetSlider.visible = false;
        coulomb3DPotentialOffsetSlider.visible = false;
        harmonicPotentialOffsetSlider.visible = false;
        harmonicPotentialWidthSlider.visible = false;
        reapplyHbox();

      if ( potential instanceof SquareWellPotential ) {
        // offsetHBox = buildHBox(squarePotentialOffsetSlider);
        // console.log(squarePotentialOffsetSlider);

        squarePotentialOffsetSlider.visible = true;
        squarePotentialWidthSlider.visible = true;
        squarePotentialHeightSlider.visible = true;

        // configurePotentialVBox.visible = true;


      }
      else if ( potential instanceof AsymmetricPotential ) {
        // offsetHBox = buildHBox(asymmetricPotentialOffsetSlider);
        // console.log(asymmetricPotentialOffsetSlider);
        asymmetricPotentialOffsetSlider.visible = true;
        asymmetricPotentialWidthSlider.visible = true;
        asymmetricPotentialHeightSlider.visible = true;
        // configurePotentialVBox.visible = true;
        

      }
      else if ( potential instanceof Coulomb1DPotential ) {
        // offsetHBox = buildHBox(coulomb1DPotentialOffsetSlider);
        coulomb1DPotentialOffsetSlider.visible = true;
        // configurePotentialVBox.visible = false;
        removeWidthHbox(); 
        removeHeightHbox(); 
      }
      else if ( potential instanceof Coulomb3DPotential ) {
        // offsetHBox = buildHBox(coulomb3DPotentialOffsetSlider);
        coulomb3DPotentialOffsetSlider.visible = true;
        // configurePotentialVBox.visible = false;
        removeWidthHbox();
        removeHeightHbox(); 
      }
      else if ( potential instanceof HarmonicOscillatorPotential ) {
        // offsetHBox = buildHBox(harmonicPotentialOffsetSlider);
        harmonicPotentialOffsetSlider.visible = true;
        harmonicPotentialWidthSlider.visible = true;
        // configurePotentialVBox.visible = false;
        removeHeightHbox(); 
      }
    };
    
    setPotentialWellProperties();
    // console.log("setPotentialWellProperties ran successfully");


    // var offsetHBox = new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), squarePotentialOffsetSlider, new HStrut( 15 ) ] } );
    configurePotentialVBox = new VBox( {
      children: [
      new HBox( { children: [ new HStrut( boxwidth - 20 ) ] } ),
      // new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), new Text( potentialWellName, optionFont ), new HStrut( 15 ) ] } ), 
      offsetText,
      offsetHBox, 
      widthText,
      widthHBox,
      heightText,
      heightHBox, 
      closeButton,
      ],
      align: 'left'
    } );
    

    // console.log("configurePotentialVBox defined");


    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    }, options );
    Panel.call( this, configurePotentialVBox, options );



    // link the visibility of this panel to a button press
    model.showConfigurePotentialPanelProperty.link( function( ) {
      thisNode.visible = model.showConfigurePotentialPanelProperty.value;
      // console.log("on");
    } );

    //link the currentPotentialPanel
    model.currentPotentialProperty.link( function() {
      potential = model.currentPotentialProperty.value;
      potentialWellName = model.currentPotentialProperty.name;
      // maxEnergy = model.getMaxEnergy();
      // yScale = height / (maxEnergy - model.getMinEnergy());
      // console.log(potential);
      setPotentialWellProperties();
    } );

  }

  return inherit( Panel, ConfigurePotentialPanel );

} );
