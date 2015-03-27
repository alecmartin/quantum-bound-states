// Copyright 2015, University of Colorado Boulder
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
  
  /**
  * @param {float} minX
  * @param {float} maxX
  * @param {Particle} particle
  * @param {double} wellOffset
  * @param {double} wellWidth
  * @param {double} wellHeight
  * @constructor
  */
  function SquareWellPotential( minX, maxX, particle, wellOffset, wellWidth, wellHeight ) {
    // strings
    var squareString = require( 'string!QUANTUM_BOUND_STATES/square' );
    // images
    var squareImage = require( 'image!QUANTUM_BOUND_STATES/SquareIcon.png' );
    
    this.wellWidthProperty = new Property( wellWidth );
    this.wellHeightProperty = new Property( wellHeight );
    this.name = squareString;
    this.image = squareImage;
    
    PotentialWell.call( this, minX, maxX, particle, wellOffset );
    
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 1;
    
    var thisNode = this;
    
    this.wellWidthProperty.link( thisNode.redrawEigenstates );
    
    this.wellHeightProperty.link( thisNode.redrawEigenstates );
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
        this.eigenvals[n] = energy;
        n++;
        energy = this.getNthEigenvalue( n );
      }
      return this.eigenvals;
    },
  } );
} );