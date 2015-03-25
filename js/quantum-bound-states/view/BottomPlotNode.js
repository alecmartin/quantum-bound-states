//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Constructor for the plot of the probability density function and the wavefunctions
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  function BottomPlotNode( model, width, height, options ) {

    // strings
    var psiString = "Ψ";
    var pd = false;
    var titleWFString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-wf-title' );
    var titlePDString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-pd-title' );
    var positionString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-position' );


    Node.call( this, options );
    //create black background
    var background = new Rectangle(50,0,width,height,0,0, {fill:'black', stroke: 'white'});
    this.addChild( background );
    
    var divisors = (model.maxX - model.minX);
    var xSpacing = (width  / divisors);
    var xLoc = xSpacing /2;
    for (var i = model.minX + 0.5; i < divisors + model.minX; i += 1) {
      var tick = new Line(background.left + xLoc, background.top, background.left+xLoc, background.bottom, {stroke: 'gray'});
      this.addChild( tick );
      this.addChild( new Text( i.toString(), {
        centerX: tick.centerX,
        top: background.bottom + 5,
        font: new PhetFont( 12 ),
        fill: 'white'} ) );
      xLoc += xSpacing;
    }



    // right now default to WFString
    var title = new Text( titleWFString, {
      font: new PhetFont( 18 ),
      rotation: -Math.PI / 2,
      centerY: background.centerY,
      x: background.left - 30,
      fill: 'white'
    });
    this.addChild( title );


    model.showProbDensityProperty.link( function() {
      if (model.showProbDensityProperty.value) {
        title.text = titlePDString;
        pd = true;
      }
      else {
        title.text = titleWFString;
        pd = false;
      }
    });

    // gets the substring for the superposition
    function superpositionEigenSubString() {
      var arr = model.getSubscriptsAndCoefficients();
      var string = "";
      if(model.isSuperpositionState()){
        for (var i = 0; i < arr[0].length ; i++ ) {
          string += arr[1][i] + psiString + "<sub>" + arr[0][i] + "</sub>(x,t)";
          if(i < arr[0].length -1){
            string += "+";
          }
        }
      }
      else {
        string += psiString + "<sub>" + arr[0][0] + "</sub>(x,t)";
      }
      return string;
    }

    var units = new Text( positionString, {
      font: new PhetFont( 18 ),
      centerX: background.centerX,
      y: background.bottom + 40,
      fill: 'white'
    });
    this.addChild( units );
    
    var eigenSubString =  superpositionEigenSubString();
    var eigenString = pd ? "|" + eigenSubString + "|<sup>2</sup>" : eigenSubString ;

    var eigenText = new SubSupText( eigenString , {
      font: new PhetFont( 18 ),
      fill: "#ff0000",
      right: background.right - 5,
      top: background.top + 5
    });
    this.addChild( eigenText );
  }

  return inherit( Node, BottomPlotNode);
} );