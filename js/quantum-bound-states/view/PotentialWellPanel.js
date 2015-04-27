// Copyright 2002-2015, University of Colorado Boulder

/**
* Draws the top panel containing the configure potential button and the superposition state button
* Also holds the potential combo box to switch between potentials
*/
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PotentialComboBox = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialComboBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var VStrut = require( 'SUN/VStrut' );
  var Panel = require( 'SUN/Panel' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  
  //strings 
  var potentialWellString = require( 'string!QUANTUM_BOUND_STATES/potential-well' );
  var magnifyingString = require( 'string!QUANTUM_BOUND_STATES/top-chart-show-magnifying-glass' );
  var configpotentialWellString = require( 'string!QUANTUM_BOUND_STATES/top-chart-configure-potential-well' );
  var superpositionStateString = require( 'string!QUANTUM_BOUND_STATES/top-chart-superposition-state' );
  /**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function PotentialWellPanel( model, options ) {

    // optionfont
    var optionFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    var parent = new Node();

    var potentialWellComboBox = new PotentialComboBox( model.potentials, model.currentPotentialProperty, parent );
    
    //boxwidth
    var boxwidth = 240;

    var configurePotentialButton = new TextPushButton( configpotentialWellString, {
      font: optionFont,
      baseColor: 'lightgrey',
      xMargin: 10,
      minWidth: 100,
      scale: 1.5,
      listener: function() {
        // console.log(model.showConfigurePotentialPanelProperty.value);
        model.showConfigurePotentialPanelProperty.value = true;
      }
    } );

    var superpositionStateButton = new TextPushButton( superpositionStateString, {
      font: optionFont,
      baseColor: 'lightgrey',
      xMargin: 10,
      minWidth: 100,
      scale: 1.5,
      listener: function() {
        
      }
    } );

    var magnifyingCheckBoxGroup = new VerticalCheckBoxGroup( [
      { content: new Text( magnifyingString, optionFont ), property: model.showMagnifyingGlassProperty, label: magnifyingString },
    ], { boxWidth: 20, spacing: 5, checkBoxColor: 'black'} );
    
    var PotentialWellVBox = new VBox( {
      children: [
        new HBox( { children: [ new HStrut( boxwidth - 20 ) ] } ),
        new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), new Text( potentialWellString, optionFont ), new HStrut( 15 ) ] } ), 
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),potentialWellComboBox, new HStrut( 15 ) ] } ),
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),configurePotentialButton, new HStrut( 15 ) ] } ),
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),superpositionStateButton, new HStrut( 15 ) ] } ),
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),magnifyingCheckBoxGroup, new HStrut( 15 ) ] } ),
        new VStrut( 10 ),
      ],
      align: 'left'
    } );
    
    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    }, options );
    Panel.call( this, PotentialWellVBox, options );
    this.addChild( parent );
  }

  return inherit( Panel, PotentialWellPanel );

} );
