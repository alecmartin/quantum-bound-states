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
  var PotentialWell = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/PotentialWell' );
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
    PotentialWell.call( this, model );
    
    this.model = model;
    this.wellOffsetProperty = new Property( wellOffset );
    this.frequencyProperty = new Property( frequency );
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 0;
    this.eigenvals = []; // array of eigenstate energies
    this.redrawEigenstates = false;
    
    var thisNode = this;
    
    this.wellOffsetProperty.link( function() {
      thisNode.redrawEigenstates = true;
    });
    
    this.frequencyProperty.link( function() {
      thisNode.redrawEigenstates = true;
    });
  }
  
  return inherit( PotentialWell, HarmonicOscillatorPotential, {
    
    reset: function( ) {
      this.wellOffsetProperty.reset();
      this.frequencyProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x, in J
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      x *= 1E-9;
      var w = this.frequencyProperty.value * 1E15;
      return 1 / 2 * this.model.particleMassProperty.value * Math.pow(w * x, 2) + this.wellOffsetProperty * constants.eVToJ;
    },
    
    /**
     * Get the energy of the nth energy level, in J
     */
    getNthEigenvalue: function( n ) {
      var w = this.frequencyProperty.value * 1E15;
      return constants.hbar * w * (n + 1 / 2) + this.wellOffsetProperty * constants.eVToJ;
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
        while ( energy <= this.maxEnergy * constants.eVToJ ) {
          energy = this.getNthEigenvalue(n);
          this.eigenvals.push( energy );
          n++;
        }
      }
      this.redrawEigenstates = false;
      return this.eigenvals;
    },
  } );
} );