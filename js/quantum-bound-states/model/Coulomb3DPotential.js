// Copyright 2002-2015, University of Colorado Boulder
/**
* 3D Coulomb well potential
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var Coulomb3DSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DSolver' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PotentialWell = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/PotentialWell' );
  var Property = require( 'AXON/Property' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  // constants
  var MAX_EIGENSTATES = 10;
  
  /**
  * @param {float} minX
  * @param {float} maxX
  * @param {Particle} particle
  * @param {double} wellOffset
  * @constructor
  */
  function Coulomb3DPotential( minX, maxX, particle, wellOffset ) {
    // strings
    var coulomb3DString = require( 'string!QUANTUM_BOUND_STATES/coulomb_3d' );
    // images
    var coulombImage = require( 'image!QUANTUM_BOUND_STATES/CoulombIcon.png' );
    
    this.name = coulomb3DString;
    this.image = coulombImage;
    
    PotentialWell.call( this, minX, maxX, particle, wellOffset );
    
    this.minEnergy = -15; // eV
    this.maxEnergy = 5; // eV
    this.groundState = 1;
  }
  
  return inherit( PotentialWell, Coulomb3DPotential, {
    
    /**
    * Get the value of the potential well at a point r
    * @param {double} r: distance from center of well (origin) in nanometers
    */
    potentialValue: function( r ) {
      return -1 * QuantumBoundStatesConstants.KE2 / Math.abs(r) + this.wellOffsetProperty.value;
    },
    
    /**
     * Get the energy of the nth energy level
     * n starts at 1
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
      var energy = this.getNthEigenvalue( n );
      while ( n <= MAX_EIGENSTATES ) {
        this.eigenvals[n - this.groundState] = energy;
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
        var solver = new Coulomb3DSolver( this.minX, this.maxX, this.particle, this.numPoints );
        pointsY = solver.calculateWavefunction( energy );
        this.cacheEigenstate( n-1, pointsY );
      }
      return [this.pointsX, pointsY];
    },
  } );
} );