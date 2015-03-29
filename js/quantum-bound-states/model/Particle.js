// Copyright 2002-2015, University of Colorado Boulder
/**
* Constructor for the particle
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  
  /**
  * @constructor
  */
  function Particle( ) {
    this.particleMassProperty = new Property( QuantumBoundStatesConstants.ELECTRON_MASS );
  }
  
  return inherit( Object, Particle );
} );