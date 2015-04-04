// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor to draw the potential wells
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var AsymmetricPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/AsymmetricPotential' );
  var AsymmetricWellPlot = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/potentials/AsymmetricWellPlot' );
  var Coulomb1DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb1DPotential' );
  var Coulomb3DPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/Coulomb3DPotential' );
  var CoulombWellPlot = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/potentials/CoulombWellPlot' );
  var HarmonicOscillatorPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/HarmonicOscillatorPotential' );
  var HarmonicOscillatorWellPlot = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/potentials/HarmonicOscillatorWellPlot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var SquareWellPotential = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/SquareWellPotential' );
  var SquareWellPlot = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/potentials/SquareWellPlot' );

  var MIN_X = QuantumBoundStatesConstants.XRANGE.min;
  var MAX_X = QuantumBoundStatesConstants.XRANGE.max;
  
  /**
   * @param {QuantumBoundStatesModel} model
   * @param {number} width
   * @param {number} height
   * @param {Object} [options]
   * @constructor
   */
  function PotentialWellPlot( model, width, height, options ) {

    Node.call( this, options );

    var maxEnergy = model.getMaxEnergy();
    var xScale = width / (MAX_X - MIN_X);
    var yScale = height / (maxEnergy - model.getMinEnergy());
    var potential = model.currentPotentialProperty.value;
    
    // convert a value in nm to a pixel value
    var valueToX = function( x ) {
      return (MAX_X + x) * xScale;
    };
    
    // convert a value in eV to a pixel value
    var valueToY = function( y ) {
      return (maxEnergy - y) * yScale;
    };
    
    var valueToCoulombY = function( y ) {
      return (model.potentials[2].maxEnergy - y) * yScale;
    };
    
    // convert a value in pixels to nm
    var xToValue = function( x ) {
      return x / xScale - MAX_X;
    };
    
    // convert a value in pixels to eV
    var yToValue = function( y ) {
      return maxEnergy - y / yScale;
    };
    
    var yToCoulombValue = function( y ) {
      return model.potentials[2].maxEnergy - y / yScale;
    };
    
    var squareWellPlot = new SquareWellPlot( model.potentials[0], valueToX, valueToY, xToValue, yToValue );
    var asymmetricWellPlot = new AsymmetricWellPlot( model.potentials[1], valueToX, valueToY, xToValue, yToValue );
    var coulomb1DWellPlot = new CoulombWellPlot( model.potentials[2], valueToX, valueToCoulombY, xToValue, yToCoulombValue );
    var coulomb3DWellPlot = new CoulombWellPlot( model.potentials[3], valueToX, valueToCoulombY, xToValue, yToCoulombValue );
    var harmonicOscillatorWellPlot = new HarmonicOscillatorWellPlot( model.getParticleMassProperty(), model.potentials[4], valueToX, valueToY, xToValue, yToValue );
    this.addChild( squareWellPlot );
    this.addChild( asymmetricWellPlot );
    this.addChild( coulomb1DWellPlot );
    this.addChild( coulomb3DWellPlot );
    this.addChild( harmonicOscillatorWellPlot );
    
    var drawWell = function() {

      if ( potential instanceof SquareWellPotential ) {
        squareWellPlot.visible = true;
        asymmetricWellPlot.visible = false;
        coulomb1DWellPlot.visible = false;
        coulomb3DWellPlot.visible = false;
        harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof AsymmetricPotential ) {
        squareWellPlot.visible = false;
        asymmetricWellPlot.visible = true;
        coulomb1DWellPlot.visible = false;
        coulomb3DWellPlot.visible = false;
        harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof Coulomb1DPotential ) {
        squareWellPlot.visible = false;
        asymmetricWellPlot.visible = false;
        coulomb1DWellPlot.visible = true;
        coulomb3DWellPlot.visible = false;
        harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof Coulomb3DPotential ) {
        squareWellPlot.visible = false;
        asymmetricWellPlot.visible = false;
        coulomb1DWellPlot.visible = false;
        coulomb3DWellPlot.visible = true;
        harmonicOscillatorWellPlot.visible = false;
      }
      else if ( potential instanceof HarmonicOscillatorPotential ) {
        squareWellPlot.visible = false;
        asymmetricWellPlot.visible = false;
        coulomb1DWellPlot.visible = false;
        coulomb3DWellPlot.visible = false;
        harmonicOscillatorWellPlot.visible = true;
      }
    };
    
    drawWell();

    model.currentPotentialProperty.link( function() {
      potential = model.currentPotentialProperty.value;
      maxEnergy = model.getMaxEnergy();
      yScale = height / (maxEnergy - model.getMinEnergy());
      drawWell();
    } );
  }

  return inherit( Node, PotentialWellPlot );
} );