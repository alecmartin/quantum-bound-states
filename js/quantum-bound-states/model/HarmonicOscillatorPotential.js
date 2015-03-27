// Copyright 2002-2013, University of Colorado Boulder
/**
* Harmonic Oscillator potential
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
  
  var constants = new QuantumBoundStatesConstants();
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @param {double} wellOffset
  * @param {double} frequency
  * @constructor
  */
  function HarmonicOscillatorPotential( model, wellOffset, frequency ) {
    this.wellOffsetProperty = new Property( wellOffset );
    this.frequencyProperty = new Property( frequency );
    
    PotentialWell.call( this, model );
    
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 0;
    
    var thisNode = this;
    this.wellOffsetProperty.link( thisNode.redrawEigenstates );
    
    this.frequencyProperty.link( thisNode.redrawEigenstates );
  }
  
  return inherit( PotentialWell, HarmonicOscillatorPotential, {
    
    reset: function( ) {
      this.wellOffsetProperty.reset();
      this.frequencyProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x, in eV
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      var w = this.frequencyProperty.value;
      return 1 / 2 * this.model.particleMassProperty.value * Math.pow(w * x, 2) + this.wellOffsetProperty.value;
    },
    
    /**
     * Get the energy of the nth energy level, in eV
     */
    getNthEigenvalue: function( n ) {
      var w = this.frequencyProperty.value;
      return constants.hbar * w * (n + 1 / 2) + this.wellOffsetProperty.value;
    },
    
    /**
     * Get all eigenstates visible
     * Returns an array of energy values
     */
    getEigenvalues: function() {
      var n = 0;
      var energy = this.getNthEigenvalue( n );
      while ( energy < this.maxEnergy ) {
        this.eigenvals[n] = energy;
        n++;
        energy = this.getNthEigenvalue( n );
      }
      return this.eigenvals;
    },
  } );
} );