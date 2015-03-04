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

  function EnergyPlotNode( model, options ) {

    Node.call( this, options );
    
  }

  return inherit( Node, EnergyPlotNode);
} );