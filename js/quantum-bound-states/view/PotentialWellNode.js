// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor to draw the potential wells
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var Coulomb1DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DPotential' );
  var Coulomb3DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DPotential' );
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  
  // constants
  var NUM_POINTS = 200;

  /**
   * @param {QuantumBoundStatesModel} model
   * @param {number} width
   * @param {number} height
   * @param {Object} [options]
   * @constructor
   */
  function PotentialWellNode( model, width, height, options ) {

    Node.call( this, options );
    var thisNode = this;

    var maxEnergy = model.getMaxEnergy();
    var xScale = width / (model.maxX - model.minX);
    var yScale = height / (maxEnergy - model.getMinEnergy());
    var wellShape;
    var wellWidth;
    var wellHeight;
    var potentialPoints;
    var potentialPointsX;
    var potentialPointsY;
    var i;

    var drawWell = function() {

      var potential = model.currentPotentialProperty.value;
      var offset = potential.wellOffsetProperty.value;

      if ( potential instanceof SquareWellPotential ) {
        wellWidth = potential.wellWidthProperty.value;
        wellHeight = potential.wellHeightProperty.value;
        wellShape = new Shape().
          moveTo( 0, (maxEnergy - (wellHeight + offset)) * yScale ).
          horizontalLineTo( (model.maxX - wellWidth / 2) * xScale ).
          verticalLineTo( (maxEnergy - offset) * yScale ).
          horizontalLineTo( (model.maxX + wellWidth / 2) * xScale ).
          verticalLineTo( (maxEnergy - (wellHeight + offset)) * yScale ).
          horizontalLineTo( (model.maxX - model.minX) * xScale );
      }
      else if ( potential instanceof AsymmetricPotential ) {
        wellWidth = potential.wellWidthProperty.value;
        wellHeight = potential.wellHeightProperty.value;
        console.log((model.maxX - wellWidth / 2));
        wellShape = new Shape().
          moveTo( 0, (maxEnergy - (wellHeight + offset)) * yScale ).
          horizontalLineTo( (model.maxX - wellWidth / 2) * xScale ).
          verticalLineTo( (maxEnergy - offset) * yScale ).
          lineTo( (model.maxX + wellWidth / 2) * xScale, (maxEnergy - (wellHeight + offset)) * yScale ).
          horizontalLineTo( (model.maxX - model.minX) * xScale );
      }
      else if ( potential instanceof Coulomb1DPotential || potential instanceof Coulomb3DPotential ) {
        potentialPoints = potential.getPotentialPoints( NUM_POINTS );
        potentialPointsX = potentialPoints[ 0 ];
        potentialPointsY = potentialPoints[ 1 ];
        wellShape = new Shape().
          moveTo( 0, (maxEnergy - potentialPointsY[ 0 ]) * yScale );
        for (i = 1; i < potentialPointsX.length; i++) {
          if ( potentialPointsY[ i ] >= model.getMinEnergy() * 2 ) {
            wellShape = wellShape.lineTo( (model.maxX + potentialPointsX[ i ]) * xScale, (maxEnergy - potentialPointsY[ i ]) * yScale );
          }
        }
        wellShape = wellShape.horizontalLineTo( 2 * model.maxX * xScale );
      }
      else if ( potential instanceof HarmonicOscillatorPotential ) {
        potentialPoints = potential.getPotentialPoints( NUM_POINTS );
        potentialPointsX = potentialPoints[ 0 ];
        potentialPointsY = potentialPoints[ 1 ];
        var index = 0;
        while ( potentialPointsY[ index ] > maxEnergy + 1 ) {
          index++;
        }
        wellShape = new Shape().
          moveTo( (model.maxX + potentialPointsX[ index ]) * xScale, (maxEnergy - potentialPointsY[ index ]) * yScale );
        for (i = index + 1; i < potentialPointsX.length; i++) {
          if ( potentialPointsY[ i ] <= model.getMaxEnergy() + 1 ) {
            wellShape = wellShape.lineTo( (model.maxX + potentialPointsX[ i ]) * xScale, (maxEnergy - potentialPointsY[ i ]) * yScale );
          }
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

    model.currentPotentialProperty.link( function() {
      maxEnergy = model.getMaxEnergy();
      yScale = height / (maxEnergy - model.getMinEnergy());
      drawWell();
      wellPath.shape = wellShape;
    } );
  }

  return inherit( Node, PotentialWellNode );
} );