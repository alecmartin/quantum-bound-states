//  Copyright 2002-2014, University of Colorado Boulder

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
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  var SuperpositionCoefficients = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SuperpositionCoefficients' );
  var Vector2 = require( 'DOT/Vector2' );
  
  var constants = new QuantumBoundStatesConstants();

  /**
   * Main constructor for QuantumBoundStatesModel, which contains all of the model logic for the entire sim screen.
   * @constructor
   */
  function QuantumBoundStatesModel() {
    this.minX = -3.5; // nm
    this.maxX = 3.5; // nm

    PropertySet.call( this, {
      particleMass: 1*constants.electronMass,
      currentEigenstate: 0,
      hoveredEigenstate: -1,
      currentEnergy: 0,
      currentPotential: null,
      potentialType: 0,
      eigenvals: null,
      superpositionCoefficients: null,
      
      showMagnifyingGlass: false,
      showProbDensity: true,
      showReal: true,
      showImaginary: false,
      showMagnitude: false,
      showPhase: false,
      } );
    
    var squareWell = new SquareWellPotential( 0.0, 1.0, 10.0 );
    var asymWell = new AsymmetricPotential( 0.0, 1.0, 10.0 );
    var coulomb1D = new Coulomb1DPotential( 0.0 );
    var coulomb3D = new Coulomb3DPotential( 0.0 );
    var oscillatorWell = new HarmonicOscillatorPotential( this, 0.0, 1.0 );
    this.potentials = [squareWell, asymWell, coulomb1D, coulomb3D, oscillatorWell];
    
    this.currentPotentialProperty.value = squareWell;
    this.eigenvalsProperty.value = squareWell.getEigenvalues();
    
    var coefficients = new SuperpositionCoefficients( this );
    this.superpositionCoefficientsProperty.value = coefficients;
  }

  return inherit( PropertySet, QuantumBoundStatesModel, {

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function( dt ) {
      // Handle model animation here.
    },
    
    /**
     * Change the current potential being displayed
     */
    setPotential: function( type ) {
      var potential = this.potentials[type];
      this.currentEigenstateProperty.value +=  potential.groundState - this.currentPotentialProperty.value.groundState;
      this.currentPotentialProperty.value = potential;
      this.eigenvalsProperty.value = potential.getEigenvalues();
      this.currentEnergyProperty.value = potential.getNthEigenvalue( this.currentEigenstateProperty.value );
      this.potentialTypeProperty.value = type;
    },
    
    /**
     * Get a set of n points (x, y) to draw the potential well
     */
    getPotentialPoints: function( n ) {
      var points = [];
      var delta = (this.maxX - this.minX) / n;
      var x = this.minX;
      var potential = this.currentPotentialProperty.value;
      for (var i = 0; i < n; i++ ) {
        points.push( new Vector2( x, potential.potentialValue(x) ) );
        x += delta;
      }
      return points;
    },
    
    getMinEnergy: function( ) {
      return this.currentPotentialProperty.value.minEnergy;
    },
    
    getMaxEnergy: function( ) {
      return this.currentPotentialProperty.value.maxEnergy;
    },
    
    setHoveredEigenstate: function( n ) {
      this.hoveredEigenstateProperty.value = n;
    },
    
    setCurrentEigenstate: function( n ) {
      this.currentEigenstateProperty.value = n;
    },
    
    getNumberOfEigenstates: function( ) {
      return this.currentPotentialProperty.value.getNumberOfEigenstates();
    },
    
    getEigenvalues: function( ) {
      return this.currentPotentialProperty.value.getEigenvalues();
    },
    
    getSubscriptsAndCoefficients: function( ) {
      var coeff = this.superpositionCoefficientsProperty.value;
      var nonzero = []
      var subscripts = []
      for (var i = 0; i < coeff.coefficients.length; i++ ) {
        if ( coeff.coefficients[i] != 0 ) {
          nonzero.push(coeff.coefficients[i]);
          subscripts.push(i + this.currentPotentialProperty.value.groundState);
        }
      }
      return [subscripts,nonzero];
    },
    
    isSuperpositionState: function( ) {
      return this.superpositionCoefficientsProperty.value.isSuperpositionState();
    }
  } );
} );