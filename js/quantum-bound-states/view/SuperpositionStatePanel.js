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
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var SetCoefficientControl = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/SetCoefficientControl' );
  var SuperpositionCoefficients = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SuperpositionCoefficients' )

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

    // Panel values -- different from model values
    var i, rowCounter, coefficients, coefficientProperties;

    // Observe the model and take note when it changes.
    model.superpositionCoefficients.coefficientsProperty.link( function() {
    } );

    coefficients = model.superpositionCoefficients.coefficientsProperty.get( );
    console.log(coefficients[0]);
    var setCoefficientControl = new SetCoefficientControl( coefficients[0], 0 );


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

    var clearButton = new TextPushButton( clearString, linkButton( function( ){
      for ( i = 0; i < coefficients.length; i++ ) {
        coefficients[i] = 0.0;
      }
    } ) );

    var normalize = function ( coefficients ) {
      var sum = 0;
      for ( i = 0; i < coefficients.length; i++ ) {
        sum += coefficients[ i ] * coefficients[ i ];
      }
      sum = Math.sqrt( sum );
      for ( var j = 0; j < coefficients.length; j++ ) {
        coefficients[ j ] = coefficients[ j ] / sum;
      }
      return coefficients;
    }

    var normalizeButton = new TextPushButton( normalizeString, linkButton( function( ) {
      coefficients = normalize( coefficients );
    } ) );

    var applyButton = new TextPushButton( applyString, linkButton( function() { 
      var sqSum = 0;
      for ( i = 0; i < coefficients.length; i++ ) {
        sqSum += coefficients[ i ] * coefficients[ i ];
      }
      if( sqSum != 1 ) {
        coefficients = normalize( coefficients )
      }
      for ( i = 0; i < coefficients.length; i++ ) {
        model.superpositionCoefficients.setCoefficient( i, coefficients[ i ] );
      }
    } ) );

    var closeButton = new TextPushButton( closeString, linkButton( function( ) {
      model.showSuperpositionStatePanelProperty.set( false );
    } ) );


    
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

    //var buildCoefficientSetterControls = function( ) {
    //  coefficients = model.superpositionCoefficients.coefficientsProperty.get( );
    //  coefficientProperties = [];
    //  for( var i = 0; i < coefficients.length; i++ ) {
    //    coefficientProperties.push( new Property ( coefficients[i] ) );
    //  }
    //  for( i = 0; i < coefficients.length; i++ ) {
    //    coefficientSetterControls = new StringHBox( "wooooooo!!!", titleFont, Text );
    //  }
    //};

    // Put all of it together
    var superpositionStateVBox = new VBox( {
      children: [ new VStrut( 10 )
                  // Panel text
                , new StringHBox( titleString, titleFont, Text )
                , new StringHBox( instructionsString, instructionsFont, Text )
                , new StringHBox( instructionsEqString, instructionsFont, SubSupText )
                , new VStrut( 20 )

                // Coefficient Entry
                , new SetCoefficientControl

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
      panel.visible = model.showSuperpositionStatePanelProperty.get ( );
      buildCoefficientSetterControls( );
    } );
  }
  return inherit( Panel, SuperpositionStatePanel );
} );