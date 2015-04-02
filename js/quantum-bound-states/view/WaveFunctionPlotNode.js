// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for the plot of the probability density function and the wavefunctions
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  /**
  * @param {QuantumBoundStatesModel} model
  * @param {number} width
  * @param {number} height
  * @constructor
  */
  function WaveFunctionPlotNode( model, width, height, options ) {

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

    // Plotting lower graph lines
    // Need to first generate paths for efficient animation
    // Currently the largest timesink
    var generateTimePaths = function(lower, upper, step) {
      var points; // [xarr, yarr]
      var maxEnergy = model.getMaxEnergy();
      var xScale = function(x) { return (model.maxX + x) * (width / (model.maxX - model.minX)); }
      var yScale = function(y) { return (model.getMaxEnergy() - y) * (height / (maxEnergy - model.getMinEnergy())); }
      var paths = [];
      // We iterate over every time value
      for (var i = 0; i < upper; i += step) {
        points = model.getRealWave(time);
        var shape = new Shape();
        shape.moveTo(xScale(points[0][0]), yScale(points[1][0]));
        // iterate over all points and generate our full shape
        for (var j = 1; j < points[0].length; j++) {
            shape.lineTo(xScale(points[0][j]), yScale(points[1][j]));
        }
        var shape_path = new Path(shape, {
            stroke: 'blue',
            linewidth: 3,
            lineJoin: 'round',
            x: 50
        });
        paths.push(shape_path);
      }
      return paths
    }
    // Now we can iterate over generated paths
    var lower = 0;
    var upper = 100;
    var step = 20;
    var time = lower;
    var paths = generateTimePaths(lower, upper, step);
    var currentLine = -1; // at the beginning we have no plotted path
    var plot = this;
    var step = function() {
      if (currentLine != -1) {
          plot.removeChild(currentLine);
      }
      plot.addChild(paths[time]);
      currentLine = paths[time];
      time++;
      time %= paths.length;
    }
    setInterval(step, 15);
  }
  return inherit( Node, WaveFunctionPlotNode);
} );
