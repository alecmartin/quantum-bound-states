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

  /**
   * Main constructor for QuantumBoundStatesModel, which contains all of the model logic for the entire sim screen.
   * @constructor
   */
  function QuantumBoundStatesModel() {
    var constants = new QuantumBoundStatesConstants();
    this.minX = -3.5; // nm
    this.maxX = 3.5; // nm
    var firstPotential = new SquareWellPotential( 0.0, 1.0, 10.0 );
    var firstCoefficients = new SuperpositionCoefficients( this, firstPotential );

    PropertySet.call( this, {
      particleMass: 1*constants.electronMass,
      currentEigenstate: 1,
      hoveredEigenstate: -1,
      currentEnergy: 0,
      currentPotential: firstPotential,
      potentialType: 0,
      eigenvals: firstPotential.getEigenvalues(),
      superpositionCoefficients: firstCoefficients,
      
      showMagnifyingGlass: false,
      showProbDensity: true,
      showReal: true,
      showImaginary: false,
      showMagnitude: false,
      showPhase: false,
      } );
  }

  return inherit( PropertySet, QuantumBoundStatesModel, {

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function( dt ) {
      // Handle model animation here.
    },
    
    /**
     * Change the current potential being displayed
     */
    setPotential: function( potential ) {
      this.currentEigenstateProperty.value +=  potential.groundState - this.currentPotentialProperty.value.groundState;
      this.currentPotentialProperty.value = potential;
      this.eigenvalsProperty.value = potential.getEigenvalues();
      this.currentEnergyProperty.value = potential.getNthEigenvalue( this.currentEigenstateProperty.value );
      
      switch (typeof potential) {
        case "SquareWellPotential":
          this.potentialTypeProperty.value = 0;
          break;
        case "AsymmetricPotential":
          this.potentialTypeProperty.value = 1;
          break;
        case "Coulomb1DPotential":
          this.potentialTypeProperty.value = 2;
          break;
        case "Coulomb3DPotential":
          this.potentialTypeProperty.value = 3;
          break;
        case "HarmonicOscillatorPotential":
          this.potentialTypeProperty.value = 4;
          break;
        default:
          console.log("This is bad");
          break;
      }
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
    }
  } );
} );