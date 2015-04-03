// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor to draw the potential wells
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Coulomb1DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DPotential' );
  var Coulomb3DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DPotential' );
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PotentialPropertyIndicator = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialPropertyIndicator' );
  var Range = require( 'DOT/Range' );
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
    
    var energyRange = new Range( model.getMinEnergy(), model.getMaxEnergy() );
    var heightRange = QuantumBoundStatesConstants.WELL_HEIGHT_RANGE;
    var widthRange = QuantumBoundStatesConstants.WELL_WIDTH_RANGE;
    var frequencyRange = QuantumBoundStatesConstants.FREQUENCY_RANGE;
    
    var wellShape;
    var wellWidth;
    var wellHeight;
    var potential = model.currentPotentialProperty.value;
    var potentialPoints;
    var potentialPointsX;
    var potentialPointsY;
    var i;
    
    // convert a value in nm to a pixel value
    var valueToX = function( x ) {
      return (model.maxX + x) * xScale;
    };
    
    // convert a value in eV to a pixel value
    var valueToY = function( y ) {
      return (maxEnergy - y) * yScale;
    };
    
    // convert a value in pixels to nm
    var xToValue = function( x ) {
      return x / xScale - model.maxX;
    };
    
    // convert a value in pixels to eV
    var yToValue = function( y ) {
      return maxEnergy - y / yScale;
    };
    
    var wellOffsetControl = new PotentialPropertyIndicator( potential.wellOffsetProperty, false, valueToX, valueToY, xToValue, yToValue, energyRange );
    var wellHeightControl = new PotentialPropertyIndicator( potential.wellOffsetProperty, false, valueToX, valueToY, xToValue, yToValue, energyRange );
    var wellWidthControl = new PotentialPropertyIndicator( potential.wellOffsetProperty, false, valueToX, valueToY, xToValue, yToValue, energyRange );
    var wellFrequencyControl = new PotentialPropertyIndicator( potential.wellOffsetProperty, false, valueToX, valueToY, xToValue, yToValue, energyRange );

    var drawWell = function() {
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
        
        wellOffsetControl.centerX = valueToX( 0 );
        wellHeightControl =  new PotentialPropertyIndicator( potential.wellHeightProperty, false, valueToX, valueToY, xToValue, yToValue, heightRange );
        wellHeightControl.centerX = valueToX( wellWidth / 2 );
        wellWidthControl =  new PotentialPropertyIndicator( potential.wellWidthProperty, true, valueToX, valueToY, xToValue, yToValue, widthRange );
        wellWidthControl.centerY = valueToY( (wellHeight + offset) / 2 );
        
        wellHeightControl.visible = true;
        wellWidthControl.visible = true;
        wellFrequencyControl.visible = false;
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
          
        wellOffsetControl.centerX = valueToX( -wellWidth / 2 );
        wellHeightControl =  new PotentialPropertyIndicator( potential.wellHeightProperty, false, valueToX, valueToY, xToValue, yToValue, heightRange );
        wellHeightControl.centerX = valueToX( wellWidth / 2 );
        wellWidthControl =  new PotentialPropertyIndicator( potential.wellWidthProperty, true, valueToX, valueToY, xToValue, yToValue, widthRange );
        wellWidthControl.centerY = valueToY( (wellHeight + offset) / 2 );
        
        wellHeightControl.visible = true;
        wellWidthControl.visible = true;
        wellFrequencyControl.visible = false;
      }
      else if ( potential instanceof Coulomb1DPotential || potential instanceof Coulomb3DPotential ) {
        potentialPoints = potential.getPotentialPoints( NUM_POINTS );
        potentialPointsX = potentialPoints[ 0 ];
        potentialPointsY = potentialPoints[ 1 ];
        wellShape = new Shape().
          moveTo( 0, valueToY( potentialPointsY[0] ) );
        for (i = 1; i < potentialPointsX.length; i++) {
          if ( potentialPointsY[ i ] >= model.getMinEnergy() * 2 ) {
            wellShape = wellShape.lineTo( valueToX( potentialPointsX[ i ] ), valueToY( potentialPointsY[ i ] ) );
          }
        }
        wellShape = wellShape.horizontalLineTo( 2 * model.maxX * xScale );
        
        wellOffsetControl.centerX = valueToX( model.maxX / 3 );
        
        wellHeightControl.visible = false;
        wellWidthControl.visible = false;
        wellFrequencyControl.visible = false;
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
          moveTo( valueToX( potentialPointsX[ index ] ), valueToY( potentialPointsY[ index ] ) );
        for (i = index + 1; i < potentialPointsX.length; i++) {
          if ( potentialPointsY[ i ] <= model.getMaxEnergy() + 1 ) {
            wellShape = wellShape.lineTo( valueToX( potentialPointsX[ i ] ), valueToY( potentialPointsY[ i ] ) );
          }
        }
        
        wellOffsetControl.centerX = valueToX( 0 );
        wellFrequencyControl =  new PotentialPropertyIndicator( potential.frequencyProperty, true, valueToX, valueToY, xToValue, yToValue, frequencyRange );
        wellFrequencyControl.centerY = valueToY( (maxEnergy - model.getMinEnergy()) / 5 );
        
        wellHeightControl.visible = false;
        wellWidthControl.visible = false;
        wellFrequencyControl.visible = true;
      }
    };
    
    var updateLinks = function() {
      potential = model.currentPotentialProperty.value;
      
      potential.wellOffsetProperty.link( function() {
        drawWell();
        wellPath.shape = wellShape;
      });
      
      if ( potential instanceof SquareWellPotential || potential instanceof AsymmetricPotential ) {
        potential.wellWidthProperty.link( function() {
          drawWell();
          wellPath.shape = wellShape;
        });
        potential.wellHeightProperty.link( function() {
          drawWell();
          wellPath.shape = wellShape;
        });
      }
      else if ( potential instanceof HarmonicOscillatorPotential ) {
        potential.frequencyProperty.link( function() {
          drawWell();
          wellPath.shape = wellShape;
        });
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
    
    updateLinks();
    
    this.addChild( wellOffsetControl );
    this.addChild( wellHeightControl );
    this.addChild( wellWidthControl );
    this.addChild( wellFrequencyControl );

    model.currentPotentialProperty.link( function() {
      potential = model.currentPotentialProperty.value;
      maxEnergy = model.getMaxEnergy();
      yScale = height / (maxEnergy - model.getMinEnergy());
      drawWell();
      wellPath.shape = wellShape;
      updateLinks();
    } );
  }

  return inherit( Node, PotentialWellNode );
} );