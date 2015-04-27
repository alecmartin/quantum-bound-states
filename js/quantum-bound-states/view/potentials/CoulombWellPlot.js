// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor to draw a coulomb well potential
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
  
  // strings
  var offsetString = require( 'string!QUANTUM_BOUND_STATES/offset-string' );
  var eVString = require( 'string!QUANTUM_BOUND_STATES/electron-volt' );
  
  var NUM_POINTS = 200;
  var MAX_X = QuantumBoundStatesConstants.XRANGE.max;

  /**
   * @param {CoulombPotential} potential
   * @param {Property} timeProperty
   * @param {Property} runningProperty
   * @param {function} valueToX
   * @param {function} valueToY
   * @param {function} xToValue
   * @param {function} yToValue
   * @constructor
   */
  function CoulombWellPlot( potential, timeProperty, runningProperty, valueToX, valueToY, xToValue, yToValue, options ) {

    Node.call( this, options );
    var thisNode = this;
    
    var energyRange = new Range( potential.minEnergy, potential.maxEnergy );
    
    var wellShape;
    
    var getOffset = function( y ) {
      return yToValue( y + QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH / 2 );
    };
    
    var wellOffsetControl = new PotentialPropertyIndicator( potential.wellOffsetProperty,
                                                           timeProperty,
                                                           runningProperty,
                                                           false,
                                                           offsetString,
                                                           eVString,
                                                           xToValue,
                                                           getOffset,
                                                           energyRange );

    wellOffsetControl.centerX = valueToX( MAX_X / 3 );
    
    var drawWell = function() {
      var potentialPoints = potential.getPotentialPoints( NUM_POINTS );
      var potentialPointsX = potentialPoints[ 0 ];
      var potentialPointsY = potentialPoints[ 1 ];
      wellShape = new Shape().
        moveTo( 0, valueToY( potentialPointsY[0] ) );
      for (var i = 1; i < potentialPointsX.length; i++) {
        if ( potentialPointsY[ i ] >= potential.minEnergy * 2 ) {
          wellShape = wellShape.lineTo( valueToX( potentialPointsX[ i ] ), valueToY( potentialPointsY[ i ] ) );
        }
      }
      wellShape = wellShape.horizontalLineTo( valueToX( MAX_X ) );
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

    potential.wellOffsetProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
      wellOffsetControl.centerY = valueToY( potential.wellOffsetProperty.value );
    });
  }

  return inherit( Node, CoulombWellPlot );
} );