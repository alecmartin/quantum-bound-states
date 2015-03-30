// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor to draw the potential wells
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );

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
        wellShape = new Shape().
          moveTo( 0, (maxEnergy - (wellHeight + offset)) * yScale ).
          horizontalLineTo( (model.maxX - wellWidth / 2) * xScale ).
          verticalLineTo( (maxEnergy - offset) * yScale ).
          lineTo( (model.maxX + wellWidth / 2) * xScale, (maxEnergy - (wellHeight + offset)) * yScale ).
          horizontalLineTo( (model.maxX - model.minX) * xScale );
      }
      else {
        //TODO other types
        // 1D Coulomb
        // 3D Coulomb
        // Harmonic oscillator, var frequency = potential.frequencyProperty.value;
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
      drawWell();
      wellPath.shape = wellShape;
    } );
  }

  return inherit( Node, PotentialWellNode );
} );