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
  
  /**
  * @constructor
  */
  function QuantumBoundStatesConstants( ) {
    this.electronCharge = 1.60217E-19; // C
    this.electronMass = 9.10938E-31; //kg
    this.epsilon = 8.85419E-12; // F/m
    this.hbar = 1.05457E-34; // m^2 kg/s
  }
  
  return inherit( Object, QuantumBoundStatesConstants);
} );