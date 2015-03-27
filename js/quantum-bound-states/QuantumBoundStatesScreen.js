// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author Will Farmer, Alec Martin, Emily Randall, Cris Salazar, Samuel Volin
 */
define( function( require ) {
  'use strict';

  // modules
  var QuantumBoundStatesModel = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesModel' );
  var QuantumBoundStatesScreenView = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/QuantumBoundStatesScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var quantumBoundStatesSimString = require( 'string!QUANTUM_BOUND_STATES/quantum-bound-states.name' );

  /**
   * @constructor
   */
  function QuantumBoundStatesScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, quantumBoundStatesSimString, icon,
      function() { return new QuantumBoundStatesModel(); },
      function( model ) { return new QuantumBoundStatesScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, QuantumBoundStatesScreen );
} );