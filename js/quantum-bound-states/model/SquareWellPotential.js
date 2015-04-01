// Copyright 2002-2015, University of Colorado Boulder
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
  var PotentialWell = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/PotentialWell' );

  // strings
  var squareString = require( 'string!QUANTUM_BOUND_STATES/square' );

  // images
  var squareImage = require( 'image!QUANTUM_BOUND_STATES/SquareIcon.png' );

  /**
  * @param {number} minX
  * @param {number} maxX
  * @param {Particle} particle
  * @param {number} wellOffset
  * @param {number} wellWidth
  * @param {number} wellHeight
  * @constructor
  */
  function SquareWellPotential( minX, maxX, particle, wellOffset, wellWidth, wellHeight ) {
    this.wellWidthProperty = new Property( wellWidth );
    this.wellHeightProperty = new Property( wellHeight );
    var name = squareString;
    var image = squareImage;
    var minEnergy = -5; // eV
    var maxEnergy = 15; // eV
    var groundState = 1;
    
    PotentialWell.call( this, minX, maxX, particle, wellOffset, minEnergy, maxEnergy, groundState, name, image );
    
    this.wellWidthProperty.link( this.redrawEigenstates.bind( this ) );
    this.wellHeightProperty.link( this.redrawEigenstates.bind( this ) );
  }
  
  return inherit( PotentialWell, SquareWellPotential, {
    
    reset: function( ) {
      this.wellWidthProperty.reset();
      this.wellHeightProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x, in J
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      if ( Math.abs(x) < this.wellWidthProperty.value / 2 ) {
        return this.wellOffsetProperty.value;
      }
      else {
        return this.wellOffsetProperty.value + this.wellHeightProperty.value;
      }
    },
    
    /**
     * Get all eigenstates visible
     * Returns an array of energy values
     */
    getEigenvalues: function() {
      var n = this.groundState;
      var energy = this.getNthEigenvalue( n );
      while ( energy < this.wellHeightProperty.value + this.wellOffsetProperty.value ) {
        this.eigenvals[n-this.groundState] = energy;
        n++;
        energy = this.getNthEigenvalue( n );
      }
      return this.eigenvals;
    },
  } );
} );