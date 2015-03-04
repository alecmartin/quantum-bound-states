//  Copyright 2002-2014, University of Colorado Boulder

/**
 *
 * @author Emily Randall
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

  function EnergyPlotNode( model, width, height, options ) {

    Node.call( this, options );
    
    // strings
    var titleString = require( 'string!QUANTUM_BOUND_STATES/energy-plot-title' );
    
    var background = new Rectangle(50, 0, width, height, 0, 0, {fill:'black'});
    this.addChild( background );
    
    // ticks along left side
    var ySpacing = (height - 10) / 4;
    var tickLength = 5;
    var yLoc = 5;
    for (var i = model.getMaxEnergy(); i >= model.getMinEnergy(); i -= 5) {
      var tick = new Line(background.left, yLoc, background.left - tickLength, yLoc, {stroke: 'black'});
      this.addChild( tick );
      this.addChild( new Text( i.toString(), {right: tick.left - 5, centerY: yLoc, font: new PhetFont( 12 )} ) );
      yLoc += ySpacing;
    }
    
    // vertical lines
    var divisors = (model.maxX - model.minX);
    var xSpacing = (width  / divisors);
    var xLoc = xSpacing /2;
    for (var i = model.minX + 0.5; i < divisors + model.minX; i += 1) {
      var tick = new Line(background.left + xLoc, background.top, background.left+xLoc, background.bottom, {stroke: 'gray'});
      this.addChild( tick );
      xLoc += xSpacing;
    }
    
    var l = new Line(background.left, background.centerY, background.right, background.centerY, {stroke:'purple'});
    this.addChild(l);
    
    var title = new Text( titleString, {
      font: new PhetFont( 18 ),
      rotation: -Math.PI / 2,
      centerY: background.centerY,
      x: background.left - 30,
    });
    this.addChild( title );
  }

  return inherit( Node, EnergyPlotNode );
} );