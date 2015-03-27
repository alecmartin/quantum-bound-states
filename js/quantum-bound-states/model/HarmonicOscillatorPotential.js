// Copyright 2002-2015, University of Colorado Boulder
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
  
  /**
  * @param {float} minX
  * @param {float} maxX
  * @param {Particle} particle
  * @param {double} wellOffset
  * @param {double} frequency
  * @constructor
  */
  function HarmonicOscillatorPotential( minX, maxX, particle, wellOffset, frequency ) {
    // strings
    var harmonicString = require( 'string!QUANTUM_BOUND_STATES/harmonic-oscillator' );
    // images
    var harmonicImage = require( 'image!QUANTUM_BOUND_STATES/HarmonicIcon.png' );
    
    this.frequencyProperty = new Property( frequency );
    this.name = harmonicString;
    this.image = harmonicImage;
    
    PotentialWell.call( this, minX, maxX, particle, wellOffset );
    
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 0;
    
    var thisNode = this;    
    this.frequencyProperty.link( thisNode.redrawEigenstates );
  }
  
  return inherit( PotentialWell, HarmonicOscillatorPotential, {
    
    reset: function( ) {
      this.frequencyProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x, in eV
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      var w = this.frequencyProperty.value;
      return 1 / 2 * this.particle.particleMassProperty.value * Math.pow(w * x, 2) + this.wellOffsetProperty.value;
    },
    
    /**
     * Get the energy of the nth energy level, in eV
     */
    getNthEigenvalue: function( n ) {
      var w = this.frequencyProperty.value;
      return QuantumBoundStatesConstants.HBAR * w * (n + 1 / 2) + this.wellOffsetProperty.value;
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