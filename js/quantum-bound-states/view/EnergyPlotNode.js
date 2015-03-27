// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for the top plot
 * Contains the drawing of the potential well and the energy lines
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PotentialWellNode = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialWellNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
  * @param {QuantumBoundStatesModel} model
  * @param {int} width
  * @param {int} height
  * @constructor
  */
  function EnergyPlotNode( model, width, height, options ) {

    Node.call( this, options );
    
    // strings
    var titleString = require( 'string!QUANTUM_BOUND_STATES/energy-plot-title' );
    var totalEnergyString = require( 'string!QUANTUM_BOUND_STATES/energy-plot-total-energy' );
    var potentialEnergyString = require( 'string!QUANTUM_BOUND_STATES/energy-plot-potential-energy' );
    
    var background = new Rectangle(50, 0, width, height, 0, 0, {fill:'black', stroke: 'white'});
    this.addChild( background );
    
    var padding = 10;
    
    // ticks along left side
    var ySpacing = (height - padding) / 4;
    var tickLength = 5;
    var yLoc = 5;
    for (var i = model.getMaxEnergy(); i >= model.getMinEnergy(); i -= 5) {
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
    var divisors = (model.maxX - model.minX);
    var xSpacing = (width  / divisors);
    var xLoc = xSpacing / 2;
    for (var i = model.minX + 0.5; i < divisors + model.minX; i += 1) {
      var line = new Line(background.left + xLoc, background.top, background.left+xLoc, background.bottom, {stroke: 'gray'});
      this.addChild( line );
      xLoc += xSpacing;
    }
    
    var well = new PotentialWellNode( model, width, height + padding, {x: 50} );
    this.addChild( well );
    
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
  }
  
  return inherit( Node, EnergyPlotNode );
} );