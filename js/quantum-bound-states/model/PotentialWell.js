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
    this.numPoints = 1350;
  }
  
  return inherit( Object, PotentialWell, {
    
    /**
     * Get a set of n points (x, y) to draw the potential well
     */
    getPotentialPoints: function( numPoints ) {
      var pointsX = new FastArray( numPoints );
      var pointsY = new FastArray( numPoints );
      var delta = (this.model.maxX - this.model.minX) / numPoints;
      var x = this.model.minX;
      for (var i = 0; i < numPoints; i++ ) {
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
      console.log( "n is "+n+", energy is "+energy );
      var solver = new EigenstateSolver( this.model, this.numPoints, this );
      var pointsY = solver.calculateWavefunction( energy );
      var pointsX = [];
      var x = this.model.minX;
      for (var i = 0; i < this.numPoints; i++) {
        pointsX.push[x];
        x += (this.model.maxX - this.model.minX) / this.numPoints - 1;
      }
      return [pointsX, pointsY];
    },
    
    /**
     * Get the energy of the nth energy level for wells without an analytic solution
     */
    getNthEigenvalue: function( n ) {
      console.log("calculating eigenval for n="+n);
      var solver = new EigenstateSolver( this.model, this.numPoints, this );
      return solver.calculateEnergy( n );
    },
  } );
} );