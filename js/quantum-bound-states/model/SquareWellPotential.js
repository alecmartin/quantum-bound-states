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
  var PotentialWell = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/PotentialWell' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  // constants
  var constants = new QuantumBoundStatesConstants();
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @param {double} wellOffset
  * @param {double} wellWidth
  * @param {double} wellHeight
  * @constructor
  */
  function SquareWellPotential( model, wellOffset, wellWidth, wellHeight ) {
    this.wellOffsetProperty = new Property( wellOffset );
    this.wellWidthProperty = new Property( wellWidth );
    this.wellHeightProperty = new Property( wellHeight );
    
    PotentialWell.call( this, model );
    
    this.minEnergy = -5; // eV
    this.maxEnergy = 15; // eV
    this.groundState = 1;
    
    var thisNode = this;
    this.wellOffsetProperty.link( thisNode.redrawEigenstates );
    
    this.wellWidthProperty.link( thisNode.redrawEigenstates );
    
    this.wellHeightProperty.link( thisNode.redrawEigenstates );
  }
  
  return inherit( PotentialWell, SquareWellPotential, {
    
    reset: function( ) {
      this.wellOffsetProperty.reset();
      this.wellWidthProperty.reset();
      this.wellHeightProperty.reset();
    },
    
    /**
    * Get the value of the potential well at a point x, in J
    * @param {double} x: distance from center of well in nanometers
    */
    potentialValue: function( x ) {
      if ( Math.abs(x) < this.wellWidthProperty.value / 2 ) {
        return this.wellOffsetProperty.value;
      }
      else {
        return this.wellOffsetProperty.value + this.wellHeightProperty.value;
      }
    },
    
    /**
     * Get all eigenstates visible
     * Returns an array of energy values
     */
    getEigenvalues: function() {
      var n = this.groundState;
      var energy = this.getNthEigenvalue( n );
      while ( energy < this.wellHeightProperty.value + this.wellOffsetProperty.value ) {
        this.eigenvals[n] = energy;
        n++;
        energy = this.getNthEigenvalue( n );
      }
      return this.eigenvals;
    },
  } );
} );