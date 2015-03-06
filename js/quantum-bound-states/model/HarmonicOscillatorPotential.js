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
    this.wellOffset = new Property( wellOffset );
    this.frequency = new Property( frequency );
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 0;
    this.eigenvals = []; // array of eigenstate energies
    this.redrawEigenstates = false;
    this.eigenstates = new Array(this.getNumberOfEigenstates()); // array of (x, y) points that describe the eigenstate functions
    
    this.solver = new EigenstateSolver( this.model );
    
    this.wellOffset.link( function() {
      this.redrawEigenstates = true;
    });
    
    this.frequency.link( function() {
      this.redrawEigenstates = true;
    });
  }
  
  return inherit( Object, HarmonicOscillatorPotential, {
    
    /**
    * Get the value of the potential well at a point x
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      return 1 / 2 * this.model.particleMassProperty.value * Math.pow(this.frequency * x, 2) + this.wellOffset;
    },
    
    /**
     * Get the energy of the nth energy level
     */
    getNthEigenvalue: function( n ) {
      return constants.hbar * this.frequency * (n + 1 / 2) + this.wellOffset;
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