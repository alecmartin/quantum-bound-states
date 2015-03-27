// Copyright 2015, University of Colorado Boulder
/**
* Coulomb 3D solver, inherits from Coulomb Solver
* Provides an analytic solution for eigenstates of a 3D Coulomb Well
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var CoulombSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/CoulombSolver' );
  var inherit = require( 'PHET_CORE/inherit' );
  
  // constants
  var SQRT_PI = Math.sqrt(Math.PI);
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @param {int} n: the number of points to return in a calculated wavefunction
  * @param {Coulomb3DPotential} potential
  * @constructor
  */
  function Coulomb3DSolver( model, n, potential ) {
    CoulombSolver.call( this, model, n, potential );
  }
  
  return inherit( CoulombSolver, Coulomb3DSolver, {
    /**
     * Gets the scaling coefficient used for a specified eigenstate index.
     * @param nodes eigenstate subscript, n=1,2,3,...
     */
    getScalingCoefficient: function( nodes ) {
      var ab = this.getBohrRadius();
      return SQRT_PI * Math.pow((nodes * ab), 1.5);
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
      return this.getScalingCoefficient( nodes ) * this.calculatePsi( nodes, x );
    }
  } );
} );