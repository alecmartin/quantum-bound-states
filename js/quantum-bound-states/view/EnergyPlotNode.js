// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for the energy plot
 * Contains the drawing of the potential well and the energy lines
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyLine = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/EnergyLine' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PotentialWellPlot = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialWellPlot' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  
  // constants
  var MIN_X = QuantumBoundStatesConstants.XRANGE.min;
  var MAX_X = QuantumBoundStatesConstants.XRANGE.max;
  var PADDING = 10;

  // strings
  var titleString = require( 'string!QUANTUM_BOUND_STATES/energy-plot-title' );
  var totalEnergyString = require( 'string!QUANTUM_BOUND_STATES/energy-plot-total-energy' );
  var potentialEnergyString = require( 'string!QUANTUM_BOUND_STATES/energy-plot-potential-energy' );

  /**
  * @param {QuantumBoundStatesModel} model
  * @param {number} width
  * @param {number} height
  * @constructor
  */
  function EnergyPlotNode( model, width, height, options ) {

    Node.call( this, options );
    var thisNode = this;
    
    var setCoefficient = function( i ) {
      model.setOneCoefficient( i );
    };
    
    var energyLine;
    var yPos;
    var eigenIndex;
    var energyLineArray = [];
    function drawEnergyLines() {
      var eigenVals = model.eigenvalsProperty.value;
      var yScale = (height - PADDING) / (model.getMaxEnergy() - model.getMinEnergy());
      for ( var j = 0; j < energyLineArray.length; j++ ) {
        thisNode.removeChild( energyLineArray[ j ] );
      }
      energyLineArray = [];
      for( var i = eigenVals.length - 1; i >= 0; i-- ){
        yPos = ( model.getMaxEnergy() - eigenVals[ i ] ) * yScale + PADDING / 2;
        eigenIndex = i + model.currentPotentialProperty.value.groundState;
        energyLine = new EnergyLine( model.hoveredEigenstateProperty,
                                    setCoefficient,
                                    width,
                                    eigenIndex,
                                    eigenVals[ i ],
                                    {x: background.left, y: yPos} );
        background.addChild( energyLine );
        energyLineArray[ i ] = energyLine;
      } 
    }
    
    var i;
    var background = new Rectangle(50, 0, width, height, 0, 0, {fill:'black', stroke: 'white'});
    var backgroundClipArea = background.createRectangleShape();
    background.setClipArea( backgroundClipArea );
    this.addChild( background );
    
    // ticks along left side
    var ySpacing = (height - PADDING) / 4;
    var tickLength = 5;
    var yLoc = PADDING / 2;
    for (i = model.getMaxEnergy(); i >= model.getMinEnergy(); i -= 5) {
      var tick = new Line(background.left, yLoc, background.left - tickLength, yLoc, {stroke: 'white'});
      this.addChild( tick );
      this.addChild( new Text( i.toString(), {
        right: tick.left - 5,
        centerY: yLoc,
        font: new PhetFont( 12 ),
        fill: 'white'} ) );
      yLoc += ySpacing;
    }
    
    // vertical lines
    var divisors = (MAX_X - MIN_X);
    var xSpacing = (width  / divisors);
    var xLoc = xSpacing / 2;
    for (i = MIN_X + 0.5; i < divisors + MIN_X; i += 1) {
      var line = new Line(background.left + xLoc, background.top, background.left + xLoc, background.bottom, {stroke: 'gray'});
      background.addChild( line );
      xLoc += xSpacing;
    }

    //Creating and Positioning Energy Lines
    drawEnergyLines();
    
    var well = new PotentialWellPlot( model, width, height - PADDING, {x: background.left, y: PADDING / 2} );
    background.addChild( well );   
    
    var title = new Text( titleString, {
      font: new PhetFont( 18 ),
      rotation: -Math.PI / 2,
      centerY: background.centerY,
      x: background.left - 30,
      fill: 'white'
    });
    this.addChild( title );

    var totalEnergy = new Text( totalEnergyString, {
      font: new PhetFont( 18 ),
      fill: 'white'
    });

    var totalEnergyLine = new Line(0, 0, 20, 0, {stroke: 'green', lineWidth: 3});

    var potentialEnergy = new Text( potentialEnergyString, {
      font: new PhetFont( 18 ),
      fill: 'white'
    });

    var potentialEnergyLine = new Line(0, 0, 20, 0, {stroke: 'purple', lineWidth: 3});

    var units = new HBox( {
      x: background.left,
      y: background.top - 20,
      children: [ 
        new HStrut( 10 ), 
        totalEnergyLine, 
        new HStrut( 5 ) ,
        totalEnergy,
        new HStrut( 30 ) , 
        potentialEnergyLine, 
        new HStrut( 5 ) ,
        potentialEnergy 
      ]
    });
    this.addChild( units );

    var coefficientsProperty = model.getCoefficientsProperty();
    coefficientsProperty.link( function() {
      console.log(model.getCurrentEigenstates());
      var coefficients = coefficientsProperty.value;
      for( var i = 0; i < energyLineArray.length; i++ ){
        if( coefficients[ i ] !== 0 ){
          energyLineArray[ i ].setStroke( 'red' );
        }
        else {
          energyLineArray[ i ].setStroke( 'green' );
        }
      }
    });
    
    model.eigenvalsProperty.link( function() {
      console.log("egein");
      //drawEnergyLines();
    });
  }
  
  return inherit( Node, EnergyPlotNode );
} );