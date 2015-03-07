//  Copyright 2002-2014, University of Colorado Boulder

/**
 *
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );


  function PotentialWellNode( model, width, height, options ) {
    Node.call( this, options );
    var thisNode = this;
    
    var potential = model.currentPotentialProperty.value;
    var maxEnergy = model.getMaxEnergy();
    var xScale = width / (model.maxX - model.minX);
    var yScale = height / (maxEnergy - model.getMinEnergy());
    var offset = potential.wellOffset.value;
    var wellShape;

    var drawWell = function() {
      switch (model.potentialTypeProperty.value) {
        case 0: // Square well
          var wellWidth = potential.wellWidth.value;
          var wellHeight = potential.wellHeight.value;
          wellShape = new Shape().
            moveTo( 0, (maxEnergy - (wellHeight + offset)) * yScale ).
            horizontalLineTo( (model.maxX - wellWidth / 2) * xScale ).
            verticalLineTo( (maxEnergy - offset)*yScale ).
            horizontalLineTo( (model.maxX + wellWidth / 2) * xScale ).
            verticalLineTo( (maxEnergy - (wellHeight + offset)) * yScale ).
            horizontalLineTo( (model.maxX - model.minX) * xScale );
          break;
        case 1: // Asymmetric well
          var width = potential.wellWidth.value;
          var height = potential.wellHeight.value;
          wellShape = new Shape().
            moveTo( 0, (maxEnergy - (wellHeight + offset)) * yScale ).
            horizontalLineTo( (model.maxX - wellWidth / 2) * xScale ).
            verticalLineTo( (maxEnergy - offset)*yScale ).
            lineTo( (model.maxX + wellWidth / 2) * xScale, (maxEnergy - (wellHeight + offset)) * yScale ).
            horizontalLineTo( (model.maxX - model.minX) * xScale );
          break;
        case 2: // 1D Coulomb
        case 3: // 3D Coulomb
          break;
        case 4: // Harmonic oscillator
          var frequency = potential.frequency.value;
          break;
      }
    }
    
    drawWell();
    var wellPath = new Path( wellShape,
    {
      stroke: 'purple',
      lineWidth: 3,
      lineJoin: 'round'
    } )
    thisNode.addChild( wellPath );
    
    model.currentPotentialProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
    });
  }

  return inherit( Node, PotentialWellNode );
} );