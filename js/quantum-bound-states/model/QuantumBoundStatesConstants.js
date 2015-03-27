// Copyright 2015, University of Colorado Boulder
/**
* Useful constants
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
    this.electronMass = 5.68;
    this.hbar = 0.658;
    this.ke2 = 1.44; // electronCharge * electronCharge / (4 * PI * epsilon_not)
  }
  
  return inherit( Object, QuantumBoundStatesConstants);
} );