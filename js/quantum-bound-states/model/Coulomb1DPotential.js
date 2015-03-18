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
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  var constants = new QuantumBoundStatesConstants();
  
  /**
  * @param {double} wellOffset
  * @constructor
  */
  function Coulomb1DPotential( model, wellOffset ) {
    PotentialWell.call( this, model );
    
    this.wellOffsetProperty = new Property( wellOffset );
    this.model = model;
    this.minEnergy = -15; // eV
    this.maxEnergy = 5; // eV
    this.groundState = 1;
    this.eigenvals = [];
    this.redrawEigenstates = false;
  }
  
  return inherit( PotentialWell, Coulomb1DPotential, {
    
    reset: function( ) {
      this.wellOffsetProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x, in J
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      var k = 1 / (4 * Math.PI * constants.epsilon);
      x *= 1E-9;
      return -k * constants.electronCharge * constants.electronCharge / Math.abs(x) + this.wellOffsetProperty * constants.eVToJ;
    },
    
    /**
     * Get the energy of the nth energy level, in J
     */
    getNthEigenvalue: function( n ) {
      var m = this.model.particleMassProperty.value;
      var e = constants.electronCharge;
      var hbar = constants.hbar;
      var e0 = constants.epsilon;
      return -m * Math.pow(e, 4) / (2 * Math.pow(n * hbar * 4 * Math.PI * e0, 2)) + this.wellOffsetProperty * constants.eVToJ;
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
        while ( n <= 6 ) {
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