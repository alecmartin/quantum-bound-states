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
  function AsymmetricPotential( wellOffset, wellWidth, wellHeight ) {
    this.wellOffset = new Property( wellOffset );
    this.wellWidth = new Property( wellWidth );
    this.wellHeight = new Property( wellHeight );
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 1;
    this.eigenvals = []; // array of eigenstate energies
    this.redrawEigenstates = false;
  }
  
  return inherit( Object, AsymmetricPotential, {
    
    /**
    * Get the value of the potential well at a point x
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      if ( Math.abs(x) < this.wellWidth / 2 ) {
        return this.wellHeight / this.wellWidth * x + this.wellOffset + this.wellHeight / 2;
      }
      else {
        return this.wellOffset + this.wellHeight;
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
        while ( energy <= this.wellHeight.value + this.wellOffset.value ) {
          energy = this.getNthEigenvalue(n);
          this.eigenvals.push( energy );
          n++;
        }
      }
      this.redrawEigenstates = false;
      return this.eigenvals;
    },
    
    /**
     * Get the number of eigenstates available
     */
    getNumberOfEigenstates: function() {
      if ( this.eigenvals.length === 0 ) {
        this.getEigenvalues();
      }
      return this.eigenvals.length;
    },
  } );
} );