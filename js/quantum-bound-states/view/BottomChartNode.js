//  Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSlider = require( 'SUN/HSlider' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var VStrut = require( 'SUN/VStrut' );
  
  
  function BottomChartNode( model, options ) {
    Node.call( this, options );

    // Strings and other variables
    var optionFont = {font: new PhetFont( 14 ), fill: "palegoldenrod"};
    var labelFont = {font: new PhetFont( 12 ), fill: "white"};
    var particleMassString = require( 'string!QUANTUM_BOUND_STATES/bottom-chart-particle-mass' );

    //boxwidth
    var boxwidth = 240;

    var sliderpadding = 32;
    var arrowHeight = 15;
    var arrowWidth = arrowHeight * (Math.sqrt( 3 ) / 2); // height of equilateral triangle
    var rightarrow = new Path( null, { fill: 'black' } );
    var leftarrow = new Path( null, { fill: 'black' } );
    rightarrow.shape = new Shape().moveTo( 0, 0 ).lineTo( 0, arrowHeight ).lineTo( arrowWidth, arrowHeight /2 ).close(); 
    leftarrow.shape = new Shape().moveTo( arrowWidth, 0 ).lineTo( arrowWidth, arrowHeight ).lineTo( 0, arrowHeight /2 ).close(); // down arrow
    var leftbutton = new RectangularPushButton({
      content: leftarrow, 
      listener: function(){

      },
      cornerRadius: 3,
      xMargin: 4,
      yMargin: 2,
      baseColor: 'white'
    });
    var rightbutton = new RectangularPushButton({
      content: rightarrow, 
      listener: function(){

      },
      cornerRadius: 3,
      xMargin: 4,
      yMargin: 2,
      baseColor: 'white'
    });
    // button background
    var width = 80;
    var height = 20;
    var background = new Rectangle( 0, 0, width, height, 4, 4,
      { fill: 'white', stroke: 'gray', lineWidth: 1 } );


    var parent = new Node();
    
    // horizontal slider
    var hSlider = new HSlider( model.particleMassProperty, { min: 0.5, max: 1.5 }, {
      left: 10,
      top: 10,
      trackLineWidth: 0.2,
      // trackFill: 'white',
      trackStroke: 'white',
      minorTickStroke: 'white',
      thumbSize: new Dimension2( 11, 22 ),
      trackSize: new Dimension2( boxwidth - (2 * sliderpadding), 2 ),
      // tick: { step: 1, minText: "tiny", maxText: "big" }

    } );
    hSlider.addMinorTick( 0.5, new Text( "0.50", labelFont ) );
    hSlider.addMinorTick( 1.5, new Text( "1.10", labelFont ) );

    

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
    
    var midpush  = (boxwidth - 20 - 50 - width) / 2;

    var viewBottomChartVBox = new VBox( {
      children: [ 
        new HBox( { children: [ new HStrut( boxwidth - 20 ) ] } ),
        new HBox( { children: [ new HStrut( 10 ), new VStrut( 10 ), new Text( particleMassString, optionFont ), new HStrut( 15 ) ] } ), 
        new VStrut( 10 ),
        new HBox( { children: [ new HStrut( 40 ), leftbutton, new HStrut( 5 ),  background, new HStrut( 5 ),  rightbutton ] } ), 
        new HBox( { children: [ new HStrut( 10 ), hSlider, new HStrut( 10 ) ] } ),
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