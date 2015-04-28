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
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HStrut = require( 'SUN/HStrut' );
  var VStrut = require( 'SUN/VStrut' );
  var Range = require( 'DOT/Range' );
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var Property = require( 'AXON/Property' );

  // Strings
  var titleString = require( 'string!QUANTUM_BOUND_STATES/superposition-state-title-string' );
  var instructionsString = require( 'string!QUANTUM_BOUND_STATES/superposition-state-instructions-string' );
  var clearString = require( 'string!QUANTUM_BOUND_STATES/clear-string' );
  var normalizeString = require( 'string!QUANTUM_BOUND_STATES/normalize-string' );
  var applyString = require( 'string!QUANTUM_BOUND_STATES/apply-string' );
  var closeString = require( 'string!QUANTUM_BOUND_STATES/close-string' );
  var instructionsEqString = 'Ψ(x) = c<sub>1</sub>Ψ<sub>1</sub>(x) + '
                           + 'c<sub>2</sub>Ψ<sub>2</sub>(x) + ... + '
                           + 'c<sub>n</sub>Ψ<sub>n</sub>(x).';
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function SuperpositionStatePanel( model, options ) {

    // Link panel visibility to "Superposition State" push button
    var panel = this;



    // Fonts
    var titleFont = { font: new PhetFont( 14 ), fill: 'palegoldenrod' };
    var instructionsFont = { font: new PhetFont( 14 ), fill: 'white' };
    var buttonFont = { font: new PhetFont( 14 ), fill: 'black' };

    // Constants
    var coefficientRange = new Range( 0.0, 1.0 );
    var coefficientIncrement = 0.10;
    var coefficients;
    var nCoefficients;
    var coefficientsProperty = new Property( coefficients );

    // Observe the model and update panel coefficients accordingly.
    model.superpositionCoefficients.coefficientsProperty.link( function() {
      coefficients = model.superpositionCoefficients.coefficientsProperty.value;
      nCoefficients = coefficients.length;
    } );
    


    var CoefficientSetterControl = function(  ) {};
    //var coefficients = new SuperpositionCoefficients( model.currentPotentialProperty );
    //console.log("coefficients");
    //console.log(coefficients);

    // Panel Push Buttons
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

    var applyButton = new TextPushButton( applyString, linkButton( function() { 
    } ) );

    var closeButton = new TextPushButton( closeString, linkButton( function( ) {
      model.showSuperpositionStatePanelProperty.set( false );
    } ) );

    var setSuperPositionState = function() {
    };
    
    // Panel title text and instructions are composed of these
    var StringHBox = function( text, font, TextType) {
      return new HBox( { children: [ new HStrut( 10 )
                                   , new VStrut( 20 )
                                   , new TextType( text, font )
                                   , new VStrut( 20 ) 
                                   ] } )
    };

    // Buttons hbox
    var pushButtonsHbox =  new HBox( { 
      children: [ new HStrut( 10 )
                , clearButton
                , new HStrut( 10 )
                , normalizeButton
                , new HStrut( 10 )
                , applyButton
                , new HStrut( 10 )
                , closeButton
                , new HStrut( 10 )
                ]
    } )

     var panelWidth = pushButtonsHbox.right - pushButtonsHbox.left;


    // Put all of it together
    var superpositionStateVBox = new VBox( {
      children: [ new VStrut( 10 )
                  // Panel text
                , new StringHBox( titleString, titleFont, Text )
                , new StringHBox( instructionsString, instructionsFont, Text )
                , new StringHBox( instructionsEqString, instructionsFont, SubSupText )
                , new VStrut( 20 )

                // Coefficient Entry
                , new VStrut( 100 )

                // Buttons
                , pushButtonsHbox 
                , new VStrut( 10 )
                ], align: 'left'
    } );
    
    // Set panel colors
    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    }, options );

    Panel.call( panel, superpositionStateVBox, options );

    model.showSuperpositionStatePanelProperty.link( function( ) {
      panel.visible = model.showSuperpositionStatePanelProperty.value;
    } );
  }
  return inherit( Panel, SuperpositionStatePanel );
} );