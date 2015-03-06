// Copyright 2002-2013, University of Colorado Boulder
/**
* Square well potential
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var dot = require( 'DOT/dot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  
  // constants
  var constants = new QuantumBoundStatesConstants();
  var FastArray = dot.FastArray;
  
  /**
  * @constructor
  */
  function EigenstateSolver( model ) {
    this.model = model;  
  }
  
  return inherit( Object, EigenstateSolver, {
    
    /**
     * Runge Kutta solver for eigenstate functions at t=0
     * @param potentialValue: function that returns the value of the potential at any point x
     * @param n: number of points to produce
     * @param psi_o: initial vector [psi, psi']
     * For even functions, assume psi(x=0)=1, psi'(0)=0
     * For odd functions, assume psi(0)=0, psi'(0)=1
     * Normalize later
     * @energy: energy of the eigenstate
     */
    getEigenstate: function( potentialValue, n, psi_o, energy ) {
      var eigen = new FastArray( n );
      var psi = psi_o;
      var x = this.model.minX;
      var delta = (this.model.maxX - this.model.minX) / (n - 1);
      for (var i = 0; i < n; i++) {
        eigen[ i ] = new Vector2( x, psi[0] );
        x += delta;
        psi = this.step( potentialValue, delta, x, psi, energy );
      }
      return eigen;
    },
    
    /**
     * Takes a single RK4 step from initial point (x, psi)
     * @param potentialValue: function that returns the value of the potential at any point x
     * @param delta: step size
     * @param x: position of point to step from
     * @param psi: array of [psi, psi']
     * @param energy: energy of the eigenstate
     */
    step: function( potentialValue, delta, x, psi, energy ) {
      var k1 = this.fprime(potentialValue, x, psi, energy);
      var k2 = this.fprime(potentialValue, x + delta/2, [psi[0] + k1[0]*delta/2, psi[1] + k1[1]*delta/2], energy);
      var k3 = this.fprime(potentialValue, x + delta/2, [psi[0] + k2[0]*delta/2, psi[1] + k2[1]*delta/2], energy);
      var k4 = this.fprime(potentialValue, x + delta, [psi[0] + k3[0]*delta, psi[1] + k3[1]*delta], energy);
      var ksum = [k1[0] + 2*k2[0] + 2*k3[0] + k4[0], k1[1] + 2*k2[1] + 2*k3[1] + k4[1]];
      return [x[0] + ksum[0]*delta/6, x[1] + ksum[1]*delta/6];
    },
    
    /**
     * Derivative function for RK4 to use
     * @param potentialValue: function that returns the value of the potential at any point x
     * @param x: position of the point
     * @param psi: array of [psi, psi']
     * returns an array of [psi', psi'']
     */
    fprime: function( potentialValue, x, psi, energy ) {
      var E = energy;
      var m = this.model.particleMassProperty.value;
      var hbar = constants.hbar;
      var y = psi[1];
      var yprime = (potentialValue( x ) - E) * 2 * m / (hbar * hbar) * psi;
      return [y, yprime];
    },
    
  } );
} );