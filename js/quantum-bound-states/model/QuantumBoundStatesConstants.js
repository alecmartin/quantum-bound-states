// Copyright 2002-2015, University of Colorado Boulder
/**
* Useful constants
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  var Range = require( 'DOT/Range' );
  
  return {
    ELECTRON_MASS: 5.68,
    HBAR: 0.658,
    KE2: 1.44, // electronCharge * electronCharge / (4 * PI * epsilon_not)
    
    WELL_HEIGHT_RANGE: new Range( 0.0, 20.0 ), // eV
    WELL_WIDTH_RANGE: new Range( 0.1, 6.0 ), // nm
    FREQUENCY_RANGE: new Range( 1.0, 10.0 ), // fs^-1
    PARTICLE_MASS_RANGE: new Range( 0.5, 1.1 ), // multiply by ELECTRON_MASS
    
    PROPERTY_INDICATOR_LENGTH: 40
  };
} );