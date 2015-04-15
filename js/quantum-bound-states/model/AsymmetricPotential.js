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
  
  // strings
  var asymString = require( 'string!QUANTUM_BOUND_STATES/asymmetric' );
  
  // images
  var asymImage = require( 'image!QUANTUM_BOUND_STATES/AsymIcon.png' );
  
  /**
  * @param {Particle} particle
  * @param {number} wellOffset
  * @param {number} wellWidth
  * @param {number} wellHeight
  * @constructor
  */
  function AsymmetricPotential( particle, wellOffset, wellWidth, wellHeight ) {
    this.wellWidthProperty = new Property( wellWidth, { propertyID: "wellWidth" } );
    this.wellHeightProperty = new Property( wellHeight, { propertyID: "wellHeight" } );
    var name = asymString;
    var image = asymImage;
    var minEnergy = -5; // eV
    var maxEnergy = 15; // eV
    var groundState = 1;
    
    PotentialWell.call( this, particle, wellOffset, minEnergy, maxEnergy, groundState, name, image );
    
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
        this.eigenvals[n-this.groundState] = energy;
        n++;
        energy = this.getNthEigenvalue( n );
      }
      return this.eigenvals;
    },
  } );
} );