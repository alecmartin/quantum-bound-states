// Copyright 2002-2015, University of Colorado Boulder

/**
* Draws the control panel containing the following controls:
* 1. Radio buttons toggling between "Probability Density" and "Wave Function."
* 2. Checkboxes subordinate to "Wave Funcion" button:
*     a) Real Part
*     b) Imaginary Part
*     c) Magnitude
*     d) Phase
* The controls all change what appears in the output animation/graphic.
*/

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var VStrut = require( 'SUN/VStrut' );
  var Panel = require( 'SUN/Panel' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function AnimationControlPanel( model, options ) {
    Node.call( this, options );

    // Strings and other variables
    var radioButtonFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    var checkBoxFontInactive = {font: new PhetFont( 12 ), fill: "grey"};
    var checkBoxFontActive = {font: new PhetFont( 12 ), fill: "white"};
    var probabilityDensityString = require( 'string!QUANTUM_BOUND_STATES/probability-density' );
    var waveFunctionString = require( 'string!QUANTUM_BOUND_STATES/wave-function' );
    var realPartString = require( 'string!QUANTUM_BOUND_STATES/real-part' );
    var imaginaryPartString = require( 'string!QUANTUM_BOUND_STATES/imaginary-part' );
    var magnitudeString = require( 'string!QUANTUM_BOUND_STATES/magnitude' );
    var phaseString = require( 'string!QUANTUM_BOUND_STATES/phase' );

    var parent = new Node();
    
    //boxwidth
    var boxwidth = 240;

    var radioButtonGroup = new VerticalCheckBoxGroup( [
        { content: new Text( probabilityDensityString, radioButtonFont ),
          property: model.showProbDensityProperty, 
          label: probabilityDensityString 
        },
        { content: new Text( waveFunctionString, radioButtonFont ),
          property: model.showProbDensityProperty, 
          label: waveFunctionString 
        },
        
      ], { boxWidth: 20, spacing: 5, checkBoxColor: 'black'} );

    var checkBoxGroup = new VerticalCheckBoxGroup( [
        { content: new Text( realPartString, checkBoxFontInactive ),
          property: model.showRealProperty, 
          label: realPartString 
        },
        { content: new Text( imaginaryPartString, checkBoxFontInactive ),
          property: model.showImaginaryProperty, 
          label: imaginaryPartString 
        },
        { content: new Text( magnitudeString, checkBoxFontInactive ),
          property: model.showMagnitudeProperty, 
          label: magnitudeString 
        },
        { content: new Text( phaseString, checkBoxFontInactive ),
          property: model.showPhaseProperty, 
          label: phaseString 
        },
        
      ], { boxWidth: 20, spacing: 5, checkBoxColor: 'black'} );

    var viewAnimationControlVBox = new VBox( {
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
    var viewAnimationControlPanel = new Panel( viewAnimationControlVBox,
    {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    } );
    
    this.addChild( viewAnimationControlPanel );
  }
  return inherit( Node, AnimationControlPanel );
} );
