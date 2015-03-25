// Copyright 2002-2013, University of Colorado Boulder
/**
* 1-dimensional Coulomb well potential
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
  * @param {QuantumBoundStatesModel} model
  * @param {double} wellOffset
  * @constructor
  */
  function Coulomb1DPotential( model, wellOffset ) {
    this.wellOffsetProperty = new Property( wellOffset );
    
    PotentialWell.call( this, model );
    
    this.minEnergy = -15; // eV
    this.maxEnergy = 5; // eV
    this.groundState = 1;
    
    var thisNode = this;
    this.wellOffsetProperty.link( thisNode.redrawEigenstates );
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
      var n = this.groundState;
      var solver = new Coulomb1DSolver( this.model, this.numPoints, this );
      var maxStates = solver.getMaxEigenstates();
      var cutoffEnergy = this.potentialValue( this.model.maxX );
      var energy = this.getNthEigenvalue(n);
      while ( energy < cutoffEnergy && n <= maxStates ) {
        this.eigenvals[n-this.groundState] = energy;
        n++;
        energy = this.getNthEigenvalue(n);
      }
      return this.eigenvals;
    },
    
    /**
     * Get an array of wavefunction points for the nth energy level
     * Wavefunction will have n-1 nodes
     * n starts at 1
     */
    getNthEigenstate: function( n ) {
      var pointsY;
      if ( this.eigenstateCache[n] ) {
        pointsY = this.eigenstateCache[n];
      }
      else {
        var energy = this.getNthEigenvalue( n );
        var solver = new Coulomb1DSolver( this.model, this.numPoints, this );
        pointsY = solver.calculateWavefunction( energy );
        this.cacheEigenstate( n-1, pointsY );
      }
      return [this.pointsX, pointsY];
    },
  } );
} );