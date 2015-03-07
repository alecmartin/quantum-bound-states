// Copyright 2002-2013, University of Colorado Boulder
/**
* Square well potential
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var dot = require( 'DOT/dot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  
  // constants
  var FastArray = dot.FastArray;
  
  /**
  * @constructor
  */
  function SuperpositionCoefficients( model ) {
    this.coefficients = new FastArray( model.currentPotentialProperty.value.getNumberOfEigenstates() );
    for (var i = 0; i < this.coefficients.length; i++) {
      this.coefficients[i] = 0.0;
    }
    this.coefficients[0] = 1.0;
    this.normalized = new Property( true );
  }
  
  return inherit( Object, SuperpositionCoefficients, {
    
    /**
     * Returns the ith coefficient
     */
    getCoefficient: function( i ) {
      return this.coefficients[i];
    },
    
    /**
     * Sets the ith coefficient to value
     * Sets the normalized property to false
     */
    setCoefficient: function( i, value ) {
      this.coefficients[i] = value;
      this.normalized.value = false;
    },
    
    /**
     * Sets all coefficients to 0 except the ith coefficient
     * Sets the ith coefficient to 1
     * Sets the normalized property to true
     */
    setOneCoefficient: function( i ) {
      for (var j = 0; j < this.coefficients.length; j++ ) {
        this.coefficients[j] = 0;
      }
      this.coefficients[i] = 1.0;
      this.normalized.value = true;
    },
    
    /**
     * Normalizes coefficients so the sum of the squared values is 1
     */
    normalize: function( ) {
      var sum = 0;
      for (var i = 0; i < coefficients.length; i++) {
        sum += coefficients[i] * coefficients[i];
      }
      sum = Math.sqrt(sum);
      for (var j = 0; j < coefficients.length; j++) {
        coefficients[i] = coefficients[i] / sum;
      }
      this.normalized.value = true;
    },
    
    /**
     * Returns the number of nonzero coefficients
     */
    getNumNonZeroCoefficients: function( ) {
      var count = 0;
      for (var i = 0; i < this.coefficients.length; i++ ) {
        if ( this.coefficients[i] != 0 ) {
          count++;
        }
      }
      return count;
    },
    
    /**
     * Returns true if the number of nonzero coefficients is greater than 1
     */
    isSuperpositionState: function( ) {
      return (this.getNumNonZeroCoefficients() > 1);
    }
  } );
} );