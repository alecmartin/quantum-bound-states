// Copyright 2002-2015, University of Colorado Boulder
/**
* Parent class for Coulomb solvers
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var dot = require( 'DOT/dot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  // constants
  var FastArray = dot.FastArray;
  var SQRT_4_PI = Math.sqrt(4 * Math.PI);
  
  /**
  * @param {number} minX
  * @param {number} maxX
  * @param {Particle} particle
  * @param {number} n: the number of points to return in a calculated wavefunction
  * @constructor
  */
  function CoulombSolver( minX, maxX, particle, n ) {
    this.minX = minX;
    this.maxX = maxX;
    this.particle = particle;
    this.ab = this.getBohrRadius();
    this.n = n;
    
    var thisNode = this;
    particle.particleMassProperty.link( function () {
      thisNode.ab = thisNode.getBohrRadius();
    });
  }
  
  return inherit( Object, CoulombSolver, {
    getBohrRadius: function() {
      return QuantumBoundStatesConstants.HBAR * QuantumBoundStatesConstants.HBAR /
      (this.particle.particleMassProperty.value * QuantumBoundStatesConstants.KE2);
    },
    
    /**
     * Return the scaled wavefunction
     */
    calculateWavefunction: function( nodes ) {
      var dx = (this.maxX - this.minX) / (this.n - 1);
      var x = this.minX;
      var wave = new FastArray( this.n );
      for (var i = 0; i < this.n; i++) {
        wave[i] = this.psiScaled( nodes, x );
        x += dx;
      }
      return wave;
    },
    
     /*
     * Calculates the unscaled wave function at a position
     *
     * @param nodes eigenstate subscript n=1,2,3,...
     * @param x position, in nm
     */
    calculatePsi: function( nodes, x ) {
      x = Math.abs(x);
      return 1.0 / SQRT_4_PI * Math.exp(-x / (nodes * this.ab)) * this.bxSum( nodes, x );
    },
    
    /*
     * Calculates the summation term involving b and x.
     *
     * @param nodes eigenstate subscript n=1,2,3,...
     * @param x position, in nm
     */
    bxSum: function( nodes, x ) {
      x = Math.abs( x );
      var sum = 0.0;
      var b = 0.0;
      var bPrevious = 0.0;
      for ( var j = 0; j <= nodes - 1; j++ ) {
        b = this.getB( j, nodes, bPrevious );
        sum += b * Math.pow(x, j);
        bPrevious = b;
      }
      return sum;
    },
    
    /*
     * Calculates the common term b<sub>j</sub>.
     *
     * For j = 0, b(0) = 2 * ( (n * a)^(-3/2) )
     *
     * For j > 0, b(j) = ( 2 / (n * a) ) * ( (j + l - n ) / (j * ( j + ( 2 * l ) + 1 )) ) * b(j-1)
     *
     * @param j which value of b to calculate
     * @param n eigenstate subscript n=1,2,3,...
     * @param bPrevious b<sub>j-1</sub>
     */
    getB: function( j, nodes, bPrevious ) {
      var b = 0.0;
      if ( j === 0 ) {
        b = 2 * Math.pow((nodes * this.ab), -1.5);
      }
      else {
        b = (2 / (nodes * this.ab)) * ((j - nodes) / (j * (j + 1 ))) * bPrevious;
      }
      return b;
    }
  } );
} );