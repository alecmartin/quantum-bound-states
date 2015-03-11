//  Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var HSlider = require( 'SUN/HSlider' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PotentialComboBox = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialComboBox' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var VStrut = require( 'SUN/VStrut' );
  var Panel = require( 'SUN/Panel' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  
  function BottomChartNode( model, options ) {
    Node.call( this, options );

    // Strings and other variables
    var optionFont = {font: new PhetFont( 16 ), fill: "palegoldenrod"};
    var particleMassString = require( 'string!QUANTUM_BOUND_STATES/bottom-chart-particle-mass' );

    //boxwidth
    var boxwidth = 280;
    var sliderpadding = 40;

    var parent = new Node();
    
    // horizontal slider
    // var hSliderProperty = new Property( 0 );
    var hSlider = new HSlider( model.particleMassProperty, { min: 0.5, max: 1.5 }, {
      left: 10,
      top: 10,
      thumbSize: new Dimension2( 11, 22 ),
      trackSize: new Dimension2( boxwidth - (2 * sliderpadding), 2 ),
    } );
    

    // var configurePotentialButton = new TextPushButton( configpotentialWellString, {
    //   font: optionFont,
    //   baseColor: 'lightgrey',
    //   xMargin: 10,
    //   width: 75,
    //   scale: 1.5,
    //   listener: function() {
        
    //   }
    // } );

    // var superpositionStateButton = new TextPushButton( superpositionStateString, {
    //   font: optionFont,
    //   baseColor: 'lightgrey',
    //   xMargin: 10,
    //   width: 75,
    //   scale: 1.5,
    //   listener: function() {
        
    //   }
    // } );

    // var magnifyingCheckBoxGroup = new VerticalCheckBoxGroup( [
    //   { content: new Text( magnifyingString, optionFont ), property: model.showMagnifyingGlassProperty, label: magnifyingString },
    // ], { boxWidth: 20, spacing: 5, fill: 'black', checkBoxColor: 'white'} );
    
    var viewBottomChartVBox = new VBox( {
      children: [ 
        new HBox( { children: [ new HStrut( boxwidth ) ] } ),
        new HBox( { children: [ new HStrut( 20 ), new VStrut( 10 ), new Text( particleMassString, optionFont ), new HStrut( 15 ) ] } ), 
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 20 ), new VStrut( 10 ), hSlider, new HStrut( 20 ) ] } ),
        new VStrut( 10 ),
        // new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),configurePotentialButton, new HStrut( 15 ) ] } ),
        // new VStrut( 10 ),
        // new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),superpositionStateButton, new HStrut( 15 ) ] } ),
        // new VStrut( 10 ),
        // new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ),magnifyingCheckBoxGroup, new HStrut( 15 ) ] } ),
        // new VStrut( 10 ),
      ],
      align: 'left'
    } );
    var viewBottomChartPanel = new Panel( viewBottomChartVBox,
    {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2,
      top: 5
    } );
    
    this.addChild( viewBottomChartPanel );
    
    this.addChild( parent );
  }
  return inherit( Node, BottomChartNode );

} );