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
  function SuperpositionCoefficients( currentPotentialProperty ) {
    this.potential = currentPotentialProperty.value;
    var coefficients = [];
    for (var i = 0; i < coefficients.length; i++) {
      coefficients[ i ] = 0.0;
    }
    coefficients[ 0 ] = 1.0;
    this.coefficientsProperty = new Property( coefficients, { propertyID: "coefficients" } );
    this.normalizedProperty = new Property( true, { propertyID: "normalized" } );
    
    var thisNode = this;
    
    var matchEigenvals = function() {
      var eigenvals = thisNode.potential.eigenvalsProperty.value;
      var coefficients = thisNode.coefficientsProperty.value;
      if ( eigenvals.length > coefficients.length ) {
        for ( var i = coefficients.length; i < eigenvals.length; i++ ) {
          coefficients.push( 0.0 );
        }
        thisNode.coefficientsProperty.set( coefficients );
        thisNode.coefficientsProperty.notifyObserversStatic();
      }
      else if ( eigenvals.length < coefficients.length ) {
        var visibleStates = 0;
        for ( var i = 0; i < eigenvals.length; i++ ) {
          if ( coefficients[ i ] > 0.0 ) {
            visibleStates++;
          }
        }
        for ( var j = coefficients.length - 1; j >= eigenvals.length; j-- ) {
          coefficients.pop();
        }
        if ( visibleStates === 0 ) {
          coefficients[ 0 ] = 1.0;
        }
        thisNode.normalize( coefficients );
      }
    };
    
    this.potential.eigenvalsProperty.link( matchEigenvals );
    
    currentPotentialProperty.link( function() {
      thisNode.potential.eigenvalsProperty.unlink( matchEigenvals );
      thisNode.potential = currentPotentialProperty.value;
      thisNode.potential.eigenvalsProperty.link( matchEigenvals );
    });
  }
  
  return inherit( Object, SuperpositionCoefficients, {
    
    /**
     * Returns the ith coefficient
     */
    getCoefficient: function( i ) {
      return this.coefficientsProperty.value[ i ];
    },
    
    /**
     * Sets the ith coefficient to value
     * Sets the normalized property to false
     */
    setCoefficient: function( i, value ) {
      var coefficients = this.coefficientsProperty.value;
      coefficients[ i ] = value;
      this.coefficientsProperty.set( coefficients );
      this.coefficientsProperty.notifyObserversStatic();
      this.normalizedProperty.value = false;
    },
    
    /**
     * Sets all coefficients to 0 except the ith coefficient
     * Sets the ith coefficient to 1
     * Sets the normalized property to true
     */
    setOneCoefficient: function( i ) {
      var coefficients = this.coefficientsProperty.value;
      for (var j = 0; j < coefficients.length; j++ ) {
        coefficients[ j ] = 0;
      }
      coefficients[ i ] = 1.0;
      this.coefficientsProperty.set( coefficients );
      this.coefficientsProperty.notifyObserversStatic();
      this.normalizedProperty.value = true;
    },
    
    /**
     * Normalizes coefficients so the sum of the squared values is 1
     */
    normalize: function( coefficients ) {
      var sum = 0;
      for (var i = 0; i < coefficients.length; i++) {
        sum += coefficients[ i ] * coefficients[ i ];
      }
      sum = Math.sqrt( sum );
      for (var j = 0; j < coefficients.length; j++) {
        coefficients[ j ] = coefficients[ j ] / sum;
      }
      this.coefficientsProperty.value = coefficients;
      this.coefficientsProperty.notifyObserversStatic();
      this.normalizedProperty.value = true;
    },
    
    /**
     * Returns the number of nonzero coefficients
     */
    getNumNonZeroCoefficients: function( ) {
      var count = 0;
      var coefficients = this.coefficientsProperty.value;
      for (var i = 0; i < coefficients.length; i++ ) {
        if ( coefficients[ i ] !== 0 ) {
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