// Copyright 2002-2015, University of Colorado Boulder
/**
* Asymmetric well potential
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PotentialWell = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/PotentialWell' );
  var Property = require( 'AXON/Property' );
  
  /**
  * @param {float} minX
  * @param {float} maxX
  * @param {Particle} particle
  * @param {double} wellOffset
  * @param {double} wellWidth
  * @param {double} wellHeight
  * @constructor
  */
  function AsymmetricPotential( minX, maxX, particle, wellOffset, wellWidth, wellHeight ) {
    // strings
    var asymString = require( 'string!QUANTUM_BOUND_STATES/asymmetric' );
    // images
    var asymImage = require( 'image!QUANTUM_BOUND_STATES/AsymIcon.png' );
    
    this.wellWidthProperty = new Property( wellWidth );
    this.wellHeightProperty = new Property( wellHeight );
    this.name = asymString;
    this.image = asymImage;
    
    PotentialWell.call( this, minX, maxX, particle, wellOffset );
    
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 1;
    
    this.wellWidthProperty.link( this.redrawEigenstates.bind( this ) );
    this.wellHeightProperty.link( this.redrawEigenstates.bind( this ) );
  }
  
  return inherit( PotentialWell, AsymmetricPotential, {
    
    reset: function( ) {
      this.wellWidthProperty.reset();
      this.wellHeightProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      if ( Math.abs(x) < this.wellWidthProperty.value / 2 ) {
        return this.wellHeightProperty.value / this.wellWidthProperty.value * x +
                this.wellOffsetProperty.value + this.wellHeightProperty.value / 2;
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