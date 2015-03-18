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
  var PotentialWell = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/PotentialWell' );
  var Property = require( 'AXON/Property' );
  
  /**
  * @param {double} wellOffset
  * @param {double} wellWidth
  * @param {double} wellHeight
  * @constructor
  */
  function AsymmetricPotential( model, wellOffset, wellWidth, wellHeight ) {
    PotentialWell.call( this, model );
    
    this.wellOffsetProperty = new Property( wellOffset );
    this.wellWidthProperty = new Property( wellWidth );
    this.wellHeightProperty = new Property( wellHeight );
    this.model = model;
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 1;
    this.eigenvals = []; // array of eigenstate energies
    this.redrawEigenstates = false;
  }
  
  return inherit( PotentialWell, AsymmetricPotential, {
    
    reset: function( ) {
      this.wellOffsetProperty.reset();
      this.wellWidthProperty.reset();
      this.wellHeightProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      if ( Math.abs(x) < this.wellWidthProperty / 2 ) {
        return (this.wellHeightProperty / this.wellWidthProperty * x + this.wellOffsetProperty + this.wellHeightProperty / 2) * constants.eVToJ;
      }
      else {
        return (this.wellOffsetProperty + this.wellHeightProperty) * constants.eVToJ;
      }
    },
    
    /**
     * Get the energy of the nth energy level
     */
    getNthEigenvalue: function( n ) {
      return n; // not calculated yet
    },
    
    /**
     * Get all eigenstates visible
     * Returns an array of energy values
     */
    getEigenvalues: function() {
      if ( this.eigenvals.length === 0 || this.redrawEigenstates ) {
        if ( this.redrawEigenstates ) {
          this.eigenvals = [];
        }
        var n = this.groundState;
        var energy = 0;
        while ( energy <= this.wellHeightProperty.value + this.wellOffsetProperty.value ) {
          energy = this.getNthEigenvalue(n);
          this.eigenvals.push( energy );
          n++;
        }
      }
      this.redrawEigenstates = false;
      return this.eigenvals;
    },
  } );
} );