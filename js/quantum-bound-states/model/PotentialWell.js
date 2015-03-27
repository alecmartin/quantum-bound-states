// Copyright 2015, University of Colorado Boulder
/**
* Parent class for all potential wells
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var dot = require( 'DOT/dot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EigenstateSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/EigenstateSolver' );
  var Property = require( 'AXON/Property' );
  
  // constants
  var FastArray = dot.FastArray;
  var NUM_POINTS = 1350;
  
  /**
  * @param {float} minX
  * @param {float} maxX
  * @param {Particle} particle
  * @constructor
  */
  function PotentialWell( minX, maxX, particle, wellOffset ) {
    this.maxX = maxX;
    this.minX = minX;
    this.particle = particle;
    this.numPoints = NUM_POINTS;
    this.eigenstateCache = [];
    this.eigenvals = [];
    
    this.wellOffsetProperty = new Property( wellOffset );
    
    this.pointsX = new FastArray( NUM_POINTS );
    var x = this.minX;
    for (var i = 0; i < NUM_POINTS; i++) {
      this.pointsX[i] = x;
      x += (this.maxX - this.minX) / (NUM_POINTS - 1);
    }
    
    var thisNode = this;
    
    /**
     * Recalculate eigenstates when variables change
     */
    this.redrawEigenstates = function() {
      if (thisNode.groundState) {
        thisNode.getEigenvalues();
        thisNode.eigenstateCache = [];
      }
    };
    
    this.particle.particleMassProperty.link( thisNode.redrawEigenstates );
    
    this.wellOffsetProperty.link( thisNode.redrawEigenstates );
  }
  
  return inherit( Object, PotentialWell, {
    reset: function( ) {
      this.wellOffsetProperty.reset();
    },
    
    /**
     * Get a set of n points (x, y) to draw the potential well
     */
    getPotentialPoints: function( numPoints ) {
      var pointsX = new FastArray( numPoints );
      var pointsY = new FastArray( numPoints );
      var delta = (this.maxX - this.minX) / numPoints;
      var x = this.minX;
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
      var pointsY;
      if ( this.eigenstateCache[n] ) {
        pointsY = this.eigenstateCache[n];
      }
      else {
        var energy = this.getNthEigenvalue( n );
        var solver = new EigenstateSolver( this.minX, this.maxX, this.particle, NUM_POINTS, this );
        pointsY = solver.calculateWavefunction( energy );
        this.cacheEigenstate( n, pointsY );
      }
      return [this.pointsX, pointsY];
    },
    
    /**
     * Get the energy of the nth energy level for wells without an analytic solution
     * Solution will have n-this.groundState nodes
     */
    getNthEigenvalue: function( n ) {
      var solver = new EigenstateSolver( this.minX, this.maxX, this.particle, NUM_POINTS, this );
      return solver.calculateEnergy( n - this.groundState );
    },
    
    /**
     * Save the eigenstate in a cache
     */
    cacheEigenstate: function( n, eigenstate ) {
      this.eigenstateCache[n] = eigenstate;
    },
  } );
} );