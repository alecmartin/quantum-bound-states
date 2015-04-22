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
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  
  // constants
  var MIN_X = QuantumBoundStatesConstants.XRANGE.min;
  var MAX_X = QuantumBoundStatesConstants.XRANGE.max;
  
  // strings
  var psiString = "Ψ";
  var titleWFString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-wf-title' );
  var titlePDString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-pd-title' );
  var positionString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-position' );
  
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @param {number} width
  * @param {number} height
  * @constructor
  */
  function WaveFunctionPlotNode( model, width, height, options ) {

    var pd = true;
    
    Node.call( this );
    
    //create black background
    var background = new Rectangle( 50, 0, width, height, 0, 0, {fill:'black', stroke: 'white'});
    this.addChild( background );
    
    var divisors = (MAX_X - MIN_X);
    var xSpacing = (width  / divisors);
    var xLoc = xSpacing /2;
    for (var i = MIN_X + 0.5; i < divisors + MIN_X; i += 1) {
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

    var units = new Text( positionString, {
      font: new PhetFont( 18 ),
      centerX: background.centerX,
      y: background.bottom + 40,
      fill: 'white'
    });
    this.addChild( units );

    // gets the substring for the superposition
    var getSuperpositionEigenSubString = function() {
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
    };
    
    var getHoveredEigenstateString = function( index ) {
      var string = psiString + "<sub>" + index + "</sub>(x,t)";
      return pd ? "|" + string + "|<sup>2</sup>" : string ;
    };
    
    var eigenSubString =  getSuperpositionEigenSubString();
    var eigenString = pd ? "|" + eigenSubString + "|<sup>2</sup>" : eigenSubString ;

    var eigenText = new SubSupText( eigenString , {
      font: new PhetFont( 22 ),
      fill: "#ff0000",
      right: background.right - 5,
      top: background.top + 5
    } );
    this.addChild( eigenText );
    
    var hoveredEigenText = new SubSupText( getHoveredEigenstateString( -1 ) , {
      font: new PhetFont( 22 ),
      fill: "yellow",
      right: eigenText.right,
      top: eigenText.bottom + 10,
      visible: false
    });
    this.addChild( hoveredEigenText );
    
    var setEigenText = function() {
      eigenSubString = getSuperpositionEigenSubString();
      eigenString = pd ? "|" + eigenSubString + "|<sup>2</sup>" : eigenSubString ;
      eigenText.text = eigenString;
      eigenText.right = background.right - 5;
    };
    
    // Plotting lower graph lines
    var maxEnergy = model.getMaxEnergy();
    var xScale    = function(x) { return (MAX_X + x) * (width / (MAX_X - MIN_X)); };
    var yScale    = function(y) { return (model.getMaxEnergy() - y) * (height / (maxEnergy - model.getMinEnergy())); };

    var time        = 0;
    var upper       = 10;
    var tstep       = 1;
    var currentLine = -1; // at the beginning we have no plotted path
    var plot        = this;
    model.realWaveProperty.link( function() {
      if (currentLine !== -1) {
          plot.removeChild(currentLine);
      }
      var points = model.getRealWave(time);
      var shape = new Shape();
      shape.moveTo(xScale(points[0][0]), yScale(points[1][0]));
      // iterate over all points and generate our full shape
      // this part takes a while so we only grab every 10th point (good enough)
      // reduction: 1344 points -> 134 points
      for (var j = 1; j < points[0].length; j += 20) {
          shape.lineTo(xScale(points[0][j]), yScale(points[1][j]));
      }
      var newPath = new Path(shape, {
          stroke: 'blue',
          linewidth: 3,
          lineJoin: 'round',
          x: 50
      });
      plot.addChild(newPath);
      currentLine = newPath;
      time += tstep;
      //time %= upper;
    });
    
    this.mutate( options );
    
    model.showProbDensityProperty.link( function() {
      if (model.showProbDensityProperty.value) {
        title.text = titlePDString;
        pd = true;
      }
      else {
        title.text = titleWFString;
        pd = false;
      }
      title.centerY = background.centerY;
      
      setEigenText();
    } );
    
    var superpositionProperty = model.getCoefficientsProperty();
    superpositionProperty.link( setEigenText );
    
    model.hoveredEigenstateProperty.link( function() {
      var string = getHoveredEigenstateString( model.hoveredEigenstateProperty.value );
      hoveredEigenText.text = string;
      hoveredEigenText.right = eigenText.right;
      if ( model.hoveredEigenstateProperty.value >= 0 ) {
        hoveredEigenText.visible = true;
      }
      else {
        hoveredEigenText.visible = false;
      }
    } );
    
  }
  return inherit( Node, WaveFunctionPlotNode);
} );
