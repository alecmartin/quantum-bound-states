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



  
  function TopChartNode( model, options ) {
    Node.call( this, options );

    // Strings and other variables
    var OptionFont = {font: new PhetFont( 12 ), color: "white"};
    var magnifyingString = require( 'string!QUANTUM_BOUND_STATES/top-chart-show-magnifying-glass' );


    // Add the control panel that will allow users to control the visibility
    // of the plate charges and electric field lines
    var potentialWellComboBox = new PotentialComboBox( model, this);
    var magnifyingCheckBoxGroup = new VerticalCheckBoxGroup( [
      { content: new Text( magnifyingString, OptionFont ), property: model.showMagnifyingGlassProperty, label: magnifyingString },
    ], { boxWidth: 15, spacing: 5 } );
    // var titleToControlsVerticalSpace = 7;
    var viewTopChartVBox = new VBox( {
      children: [
        potentialWellComboBox,
        new HBox( { children: [ new HStrut( 10 ), magnifyingCheckBoxGroup, new HStrut( 15 ) ] } )
      ],
      align: 'left'
    } );
    var viewTopChartPanel = new Panel( viewTopChartVBox,
    {
      xMargin: 5,
      fill: 'rgb( 0, 0, 0 )',
      top: 5
    } );
    this.addChild( viewTopChartPanel );



  }
  return inherit( Node, TopChartNode);


} );