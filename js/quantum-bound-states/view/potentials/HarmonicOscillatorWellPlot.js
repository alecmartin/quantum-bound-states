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
  
  var NUM_POINTS = 200;

  /**
   * @param {QuantumBoundStatesModel} model
   * @param {HarmonicOscillatorPotential} potential
   * @param {function} valueToX
   * @param {function} valueToY
   * @param {function} xToValue
   * @param {function} yToValue
   * @constructor
   */
  function HarmonicOscillatorWellPlot( model, potential, valueToX, valueToY, xToValue, yToValue, options ) {

    Node.call( this, options );
    var thisNode = this;
    
    var energyRange = new Range( model.getMinEnergy(), model.getMaxEnergy() );
    var frequencyRange = QuantumBoundStatesConstants.FREQUENCY_RANGE;
    
    var maxEnergy = potential.maxEnergy;
    
    var wellShape;
    
    var wellOffsetControl = new PotentialPropertyIndicator( potential.wellOffsetProperty, false, xToValue, yToValue, energyRange );
    var wellFrequencyControl =  new PotentialPropertyIndicator( potential.frequencyProperty, true, xToValue, yToValue, frequencyRange );
    wellOffsetControl.centerX = valueToX( 0 );
    wellFrequencyControl.centerY = valueToY( (maxEnergy - model.getMinEnergy()) / 5 );
    
    var drawWell = function() {
      var potentialPoints = potential.getPotentialPoints( NUM_POINTS );
      var potentialPointsX = potentialPoints[ 0 ];
      var potentialPointsY = potentialPoints[ 1 ];
      var index = 0;
      while ( potentialPointsY[ index ] > maxEnergy + 1 ) {
        index++;
      }
      wellShape = new Shape().
        moveTo( valueToX( potentialPointsX[ index ] ), valueToY( potentialPointsY[ index ] ) );
      for (var i = index + 1; i < potentialPointsX.length; i++) {
        if ( potentialPointsY[ i ] <= model.getMaxEnergy() + 1 ) {
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
    });
    
    potential.frequencyProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
    });
  }

  return inherit( Node, HarmonicOscillatorWellPlot );
} );