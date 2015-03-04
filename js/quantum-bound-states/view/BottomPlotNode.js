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

  function BottomPlotNode( model, width, height, options ) {

    // strings
    var titleWFString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-wf-title' );
    var titlePDString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-pd-title' );
    var positionString = require( 'string!QUANTUM_BOUND_STATES/bottom-plot-position' );


    Node.call( this, options );
    //create black background
    var background = new Rectangle(50,0,width,height,0,0, {fill:'black'});
    this.addChild( background );
    
    var divisors = (model.maxX - model.minX);
    var xSpacing = (width  / divisors);
    var xLoc = xSpacing /2;
    for (var i = model.minX + 0.5; i < divisors + model.minX; i += 1) {
      var tick = new Line(background.left + xLoc, background.top, background.left+xLoc, background.bottom, {stroke: 'gray'});
      this.addChild( tick );
      this.addChild( new Text( i.toString(), {centerX: tick.centerX, top: background.bottom + 5, font: new PhetFont( 12 )} ) );
      xLoc += xSpacing;
    }

    // right now default to WFString
    var title = new Text( titleWFString, {
      font: new PhetFont( 18 ),
      rotation: -Math.PI / 2,
      centerY: background.centerY,
      x: background.left - 30,
    });
    this.addChild( title );

    var units = new Text( positionString, {
      font: new PhetFont( 18 ),
      centerX: background.centerX,
      y: background.bottom + 40,
    });
    this.addChild( units );
    
    model.showProbDensityProperty.link( function() {
      if (model.showProbDensityProperty.value) {
        title.text = titlePDString;
      }
      else {
        title.text = titleWFString;
      }
    });
  }

  return inherit( Node, BottomPlotNode);
} );