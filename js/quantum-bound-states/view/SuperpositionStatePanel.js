// Copyright 2002-2015, University of Colorado Boulder

/**
* Draws the panel containing a text entry box for entering the desired
* value of each eigenstate coefficient, and buttons for normalizing the
* values of the coefficients ("Normalize"), setting the coeffients to their
* default values ("Clear"), applying the values in the boxes to the values
* in the model ("Apply"), and closing the panel ("Close"). Each box alsojj
* provides up and down arrow buttons for incrementing the value with
* a mouse rather than typing it in.
*/

define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var VStrut = require( 'SUN/VStrut' );
  var Panel = require( 'SUN/Panel' );
  var Range = require( 'DOT/Range' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var SuperpositionCoefficients = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SuperpositionCoefficients' );
  
  // Strings
  var titleString = require( 'string!QUANTUM_BOUND_STATES/superposition-state-title-string' );
  var instructionsString = require( 'string!QUANTUM_BOUND_STATES/superposition-state-instructions-string' );
  var clearString = require( 'string!QUANTUM_BOUND_STATES/clear-string' );
  var normalizeString = require( 'string!QUANTUM_BOUND_STATES/normalize-string' );
  var applyString = require( 'string!QUANTUM_BOUND_STATES/apply-string' );
  var closeString = require( 'string!QUANTUM_BOUND_STATES/close-string' );
  var instructionsEqString = "Ψ(x) = c<sub>1</sub>Ψ<sub>1</sub>(x) + "
                           + "c<sub>2</sub>Ψ<sub>2</sub>(x) + ... + "
                           + "c<sub>n</sub>Ψ<sub>n</sub>(x).";
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function SuperpositionStatePanel( model, options ) {
    var thisPanel = this;

    // Fonts
    var titleFont = { font: new PhetFont( 14 ), fill: "palegoldenrod" };
    var instructionsFont = { font: new PhetFont( 14 ), fill: "white" };
    var buttonFont = { font: new PhetFont( 14 ), fill: "black" };

    // Constants
    var coefficientRange = new Range( 0.0, 1.0 );
    var coefficientIncrement = 0.10;

    // Boxwidth
    var boxwidth = 512;

    var panelCoefficients = { n: 5,
                              coeffients: []
                            };



    // Buttons
    var linkButton = function( listenerFunction ) {
      return { font: buttonFont
             , baseColor: 'lightgrey'
             , xMargin: 10
             , minWidth: 100
             , scale: 1.5
             , listener: listenerFunction
             };
    };

    var clearButton = new TextPushButton( clearString, linkButton( function(){} ) );
    var normalizeButton = new TextPushButton( normalizeString, linkButton( function(){} ) );
    var applyButton = new TextPushButton( applyString, linkButton( function(){} ) );
    var closeButton = new TextPushButton( closeString, linkButton( function( ) {
      model.showSuperpositionStatePanelProperty.value = false;
    } ) );

    var setSuperPositionState = function() {
    };
    
    // Title and instructions are composed of these
    var StringHBox = function( text, font, TextType) {
      return new HBox( { children: [ new HStrut( 10 )
                                   , new VStrut( 20 )
                                   , new TextType( text, font )
                                   , new VStrut( 20 ) 
                                   ] } )
    };



    var superpositionStateVBox = new VBox( {
      children: [ new HBox( { children: [ new HStrut( boxwidth - 20 ) ] } )
                // Text
                , new StringHBox( titleString, titleFont, Text )
                , new StringHBox( instructionsString, instructionsFont, Text )
                , new StringHBox( instructionsEqString, instructionsFont, SubSupText )
                // Coefficient Entry

                // Buttons
                , new HBox( { children: [ new HStrut( 10 )
                                        , new VStrut( 10 )
                                        , clearButton
                                        , new HStrut( 10 )
                                        , normalizeButton
                                        , new HStrut( 10 )
                                        , applyButton
                                        , new HStrut( 10 )
                                        , closeButton
                                        , new HStrut( 10 )
                                        ] } )
                ], align: "left"
    } );
    
    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    }, options );
    Panel.call( this, superpositionStateVBox, options );

    model.showSuperpositionStatePanelProperty.link( function( ) {
      thisPanel.visible = model.showSuperpositionStatePanelProperty.value;
    } );
  }
  // TODO: add SuperPositionStatePanel to main view
  return inherit( Panel, SuperpositionStatePanel );
} );