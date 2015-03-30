// Copyright 2002-2015, University of Colorado Boulder

/**
* Superposition coefficients
*
* @author Emily Randall
*/
define( function( require ) {
  'use strict';
  
  // modules
  var FastArray = require( 'DOT/dot' ).FastArray;
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  
  /**
  * @param {PotentialWell} potential
  * @constructor
  */
  function SuperpositionCoefficients( potential ) {
    this.coefficients = new FastArray( potential.getNumberOfEigenstates() );
    for (var i = 0; i < this.coefficients.length; i++) {
      this.coefficients[i] = 0.0;
    }
    this.coefficients[0] = 1.0;
    this.normalizedProperty = new Property( true );
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
      this.normalizedProperty.value = false;
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
      this.normalizedProperty.value = true;
    },
    
    /**
     * Normalizes coefficients so the sum of the squared values is 1
     */
    normalize: function( ) {
      var sum = 0;
      for (var i = 0; i < this.coefficients.length; i++) {
        sum += this.coefficients[i] * this.coefficients[i];
      }
      sum = Math.sqrt(sum);
      for (var j = 0; j < this.coefficients.length; j++) {
        this.coefficients[i] = this.coefficients[i] / sum;
      }
      this.normalizedProperty.value = true;
    },
    
    /**
     * Returns the number of nonzero coefficients
     */
    getNumNonZeroCoefficients: function( ) {
      var count = 0;
      for (var i = 0; i < this.coefficients.length; i++ ) {
        if ( this.coefficients[i] !== 0 ) {
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