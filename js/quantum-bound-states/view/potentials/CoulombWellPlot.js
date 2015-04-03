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
  var Range = require( 'DOT/Range' );
  var Shape = require( 'KITE/Shape' );
  
  var NUM_POINTS = 200;

  /**
   * @param {QuantumBoundStatesModel} model
   * @param {CoulombPotential} potential
   * @param {number} width
   * @param {function} valueToX
   * @param {function} valueToY
   * @param {function} xToValue
   * @param {function} yToValue
   * @constructor
   */
  function CoulombWellPlot( model, potential, width, valueToX, valueToY, xToValue, yToValue, options ) {

    Node.call( this, options );
    var thisNode = this;

    var maxEnergy = potential.maxEnergy;
    var xScale = width / (model.maxX - model.minX);
    
    var energyRange = new Range( model.getMinEnergy(), model.getMaxEnergy() );
    
    var wellShape;
    
    var wellOffsetControl = new PotentialPropertyIndicator( potential.wellOffsetProperty, false, xToValue, yToValue, energyRange );

    wellOffsetControl.centerX = valueToX( model.maxX / 3 );
    
    var drawWell = function() {
      var potentialPoints = potential.getPotentialPoints( NUM_POINTS );
      var potentialPointsX = potentialPoints[ 0 ];
      var potentialPointsY = potentialPoints[ 1 ];
      wellShape = new Shape().
        moveTo( 0, valueToY( potentialPointsY[0] ) );
      for (var i = 1; i < potentialPointsX.length; i++) {
        if ( potentialPointsY[ i ] >= model.getMinEnergy() * 2 ) {
          wellShape = wellShape.lineTo( valueToX( potentialPointsX[ i ] ), valueToY( potentialPointsY[ i ] ) );
        }
      }
      wellShape = wellShape.horizontalLineTo( 2 * model.maxX * xScale );
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
    });
  }

  return inherit( Node, CoulombWellPlot );
} );