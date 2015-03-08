//  Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PotentialComboBox = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialComboBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var Panel = require( 'SUN/Panel' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  
  function TopChartNode( model, options ) {
    Node.call( this, options );

    // Strings and other variables
    var optionFont = {font: new PhetFont( 12 ), fill: "White"};
    var magnifyingString = require( 'string!QUANTUM_BOUND_STATES/top-chart-show-magnifying-glass' );
    var potentialWellString = require( 'string!QUANTUM_BOUND_STATES/top-chart-configure-potential-well' );
    var superpositionStateString = require( 'string!QUANTUM_BOUND_STATES/top-chart-superposition-state' );

    var parent = new Node();
    var potentialWellComboBox = new PotentialComboBox( model, parent );
    
    var configurePotentialButton = new TextPushButton( potentialWellString, {
      font: optionFont,
      baseColor: 'white',
      xMargin: 10,
      width: 75,
      height: 75,
      listener: function() {
        
      }
    } );

    var superpositionStateButton = new TextPushButton( superpositionStateString, {
      font: optionFont,
      baseColor: 'white',
      xMargin: 10,
      width: 75,
      listener: function() {
        
      }
    } );

    var magnifyingCheckBoxGroup = new VerticalCheckBoxGroup( [
      { content: new Text( magnifyingString, optionFont ), property: model.showMagnifyingGlassProperty, label: magnifyingString },
    ], { boxWidth: 30, spacing: 5 } );
    
    var viewTopChartVBox = new VBox( {
      children: [        
        new HBox( { children: [ new HStrut( 10 ), potentialWellComboBox, new HStrut( 15 ) ] } ),
        new HBox( { children: [ new HStrut( 10 ), configurePotentialButton, new HStrut( 15 ) ] } ),
        new HBox( { children: [ new HStrut( 10 ), superpositionStateButton, new HStrut( 15 ) ] } ),
        new HBox( { children: [ new HStrut( 10 ), magnifyingCheckBoxGroup, new HStrut( 15 ) ] } )
      ],
      align: 'left'
    } );
    var viewTopChartPanel = new Panel( viewTopChartVBox,
    {
      xMargin: 5,
      fill: 'rgb( 128, 128, 128 )',
      top: 5
    } );
    
    this.addChild( viewTopChartPanel );
    
    this.addChild( parent );
  }
  return inherit( Node, TopChartNode );


} );