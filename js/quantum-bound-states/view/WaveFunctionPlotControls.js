// Copyright 2002-2015, University of Colorado Boulder

/**
* Draws the control panel containing the following controls:
* 1. Radio buttons toggling between "Probability Density" and "Wave Function."
* 2. Checkboxes subordinate to "Wave Funcion" button:
*     a) Real Part
*     b) Imaginary Part
*     c) Magnitude
*     d) Phase
* The controls all change what appears in the wave function plot panel.
*
* @author Alec Martin
*/

define( function( require ) {
  'use strict';

  // PhET modules
  var inherit = require( 'PHET_CORE/inherit' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HStrut = require( 'SUN/HStrut' );
  var Panel = require( 'SUN/Panel' );
  var VStrut = require( 'SUN/VStrut' );
  var VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  
  // Strings
  var probabilityDensityString = require( 'string!QUANTUM_BOUND_STATES/probability-density' );
  var waveFunctionString = require( 'string!QUANTUM_BOUND_STATES/wave-function' );
  var realPartString = require( 'string!QUANTUM_BOUND_STATES/real-part' );
  var imaginaryPartString = require( 'string!QUANTUM_BOUND_STATES/imaginary-part' );
  var magnitudeString = require( 'string!QUANTUM_BOUND_STATES/magnitude' );
  var phaseString = require( 'string!QUANTUM_BOUND_STATES/phase' );
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function WaveFunctionPlotControls( model, options ) {

    // Layout values
    var radioButtonFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    // var checkBoxFontEnabled = {font: new PhetFont( 12 ), fill: "white"};
    var checkBoxFontDisabled = {font: new PhetFont( 12 ), fill: "grey"};
    var boxwidth = 240;
 
    // Radio buttons, check boxes, and associated logic
    var radioButtonContent = [
      { property: model.showProbDensityProperty,
        value: true, 
        node: new Text( probabilityDensityString, radioButtonFont )
      },
      { property: model.showProbDensityProperty,
        value: false, 
        node: new Text( waveFunctionString, radioButtonFont )
      },
    ];

    var realPartText =  new Text( realPartString, checkBoxFontDisabled );
    var imaginaryPartText =  new Text( imaginaryPartString, checkBoxFontDisabled );
    var magnitudeText =  new Text( magnitudeString, checkBoxFontDisabled );
    var phaseText =  new Text( phaseString, checkBoxFontDisabled );

    var checkBoxContent = [
      { content: new HBox( { children: [ realPartText, 
                                         new HStrut( 15 ),
                                         new Line( 0, 0, 20, 0, { stroke: 'orange', lineWidth: 3 } )
                                       ] } ),
        property: model.showRealProperty, 
        label: realPartString, 
      },
      { content: new HBox( { children: [ imaginaryPartText,
                                         new HStrut( 15 ),
                                         new Line( 0, 0, 20, 0, { stroke: 'blue', lineWidth: 3 } )
                                       ] } ),
        property: model.showImaginaryProperty, 
        label: imaginaryPartString 
      },
      { content: new HBox( { children: [ magnitudeText,
                                         new HStrut( 15 ),
                                         new Line( 0, 0, 20, 0, { stroke: 'white', lineWidth: 3 } )
                                       ] } ),
        property: model.showMagnitudeProperty, 
        label: magnitudeString 
      },
      { content: new HBox( { children: [ phaseText,
                                         new HStrut( 15 ),
                                         new Image( 'images/PhaseIcon.png', { left: 0, top: 0, scale: 0.25 } )
                                       ] } ),
        property: model.showPhaseProperty, 
        label: phaseString 
      },
    ];
    
    var radioButtonGroup = new VerticalAquaRadioButtonGroup( radioButtonContent, {} );
    var checkBoxGroup = new VerticalCheckBoxGroup( checkBoxContent, 
                                                   { boxWidth: 20, 
                                                     spacing: 8, 
                                                     checkBoxColor: 'black'
                                                   } );

    // Make checkboxes disabled when Probability Density button is selected
    model.showProbDensityProperty.link( function( probDensitySelected ) {
      for(var i = 0; i < checkBoxGroup.children.length; i++) {
        // Disable checkbox: the children of checkBoxGroup are HBoxes. Each HBox has a children array
        // containing the checkbox we need to manipulate as its only element.
        checkBoxGroup.children[i].children[0].enabled = !probDensitySelected;

        // Grey out type:
        if( probDensitySelected ) {
          // Make text white
          checkBoxGroup.children[i].children[0].content._children[0].options.children[0]._fill ='grey';
        }
        else {
          //Make text grey
          checkBoxGroup.children[i].children[0].content._children[0].options.children[0]._fill ='white';
        }
      }
    } );

    var controlPanelLayout = new VBox( {
      children: [
        new HBox( { children: [ new HStrut( boxwidth - 20 ) ] } ),
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), radioButtonGroup, new HStrut( 15 ) ] } ),
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 40 ), new VStrut( 10 ), checkBoxGroup, new HStrut( 15 ) ] } ),
        new VStrut( 10 ),
      ],
      align: 'left'
    } );

    Panel.call( this, controlPanelLayout, {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    } );
  }
  return inherit( Panel, WaveFunctionPlotControls );
} );
