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
    this.eigenstateCache = [];
    this.eigenvals = [];
    
    this.pointsX = new FastArray( this.numPoints );
    var x = this.model.minX;
    for (var i = 0; i < this.numPoints; i++) {
      this.pointsX[i] = x;
      x += (this.model.maxX - this.model.minX) / (this.numPoints - 1);
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
    
    this.model.particleMassProperty.link( thisNode.redrawEigenstates );
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
      var pointsY;
      if ( this.eigenstateCache[n] ) {
        pointsY = this.eigenstateCache[n];
      }
      else {
        var energy = this.getNthEigenvalue( n );
        var solver = new EigenstateSolver( this.model, this.numPoints, this );
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
      var solver = new EigenstateSolver( this.model, this.numPoints, this );
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