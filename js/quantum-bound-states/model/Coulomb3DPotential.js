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
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  var constants = new QuantumBoundStatesConstants();
  
  /**
  * @param {double} wellOffset
  * @constructor
  */
  function Coulomb3DPotential( model, wellOffset ) {
    this.wellOffset = new Property( wellOffset );
    this.model = model;
    this.minEnergy = -15; // eV
    this.maxEnergy = 5; // eV
    this.groundState = 1;
    this.eigenvals = [];
    this.redrawEigenstates = false;
  }
  
  return inherit( Object, Coulomb3DPotential, {
    
    reset: function( ) {
      this.wellOffset.reset();
    },
    
    /**
    * Get the value of the potential well at a point r
    * @param {double} r: distance from center of well (origin) in nanometers
    */
    potentialValue: function( r ) {
      var k = 1 / (4 * Math.PI * constants.epsilon);
      return -k * constants.electronCharge * constants.electronCharge / Math.abs(r) + this.wellOffset;
    },
    
    /**
     * Get the energy of the nth energy level
     */
    getNthEigenvalue: function( n ) {
      var m = this.model.particleMassProperty.value;
      var e = constants.electronCharge;
      var hbar = constants.hbar;
      var e0 = constants.epsilon;
      return -m * Math.pow(e, 4) / (2 * Math.pow(n * hbar * 4 * Math.PI * e0, 2)) + this.wellOffset;
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
        while ( n <= 10 ) {
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