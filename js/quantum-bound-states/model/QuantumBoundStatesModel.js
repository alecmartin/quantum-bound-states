// Copyright 2002-2015, University of Colorado Boulder

/**
 *
 * @author Will Farmer, Alec Martin, Emily Randall, Cris Salazar, Samuel Volin
 */
define( function( require ) {
  'use strict';

  // modules
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var Coulomb1DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DPotential' );
  var Coulomb3DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DPotential' );
  var FastArray = require( 'DOT/dot' ).FastArray;
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Particle = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Particle' );
  var PropertySet = require( 'AXON/PropertySet' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  var SuperpositionCoefficients = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SuperpositionCoefficients' );

  /**
   * Main constructor for QuantumBoundStatesModel, which contains all of the model logic for the entire sim screen.
   * @constructor
   */
  function QuantumBoundStatesModel() {

    this.particle = new Particle();
    var squareWell = new SquareWellPotential( this.particle, 0.0, 1.0, 10.0 );
    var asymWell = new AsymmetricPotential( this.particle, 0.0, 1.0, 10.0 );
    var coulomb1D = new Coulomb1DPotential( this.particle, 0.0 );
    var coulomb3D = new Coulomb3DPotential( this.particle, 0.0 );
    var oscillatorWell = new HarmonicOscillatorPotential( this.particle, 0.0, 1.0 );
    this.potentials = [ squareWell, asymWell, coulomb1D, coulomb3D, oscillatorWell ];
    
    PropertySet.call( this, {
      hoveredEigenstate: -1,
      currentPotential: squareWell,
      probabilityDensity: [],
      realWave: [],
      imaginaryWave: [],
      magnitude: [],
      phase: [],
      hoveredProbabilityDensity: [],
      hoveredRealWave: [],
      
      running: false,
      time: 0.0,
      speed: 'normal',
      
      showMagnifyingGlass: false,
      showProbDensity: true,
      showReal: true,
      showImaginary: false,
      showMagnitude: false,
      showPhase: false,
      showConfigurePotentialPanel: false,
      showSuperpositionStatePanel: false
      } );
    
    this.superpositionCoefficients = new SuperpositionCoefficients( this.currentPotentialProperty );
    
    var thisNode = this;
    var setWaves = function() {
      if ( thisNode.showProbDensityProperty.value ) {
        thisNode.probabilityDensityProperty.set( thisNode.getProbabilityDensity() );
      }
      if ( thisNode.showRealProperty.value ) {
        thisNode.realWaveProperty.set( thisNode.getRealWave( thisNode.time ) );
      }
      if ( thisNode.showImaginaryProperty.value ) {
        thisNode.imaginaryWaveProperty.set( thisNode.getImaginaryWave( thisNode.time ) );
      }
      if ( thisNode.showMagnitudeProperty.value ) {
        thisNode.magnitudeProperty.set( thisNode.getMagnitude() );
      }
    };
    
    setWaves();
    
    for ( var i = 0; i < this.potentials.length; i++ ) {
      this.potentials[ i ].eigenvalsProperty.lazyLink( setWaves );
    }
    
    this.showProbDensityProperty.link( setWaves );
    this.showRealProperty.link( setWaves );
    this.showImaginaryProperty.link( setWaves );
    this.showMagnitudeProperty.link( setWaves );
    this.superpositionCoefficients.coefficientsProperty.link( setWaves );
    this.currentPotentialProperty.link( setWaves );
    
    this.hoveredEigenstateProperty.lazyLink( function() {
      if ( thisNode.hoveredEigenstateProperty.value !== -1 ) {
        var potential = thisNode.currentPotentialProperty.value;
        var eigenstate = potential.getNthEigenstate( thisNode.hoveredEigenstateProperty.value );
        thisNode.hoveredRealWaveProperty.set( eigenstate );
        var probability = [ eigenstate[ 0 ], new FastArray( eigenstate[ 1 ].length ) ];
        for ( var i = 0; i < eigenstate[ 1 ].length; i++ ) {
          probability[ 1 ][ i ] = eigenstate[ 1 ][ i ] * eigenstate[ 1 ][ i ];
        }
        thisNode.hoveredProbabilityDensityProperty.set( probability );
      }
    } );
  }

  return inherit( PropertySet, QuantumBoundStatesModel, {
    
    reset: function( ) {
      PropertySet.prototype.reset.call( this );
      this.potentials.forEach( function( potential ) { potential.reset(); } );
      this.superpositionCoefficients.reset();
      this.particle.reset();
    },

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function( dt ) {
      if ( this.running ) {
        if ( this.speed === 'normal' ) {
          this.time = this.time + dt / 2;
        }
        else {
          this.time = this.time + dt;
        }
        if ( this.showReal ) {
          this.realWaveProperty.set( this.getRealWave( this.time ) );
        }
        if ( this.showImaginary ) {
          this.imaginaryWaveProperty.set( this.getImaginaryWave( this.time ) );
        }
        if ( this.showMagnitude ) {
          this.magnitudeProperty.set( this.getMagnitude() );
        }
      }
    },
    
    /**
     * Return the minimum energy to be displayed on the potential graph
     */
    getMinEnergy: function( ) {
      return this.currentPotentialProperty.value.minEnergy;
    },
    
    /**
     * Return the maximum energy to be displayed on the potential graph
     */
    getMaxEnergy: function( ) {
      return this.currentPotentialProperty.value.maxEnergy;
    },
    
    /**
     * Called when the user mouses over an eigenstate line
     * Should be set to -1 when no state is hovered
     */
    setHoveredEigenstate: function( n ) {
      this.hoveredEigenstateProperty.value = n;
    },
    
    /**
     * Return the number of possible eigenstates, given the current parameters
     */
    getNumberOfEigenstates: function( ) {
      return this.currentPotentialProperty.value.getNumberOfEigenstates();
    },
    
    /**
     * Get a list of the energies of the eigenstates for the current potential
     */
    getEigenvalues: function( ) {
      return this.currentPotentialProperty.value.getEigenvalues();
    },
    
    /**
     * Get an array of the current eigenstates in the superposition state
     */
    getCurrentEigenstates: function( ) {
      var allCoefficients = this.getCoefficientsProperty().value;
      var states = [];
      for (var i = 0; i < allCoefficients.length; i++ ) {
        if ( allCoefficients[ i ] !== 0 ) {
          states.push( i );
        }
      }
      return states;
    },
    
    /**
     * Get two arrays containing the subscripts for the current superposition state
     *  and the coefficients of each eigenstate
     * Subscripts contains the integers that describe each eigenstate
     * Coefficients contains floats between 0 and 1
     */
    getSubscriptsAndCoefficients: function( ) {
      var superposition = this.superpositionCoefficients;
      var allCoefficients = superposition.coefficientsProperty.value;
      var coefficients = [];
      var subscripts = [];
      for (var i = 0; i < allCoefficients.length; i++ ) {
        if ( allCoefficients[ i ] !== 0 ) {
          coefficients.push( allCoefficients[ i ] );
          subscripts.push( i + this.currentPotentialProperty.value.groundState );
        }
      }
      return [subscripts, coefficients];
    },
    
    /**
     * Return the property that governs the mass of the particle
     */
    getParticleMassProperty: function( ) {
      return this.particle.particleMassProperty;
    },
    
    /**
     * Returns the property that determines if the superposition coefficients are normalized
     */
    getNormalizedProperty: function( ) {
      return this.superpositionCoefficients.normalizedProperty;
    },
    
    /**
     * Returns the property that contains an array of coefficients
     */
    getCoefficientsProperty: function( ) {
      return this.superpositionCoefficients.coefficientsProperty;
    },
    
    /**
     * Set a single coefficient of a superposition state
     * Called when the user inputs a number into the superposition dialogue box
     */
    setCoefficient: function( i, value ) {
      i = i - this.currentPotentialProperty.value.groundState;
      this.superpositionCoefficients.setCoefficient( i, value );
    },
    
    /**
     * Set the selected eigenstate's coefficient to one
     * Set all the rest of the coefficients to zero
     * Called when the user clicks on an eigenstate
     */
    setOneCoefficient: function( i ) {
      i = i - this.currentPotentialProperty.value.groundState;
      this.superpositionCoefficients.setOneCoefficient( i );
    },
    
    /**
     * Normalize the superposition coefficients
     */
    normalize: function( ) {
      this.superpositionCoefficients.normalize();
    },
    
    /**
     * Returns true if more than one eigenstate is selected
     */
    isSuperpositionState: function( ) {
      return this.superpositionCoefficients.isSuperpositionState();
    },
    
    /**
     * Returns an array of x values and the corresponding y values of the superposition wavefunction at time t
     * t: time in fs (0 for the magnitude and the probability density)
     * isReal: real or imaginary part of the wavefunction (true for the magnitude and the probability density)
     */
    getWavefunctionPoints: function( t, isReal ) {
      var potential = this.currentPotentialProperty.value;
      var superposition = this.getSubscriptsAndCoefficients();
      var nodeArray = superposition[0];
      var coefficients = superposition[1];
      var eigenstate = potential.getNthEigenstate( nodeArray[0] );
      var energy = potential.getNthEigenvalue( nodeArray[0] );
      var psi = [ eigenstate[0], new FastArray( eigenstate[1].length ) ];
      
      // multiply by the propagator
      for (var l = 0; l < psi[1].length; l++) {
        if (isReal) {
          psi[1][l] = eigenstate[1][l] * Math.cos(-energy * t / QuantumBoundStatesConstants.HBAR);
        }
        else {
          psi[1][l] = eigenstate[1][l] * Math.sin(-energy * t / QuantumBoundStatesConstants.HBAR);
        }
      }
      
      // If there's only one selected eigenstate, return the wavefunction
      if (coefficients.length === 1) {
        return psi;
      }
      // Else, add up the superposition states
      for (var k = 0; k < psi[1].length; k++) {
        psi[1][k] *= coefficients[0];
      }
      var psiNew;
      for (var i = 1; i < coefficients.length; i++) {
        psiNew = potential.getNthEigenstate( nodeArray[0] - this.currentPotentialProperty.value.groundState )[1];
        energy = potential.getNthEigenvalue( nodeArray[0] - this.currentPotentialProperty.value.groundState );
        for (var j = 0; j < psi.length; j++) {
          if (isReal) {
            psi[1][j] += psiNew[j] * coefficients[j] * Math.cos(-energy * t / QuantumBoundStatesConstants.HBAR);
          }
          else {
            psi[1][j] += psiNew[j] * coefficients[j] * Math.sin(-energy * t / QuantumBoundStatesConstants.HBAR);
          }
        }
      }
      return psi;
    },
    
    /**
     * Get the probability density function
     */
    getProbabilityDensity: function( ) {
      var psi = this.getWavefunctionPoints( 0, true );
      for (var i = 0; i < psi[1].length; i++) {
        psi[1][i] = psi[1][i] * psi[1][i];
      }
      return psi;
    },
    
    /**
     * Get the real wave function at time t
     */
    getRealWave: function( t ) {
      return this.getWavefunctionPoints( t, true );
    },
    
    /**
     * Get the imaginary wave function at time t
     */
    getImaginaryWave: function( t ) {
      return this.getWavefunctionPoints( t, false );
    },
    
    /**
     * Get the magnitude of the wave function
     */
    getMagnitude: function( ) {
      var psi = this.getWavefunctionPoints( 0, true );
      for (var i = 0; i < psi[1].length; i++) {
        psi[1][i] = Math.abs(psi[1][i]);
      }
      return psi;
    }
  } );
} );