// Copyright 2002-2015, University of Colorado Boulder
/**
* Numerical solver for eigenstates and eigenvalues
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
  var SMALL = 1.0E-10;
  var MAX_TRIES = 100;
  
  /**
   * @constructor for helper class
   */
  function EnergyTester( nodes, derivative ) {
    this.nodes = nodes;
    this.derivative = derivative;
  }
  
  inherit( Object, EnergyTester, {
    /**
     * Return true if the energy being tested is higher than the eigenvalue energy
     */
    isUpper: function( nodes ) {
      return (this.nodes > nodes || (this.nodes === nodes && this.derivative < 0.0));
    }
  });
  
  /**
  * @constructor for the eigenstate solver
  * @param {float} minX
  * @param {float} maxX
  * @param {Particle} particle
  * @param {int} n: the number of points to produce in a wavefunction
  * @param {PotentialWell} potential
  */
  function EigenstateSolver( minX, maxX, particle, n, potential ) {
    this.maxX = maxX;
    this.minX = minX;
    this.n = n;
    this.hb = QuantumBoundStatesConstants.HBAR * QuantumBoundStatesConstants.HBAR / (2 * particle.particleMassProperty.value);
    this.potential = potential;
    this.potentialPoints = potential.getPotentialPoints( n )[1];
    
    var thisNode = this;
    
    particle.particleMassProperty.link( function () {
      thisNode.hb = QuantumBoundStatesConstants.HBAR * QuantumBoundStatesConstants.HBAR / (2 * particle.particleMassProperty.value);
    });
  }
  
  return inherit( Object, EigenstateSolver, {
    
    /**
     * Integrate the wavefunction for a guessed value of energy
     */
    testEnergy: function( energy ) {
      var n = this.n;
      var hbInverse = 1 / this.hb;
      var matchPoint = n * 0.53;
      var dx = (this.maxX - this.minX) / (n - 1);
      var h12 = dx * dx / 12;
      
      // initial and final boundary conditions
      var u1 = 0.0;
      var u2 = 0.0;
      var u3 = dx;
      var u1Final = 0.0;
      var u2Final = dx;
      var nodes = 0;
      var v1 = 0.0;
      var v2 = 0.0;
      var v3 = hbInverse * (this.potentialPoints[1] - energy);
      
      for (var i = 2; i <= matchPoint + 1; i++) {
        u1 = u2;
        u2 = u3;
        v1 = v2;
        v2 = v3;
        v3 = hbInverse * (this.potentialPoints[i] - energy);
        u3 = (u2 * (2 + 10 * h12 * v2) - u1 * (1 - h12 * v1)) / (1 - h12 * v3);
        if ( i <= matchPoint && ((u3 < 0 && u2 > 0) || (u3 > 0 && u2 < 0))) {
          nodes++;
        }
      }
      
      var approximateDerivative = (u3 - u1) / (2 * dx * u2);
      u2 = u1Final;
      u3 = u2Final;
      v2 = 0.0;
      v3 = hbInverse * (this.potentialPoints[n - 2] - energy);
      
      for (var j = n - 3; j >= matchPoint - 1; j--) {
        u1 = u2;
        u2 = u3;
        v1 = v2;
        v2 = v3;
        v3 = hbInverse * (this.potentialPoints[j] - energy);
        u3 = (u2 * (2 + 10 * h12 * v2) - u1 * (1 - h12 * v1)) / (1 - h12 * v3);
        if ( j >= matchPoint && ((u3 < 0 && u2 > 0) || (u3 > 0 && u2 < 0))) {
          nodes++;
        }
      }
      
      approximateDerivative += (u3 - u1) / (2 * dx * u2);
      
      return new EnergyTester( nodes, approximateDerivative );
    },
    
    /**
     * Calculate the energy of an eigenstate with the specified number of nodes
     */
    calculateEnergy: function( nodes ) {
      var i = 0;
      var upperTester;
      var lowerTester;
      // find upper bound
      var upperEnergy = this.hb * 10.0 * Math.pow((nodes + 1) / (this.maxX - this.minX), 2);
      for (i = 0; i < MAX_TRIES; i++) {
        upperEnergy *= 2.0;
        upperTester = this.testEnergy( upperEnergy );
        if (upperTester.isUpper( nodes )) {
          break;
        }
      }
      if (i === MAX_TRIES) {
        console.log("Couldn't find upper bound, nodes = "+nodes);
      }
      
      // find lower bound
      var lowerEnergy = -this.hb * 10.0 * Math.pow((nodes + 1) / (this.maxX - this.minX), 2);
      for (i = 0; i < MAX_TRIES; i++) {
        lowerEnergy *= 2.0;
        lowerTester = this.testEnergy( lowerEnergy );
        if (!lowerTester.isUpper( nodes )) {
          break;
        }
      }
      if (i === MAX_TRIES) {
        console.log("Couldn't find lower bound, nodes = "+nodes);
      }
      
      // binary chop to get close to exact energy
      var midEnergy = 0;
      var midTester;
      for (i = 0; i < MAX_TRIES && (upperTester.nodes !== lowerTester.nodes); i++) {
        midEnergy = 0.5 * (lowerEnergy + upperEnergy);
        midTester = this.testEnergy( midEnergy );
        if (midTester.isUpper( nodes )) {
          upperEnergy = midEnergy;
          upperTester = midTester;
        }
        else {
          lowerEnergy = midEnergy;
          lowerTester = midTester;
        }
      }
      if (i === MAX_TRIES) {
        console.log("No convergence in binary chop, nodes = "+nodes);
        return midEnergy;
      }
      
      // linearly interpolate for better convergence to exact energy
      for (i = 0; i < MAX_TRIES && (Math.abs(upperTester.derivative - lowerTester.derivative)) > SMALL; i++) {
        midEnergy = upperEnergy - (upperEnergy - lowerEnergy) * upperTester.derivative / (lowerTester.derivative - upperTester.derivative);
        if (midEnergy > upperEnergy || midEnergy < lowerEnergy) {
          midEnergy = 0.5 * (lowerEnergy + upperEnergy);
        }
        midTester = this.testEnergy( midEnergy );
        if ( midTester.isUpper( nodes ) ) {
          upperEnergy = midEnergy;
          upperTester = midTester;
        }
        else {
          lowerEnergy = midEnergy;
          lowerTester = midTester;
        }
      }
      if (i === MAX_TRIES) {
        console.log("No convergence in interpolation, nodes = "+nodes);
        return midEnergy;
      }
      
      return midEnergy;
    },
    
    /**
     * Calculate the wavefunction points for a given energy
     */
    calculateWavefunction: function( energy ) {
      var n = this.n;
      var wave = new FastArray(n);
      var hbInverse = 1 / this.hb;
      var matchPoint = n * 0.53;
      var dx = (this.maxX - this.minX) / (n - 1);
      var h12 = dx * dx / 12;
      
      // initial and final boundary conditions
      var u1 = 0.0;
      var u2 = 0.0;
      var u3 = dx;
      var u1Final = 0.0;
      var u2Final = dx;
      wave[0] = u2;
      wave[1] = u3;
      wave[n-1] = u1Final;
      wave[n-2] = u2Final;
      var v1 = 0.0;
      var v2 = 0.0;
      var v3 = hbInverse * (this.potentialPoints[1] - energy);
      
      for (var i = 2; i <= matchPoint + 1; i++) {
        u1 = u2;
        u2 = u3;
        v1 = v2;
        v2 = v3;
        v3 = hbInverse * (this.potentialPoints[i] - energy);
        u3 = (u2 * (2 + 10 * h12 * v2) - u1 * (1 - h12 * v1)) / (1 - h12 * v3);
        wave[i] = u3;
      }
      
      var uAve = u3;
      u2 = u1Final;
      u3 = u2Final;
      v2 = 0.0;
      v3 = hbInverse * (this.potentialPoints[n - 2] - energy);
      
      for (var j = n - 3; j >= matchPoint - 1; j--) {
        u1 = u2;
        u2 = u3;
        v1 = v2;
        v2 = v3;
        v3 = hbInverse * (this.potentialPoints[j] - energy);
        u3 = (u2 * (2 + 10 * h12 * v2) - u1 * (1 - h12 * v1)) / (1 - h12 * v3);
        wave[j] = u3;
      }
      
      uAve /= u3;
      var k;
      var uAbs;
      for (k = n - 2; k >= matchPoint; k--) {
        wave[k] *= uAve;
      }
      uAve = 0.0;
      for (k = 0; k < n; k++) {
        uAbs = Math.abs(wave[k]);
        uAve = (uAve > uAbs ) ? uAve : uAbs;
      }
      uAve = 1 / uAve;
      for (k = 0; k < n; k++) {
        wave[k] *= uAve;
      }
      return wave;
    }
  } );
} );