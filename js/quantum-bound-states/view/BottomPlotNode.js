//  Copyright 2002-2014, University of Colorado Boulder

/**
 *
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function BottomPlotNode( model, width, height, options ) {

    Node.call( this, options );
    //create black background
    var background = new Rectangle(50,0,width,height,0,0, {fill:'black'});
    this.addChild( background );
    
  }

  return inherit( Node, BottomPlotNode);
} );