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
  var dot = require( 'DOT/dot' );
  var EigenstateSolver = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/EigenstateSolver' );
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  var SuperpositionCoefficients = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SuperpositionCoefficients' );
  var Vector2 = require( 'DOT/Vector2' );
  
  var constants = new QuantumBoundStatesConstants();
  var FastArray = dot.FastArray;

  /**
   * Main constructor for QuantumBoundStatesModel, which contains all of the model logic for the entire sim screen.
   * @constructor
   */
  function QuantumBoundStatesModel() {
    this.minX = -3.5; // nm
    this.maxX = 3.5; // nm

    PropertySet.call( this, {
      particleMass: constants.electronMass,
      hoveredEigenstate: -1,
      potentialType: 0,
      
      showMagnifyingGlass: false,
      showProbDensity: true,
      showReal: true,
      showImaginary: false,
      showMagnitude: false,
      showPhase: false,
      } );
    
    var squareWell = new SquareWellPotential( this, 0.0, 1.0, 10.0 );
    var asymWell = new AsymmetricPotential( this, 0.0, 1.0, 10.0 );
    var coulomb1D = new Coulomb1DPotential( this, 0.0 );
    var coulomb3D = new Coulomb3DPotential( this, 0.0 );
    var oscillatorWell = new HarmonicOscillatorPotential( this, 0.0, 1.0 );
    this.potentials = [squareWell, asymWell, coulomb1D, coulomb3D, oscillatorWell];
    
    this.addProperty("currentPotential", squareWell);
    this.addProperty("eigenvals", squareWell.getEigenvalues());
    
    var coefficients = new SuperpositionCoefficients( this );
    this.addProperty("superpositionCoefficients", coefficients);
    
    var thisNode = this;
    this.potentialTypeProperty.link( function() {
      thisNode.setPotential(thisNode.potentialTypeProperty.value);
    });
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
      this.currentPotentialProperty.value = potential;
      this.eigenvalsProperty.value = potential.getEigenvalues();
      this.potentialTypeProperty.value = type;
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
    
    getNumberOfEigenstates: function( ) {
      return this.currentPotentialProperty.value.getNumberOfEigenstates();
    },
    
    getEigenvalues: function( ) {
      return this.currentPotentialProperty.value.getEigenvalues();
    },
    
    getSubscriptsAndCoefficients: function( ) {
      var coeff = this.superpositionCoefficientsProperty.value;
      var nonzero = [];
      var subscripts = [];
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
    },
    
    getWavefunctionPoints: function( n ) {
      var potential = this.currentPotentialProperty.value;
      var solver = new EigenstateSolver( this, n, potential );
      var superposition = this.getSubscriptsAndCoefficients();
      var nodeArray = superposition[0];
      var coefficients = superposition[1];
      var psi = potential.getNthEigenstate( nodeArray[0] - this.currentPotentialProperty.value.groundState );
      if (coefficients.length === 1) {
        return psi;
      }
      for (var k = 0; k < psi.length; k++) {
        psi[k] *= coefficients[0];
      }
      var psiNew;
      for (var i = 1; i < coefficients.length; i++) {
        psiNew = potential.getNthEigenstate( nodeArray[0] - this.currentPotentialProperty.value.groundState );
        for (var j = 0; j < psi.length; j++) {
          psi[j] += psiNew[j] * coefficients[j];
        }
      }
      return psi;
    }
  } );
} );