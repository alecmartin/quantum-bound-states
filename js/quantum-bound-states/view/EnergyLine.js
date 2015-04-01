// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for a line that represents the energy of an eigenstate
 * Line is initially green, but turns yellow when hovered over
 * Lines are red when they are selected
 */
define( function( require ){
	
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  /**
  * @param {Property} hoveredEigenstateProperty
  * @param {number} width
  * @constructor
  */

  function EnergyLine( hoveredEigenstateProperty, width, options ){
    options = _.extend( {
      stroke: 'green',
      lineWidth: 3
    }, options );
    
<<<<<<< HEAD
    Line.call( this, 0, 0, width, 0);
=======
    Line.call( this, 0, 0, width, 0 );
    
>>>>>>> e7b2a981b7044006662fae3c419004d8f92ac0b2
    

    this.mutate( options );
  }
  
  return inherit( Line, EnergyLine );

} );
