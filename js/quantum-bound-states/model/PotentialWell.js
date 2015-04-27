// Copyright 2002-2015, University of Colorado Boulder
/**
* Parent class for all potential wells
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var FastArray = require( 'DOT/dot' ).FastArray;
  var inherit = require( 'PHET_CORE/inherit' );
  var EigenstateSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/EigenstateSolver' );
  var Property = require( 'AXON/Property' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  // constants
  var NUM_POINTS = 1350;
  var MIN_X = QuantumBoundStatesConstants.XRANGE.min;
  var MAX_X = QuantumBoundStatesConstants.XRANGE.max;
  
  /**
  * @param {Particle} particle
  * @param {number} wellOffset
  * @param {number} minEnergy
  * @param {number} maxEnergy
  * @param {number} groundState
  * @param {string} name
  * @param {Image} image
  * @constructor
  */
  function PotentialWell( particle, wellOffset, minEnergy, maxEnergy, groundState, name, image ) {
    this.numPoints = NUM_POINTS;
    this.eigenstateCache = [];
    var eigenvals = [];
    this.eigenvalsProperty = new Property( eigenvals );
    
    this.particle = particle;
    this.wellOffsetProperty = new Property( wellOffset, { propertyID: "wellOffset" } );
    this.minEnergy = minEnergy; // eV
    this.maxEnergy = maxEnergy; // eV
    this.groundState = groundState;
    this.name = name;
    this.image = image;
    
    this.pointsX = new FastArray( NUM_POINTS );
    var x = MIN_X;
    for (var i = 0; i < NUM_POINTS; i++) {
      this.pointsX[i] = x;
      x += (MAX_X - MIN_X) / (NUM_POINTS - 1);
    }
    
    this.particle.particleMassProperty.link( this.redrawEigenstates.bind( this ) );
    this.wellOffsetProperty.link( this.redrawEigenstates.bind( this ) );

  }
  
  return inherit( Object, PotentialWell, {
    reset: function( ) {
      this.wellOffsetProperty.reset();
    },

    /**
     * Recalculate eigenstates when variables change
     */
    redrawEigenstates: function() {
      this.getEigenvalues();
      this.eigenstateCache = [];
    },

    /**
     * Get a set of n points (x, y) to draw the potential well
     */
    getPotentialPoints: function( numPoints ) {
      var pointsX = new FastArray( numPoints );
      var pointsY = new FastArray( numPoints );
      var delta = (MAX_X - MIN_X) / numPoints;
      var x = MIN_X;
      for (var i = 0; i <= numPoints; i++ ) {
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
      if ( this.eigenvalsProperty.value.length === 0 ) {
        this.getEigenvalues();
      }
      return this.eigenvalsProperty.value.length;
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
        var solver = new EigenstateSolver( this.particle, NUM_POINTS, this );
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
      var solver = new EigenstateSolver( this.particle, NUM_POINTS, this );
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