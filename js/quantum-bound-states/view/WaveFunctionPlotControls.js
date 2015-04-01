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
  var Node = require( 'SCENERY/nodes/Node' );
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
    Node.call( this, options );

    // Layout values
    var radioButtonFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    var checkBoxFontActive = {font: new PhetFont( 12 ), fill: "white"};
    var boxwidth = 240;

 
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

    
    var checkBoxContent = [
      { content: new HBox( { children: [ new Text( realPartString, checkBoxFontActive ),
                                         new HStrut( 15 ),
                                         new Line( 0, 0, 20, 0, { stroke: 'orange', lineWidth: 3 } )
                                       ] } ),
        property: model.showRealProperty, 
        label: realPartString, 
      },
      { content: new HBox( { children: [ new Text( imaginaryPartString, checkBoxFontActive ),
                                         new HStrut( 15 ),
                                         new Line( 0, 0, 20, 0, { stroke: 'blue', lineWidth: 3 } )
                                       ] } ),
        property: model.showImaginaryProperty, 
        label: imaginaryPartString 
      },
      { content: new HBox( { children: [ new Text( magnitudeString, checkBoxFontActive ), 
                                         new HStrut( 15 ),
                                         new Line( 0, 0, 20, 0, { stroke: 'white', lineWidth: 3 } )
                                       ] } ),
        property: model.showMagnitudeProperty, 
        label: magnitudeString 
      },
      { content: new HBox( { children: [ new Text( phaseString, checkBoxFontActive ),
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

    var controlPanel = new Panel( controlPanelLayout,
    {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    } );
    
    this.addChild( controlPanel );
  }
  return inherit( Node, WaveFunctionPlotControls );
} );
