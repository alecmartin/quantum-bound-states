// Copyright 2002-2015, University of Colorado Boulder
/**
* Coulomb 1D solver, inherits from Coulomb Solver
* Provides an analytic solution for eigenstates of a 1D Coulomb Well
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var CoulombSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/CoulombSolver' );
  var inherit = require( 'PHET_CORE/inherit' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  // constants
  var SCALING_COEFFICIENTS = [1.10851, -1.86636,  2.55958, -3.21387,  3.84064, -4.44633,  5.03504, -5.60960,  6.17208, -6.72406];
  
  /**
  * @param {Particle} particle
  * @param {number} n: the number of points to return in a calculated wavefunction
  * @constructor
  */
  function Coulomb1DSolver( particle, n ) {
    CoulombSolver.call( this, particle, n );
  }
  
  return inherit( CoulombSolver, Coulomb1DSolver, {
    getMaxEigenstates: function() {
      return SCALING_COEFFICIENTS.length;
    },
    
    /**
     * Gets the scaling coefficient used for a specified eigenstate index.
     * @param nodes number of nodes in the wave function
     */
    getScalingCoefficient: function( nodes ) {
      return SCALING_COEFFICIENTS[ nodes ];
    },
    
    /*
     * Calculates the scaled wave function at a position.
     * Scaled means that the maximum amplitude is 1.
     *
     * @param nodes eigenstate subscript, n=1,2,3,...
     * @param x position, in nm
     * @return scaled value of psi
     */
    psiScaled: function( nodes, x ) {
      var coeff = this.getScalingCoefficient( nodes );
      var mass = this.particle.particleMassProperty.value;
      return Math.sqrt(QuantumBoundStatesConstants.ELECTRON_MASS / mass) * coeff * x * this.calculatePsi( nodes, x );
    }
  } );
} );