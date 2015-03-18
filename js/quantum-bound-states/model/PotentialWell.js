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
  var EigenstateSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/EigenstateSolver' );
  
  // constants
  var FastArray = dot.FastArray;
  
  /**
  * @constructor
  */
  function PotentialWell( model ) {
    this.model = model;
  }
  
  return inherit( Object, PotentialWell, {
    
    /**
     * Get a set of n points (x, y) to draw the potential well
     */
    getPotentialPoints: function( n ) {
      var pointsX = new FastArray( n );
      var pointsY = new FastArray( n );
      var delta = (this.maxX - this.minX) / n;
      var x = this.minX;
      for (var i = 0; i < n; i++ ) {
        pointsX[i] = x;
        pointsY[i] = this.potentialValue(x);
        x += delta;
      }
      return [pointsX, pointsY];
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
    
    /**
     * Get an array of wavefunction points for the nth energy level
     * Wavefunction will have n nodes
     */
    getNthEigenstate: function( n ) {
      var energy = this.getNthEigenvalue( n );
      var solver = new EigenstateSolver( this.model, n, this );
      return solver.calculateWavefunction( energy );
    }
  } );
} );