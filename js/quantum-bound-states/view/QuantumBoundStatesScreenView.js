//  Copyright 2002-2014, University of Colorado Boulder

/**
 *
 * @author Will Farmer, Alec Martin, Emily Randall, Cris Salazar, Samuel Volin
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var EnergyLine = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/EnergyLine' );
  var EnergyPlotNode = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/EnergyPlotNode' );
  var BottomPlotNode = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/BottomPlotNode' );
  var TopChartNode = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/TopChartNode' );
  var BottomChartNode = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/BottomChartNode' );

  /**
   * @param {QuantumBoundStatesModel} quantumBoundStatesModel
   * @constructor
   */
  function QuantumBoundStatesScreenView( quantumBoundStatesModel ) {

    ScreenView.call( this );
    
    var energyPlotNode = new EnergyPlotNode( quantumBoundStatesModel, 600, 250, {
      x: 0,
      y: 50,
    });
    this.addChild( energyPlotNode );

    // not working because cris is a chump
    // var energyLine = new EnergyLine( quantumBoundStatesModel, 600, 250, {
    //   x: 0,
    //   y: 50,
    // });
    // this.addChild( energyLine );

    var bottomPlotNode = new BottomPlotNode( quantumBoundStatesModel, 600, 200, {
      x: 0,
      y: 325,
    });
    this.addChild( bottomPlotNode );

    var topChartNode = new TopChartNode( quantumBoundStatesModel, {
      x: this.layoutBounds.maxX - 240,
      y: 20,

    });
    this.addChild( topChartNode );

    var bottomChartNode = new BottomChartNode( quantumBoundStatesModel, {
      x: this.layoutBounds.maxX - 240,
      y: 450,

    });
    this.addChild( bottomChartNode );

    // Create and add the Reset All Button in the bottom right, which resets the model
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        quantumBoundStatesModel.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  return inherit( ScreenView, QuantumBoundStatesScreenView, {

    // Called by the animation loop. Optional, so if your view has no animation, you can omit this.
    step: function( dt ) {
      // Handle view animation here.
    }
  } );
} );