// Copyright 2002-2013, University of Colorado Boulder
/**
* Square well potential
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var Coulomb1DSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DSolver' );
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
    this.wellOffsetProperty = new Property( wellOffset );
    
    PotentialWell.call( this, model );
    
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
    * Get the value of the potential well at a point x
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      return -1 * constants.ke2 / Math.abs(x) + this.wellOffsetProperty.value;
    },
    
    /**
     * Get the energy of the nth energy level
     */
    getNthEigenvalue: function( n ) {
      var m = this.model.particleMassProperty.value;
      return -m * constants.ke2 * constants.ke2 / (2 * constants.hbar * constants.hbar * n * n) + this.wellOffsetProperty.value;
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
    
    /**
     * Get an array of wavefunction points for the nth energy level
     * Wavefunction will have n nodes
     */
    getNthEigenstate: function( n ) {
      var energy = this.getNthEigenvalue( n );
      var solver = new Coulomb1DSolver( this.model, this.numPoints, this );
      var pointsY = solver.calculateWavefunction( energy );
      var pointsX = [];
      var x = this.model.minX;
      for (var i = 0; i < this.numPoints; i++) {
        pointsX.push[x];
        x += (this.model.maxX - this.model.minX) / this.numPoints - 1;
      }
      return [pointsX, pointsY];
    },
  } );
} );