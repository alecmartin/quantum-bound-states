// Copyright 2002-2013, University of Colorado Boulder
/**
* Square well potential
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  
  /**
  * @param {double} wellOffset
  * @param {double} wellWidth
  * @param {double} wellHeight
  * @constructor
  */
  function SquareWellPotential( wellOffset, wellWidth, wellHeight ) {
    this.wellOffset = new Property( wellOffset );
    this.wellWidth = new Property( wellWidth );
    this.wellHeight = new Property( wellHeight );
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 1;
  }
  
  return inherit( Object, SquareWellPotential, {
    
    /**
    * Get the value of the potential well at a point x
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      if ( Math.abs(x) < this.wellWidth / 2 ) {
        return this.wellOffset;
      }
      else {
        return this.wellOffset + this.wellHeight;
      }
    }
  } );
} );