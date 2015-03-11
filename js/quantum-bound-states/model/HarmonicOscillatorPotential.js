// Copyright 2002-2013, University of Colorado Boulder
/**
* Square well potential
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var EigenstateSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/EigenstateSolver' );
  
  var constants = new QuantumBoundStatesConstants();
  
  /**
  * @param {double} wellOffset
  * @param {double} frequency
  * @constructor
  */
  function HarmonicOscillatorPotential( model, wellOffset, frequency ) {
    this.model = model;
    this.wellOffsetProperty = new Property( wellOffset );
    this.frequencyProperty = new Property( frequency );
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 0;
    this.eigenvals = []; // array of eigenstate energies
    this.redrawEigenstates = false;
    this.eigenstates = new Array(this.getNumberOfEigenstates()); // array of (x, y) points that describe the eigenstate functions
    
    this.solver = new EigenstateSolver( this.model );
    var thisNode = this;
    
    this.wellOffsetProperty.link( function() {
      thisNode.redrawEigenstates = true;
    });
    
    this.frequencyProperty.link( function() {
      thisNode.redrawEigenstates = true;
    });
  }
  
  return inherit( Object, HarmonicOscillatorPotential, {
    
    reset: function( ) {
      this.wellOffsetProperty.reset();
      this.frequencyProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x, in eV
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      x = x * 1E-9;
      w = this.frequencyProperty * 1E15;
      return (1 / 2 * this.model.particleMassProperty.value * Math.pow(w * x, 2)) / constants.eVToJ + this.wellOffsetProperty;
    },
    
    /**
     * Get the energy of the nth energy level, in eV
     */
    getNthEigenvalue: function( n ) {
      w = this.frequencyProperty * 1E15;
      return (constants.hbar * w * (n + 1 / 2)) / constants.eVToJ + this.wellOffsetProperty;
    },
    
    /**
     * Get all eigenstates visible
     * Returns an array of energy values
     */
    getEigenvalues: function() {
      if ( this.eigenvals.length === 0 || this.redrawEigenstates ) {
        if ( this.redrawEigenstates ) {
          this.eigenvals = [];
        }
        var n = this.groundState;
        var energy = 0;
        while ( energy <= this.maxEnergy ) {
          energy = this.getNthEigenvalue(n);
          this.eigenvals.push( energy );
          n++;
        }
      }
      this.redrawEigenstates = false;
      return this.eigenvals;
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
     * Get the array of (x, y) points representing the nth eigenstate equation
     */
  } );
} );