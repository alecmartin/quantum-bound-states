// Copyright 2002-2015, University of Colorado Boulder
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
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  // constants
  var MIN_X = QuantumBoundStatesConstants.XRANGE.min;
  var MAX_X = QuantumBoundStatesConstants.XRANGE.max;
  
  // strings
  var coulomb1DString = require( 'string!QUANTUM_BOUND_STATES/coulomb_1d' );
  
  // images
  var coulombImage = require( 'image!QUANTUM_BOUND_STATES/CoulombIcon.png' );
  
  /**
  * @param {Particle} particle
  * @param {number} wellOffset
  * @constructor
  */
  function Coulomb1DPotential( particle, wellOffset ) {
    var name = coulomb1DString;
    var image = coulombImage;
    var minEnergy = -15; // eV
    var maxEnergy = 5; // eV
    var groundState = 1;
    
    PotentialWell.call( this, particle, wellOffset, minEnergy, maxEnergy, groundState, name, image );
  }
  
  return inherit( PotentialWell, Coulomb1DPotential, {
    
    /**
    * Get the value of the potential well at a point x
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      return -1 * QuantumBoundStatesConstants.KE2 / Math.abs( x ) + this.wellOffsetProperty.value;
    },
    
    /**
     * Get the energy of the nth energy level
     */
    getNthEigenvalue: function( n ) {
      var m = this.particle.particleMassProperty.value;
      return -m * QuantumBoundStatesConstants.KE2 * QuantumBoundStatesConstants.KE2 /
      (2 * QuantumBoundStatesConstants.HBAR * QuantumBoundStatesConstants.HBAR * n * n) + this.wellOffsetProperty.value;
    },
    
    /**
     * Get all eigenstates visible
     * Returns an array of energy values
     */
    getEigenvalues: function() {
      var n = this.groundState;
      var solver = new Coulomb1DSolver( this.particle, this.numPoints );
      var maxStates = solver.getMaxEigenstates();
      var cutoffEnergy = this.potentialValue( MAX_X );
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
        var solver = new Coulomb1DSolver( this.particle, this.numPoints );
        pointsY = solver.calculateWavefunction( energy );
        this.cacheEigenstate( n-1, pointsY );
      }
      return [this.pointsX, pointsY];
    },
  } );
} );