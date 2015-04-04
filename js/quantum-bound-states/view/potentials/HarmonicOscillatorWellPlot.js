// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor to draw the harmonic oscillator well potential
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PotentialPropertyIndicator = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialPropertyIndicator' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Range = require( 'DOT/Range' );
  var Shape = require( 'KITE/Shape' );
  
  var NUM_POINTS = 500;

  /**
   * @param {Property} particleMassProperty
   * @param {HarmonicOscillatorPotential} potential
   * @param {function} valueToX
   * @param {function} valueToY
   * @param {function} xToValue
   * @param {function} yToValue
   * @constructor
   */
  function HarmonicOscillatorWellPlot( particleMassProperty, potential, valueToX, valueToY, xToValue, yToValue, options ) {

    Node.call( this, options );
    var thisNode = this;
    
    var energyRange = new Range( potential.minEnergy, potential.maxEnergy );
    var frequencyRange = QuantumBoundStatesConstants.FREQUENCY_RANGE;
    
    var maxEnergy = potential.maxEnergy;
    
    var wellShape;
    
    var getOffset = function( y ) {
      return yToValue( y + QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH / 2 );
    };
    
    var getFrequency = function( x ) {
      var realX = xToValue( x + QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH / 2 );
      var energy = yToValue( wellFrequencyControl.centerY ) - potential.wellOffsetProperty.value;
      var freq = -Math.sqrt( 2 * energy / particleMassProperty.value ) / realX;
      if ( freq < 0 || freq > frequencyRange.max) {
        freq = frequencyRange.max;
      }
      return freq;
    };
    
    var wellOffsetControl = new PotentialPropertyIndicator( potential.wellOffsetProperty, false, xToValue, getOffset, energyRange );
    var wellFrequencyControl =  new PotentialPropertyIndicator( potential.frequencyProperty, true, getFrequency, yToValue, frequencyRange );
    
    wellOffsetControl.centerX = valueToX( 0 );
    wellFrequencyControl.centerY = valueToY( (maxEnergy - potential.minEnergy) / 5 );
    
    var drawWell = function() {
      var potentialPoints = potential.getPotentialPoints( NUM_POINTS );
      var potentialPointsX = potentialPoints[ 0 ];
      var potentialPointsY = potentialPoints[ 1 ];
      var index = 0;
      while ( potentialPointsY[ index ] > maxEnergy * 2 ) {
        index++;
      }
      wellShape = new Shape().
        moveTo( valueToX( potentialPointsX[ index ] ), valueToY( potentialPointsY[ index ] ) );
      for (var i = index + 1; i < potentialPointsX.length - index; i++) {
        if ( potentialPointsY[ i ] <= potential.maxEnergy + 1 ) {
          wellShape = wellShape.lineTo( valueToX( potentialPointsX[ i ] ), valueToY( potentialPointsY[ i ] ) );
        }
      }
    };

    drawWell();
    var wellPath = new Path( wellShape,
      {
        stroke: 'purple',
        lineWidth: 3,
        lineJoin: 'round'
      } );
    thisNode.addChild( wellPath );
    
    this.addChild( wellOffsetControl );
    this.addChild( wellFrequencyControl );

    potential.wellOffsetProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
      wellOffsetControl.centerY = valueToY( potential.wellOffsetProperty.value );
      wellFrequencyControl.centerY = valueToY( (maxEnergy - potential.minEnergy) / 5 + potential.wellOffsetProperty.value );
    });
    
    potential.frequencyProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
      var energy = yToValue( wellFrequencyControl.centerY ) - potential.wellOffsetProperty.value;
      var x = -Math.sqrt( 2 * energy / particleMassProperty.value ) / potential.frequencyProperty.value;
      wellFrequencyControl.centerX = valueToX( x );
    });
  }

  return inherit( Node, HarmonicOscillatorWellPlot );
} );