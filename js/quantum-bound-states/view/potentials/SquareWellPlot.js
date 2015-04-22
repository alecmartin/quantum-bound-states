// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor to draw the square well potential
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
  var heightString = require( 'string!QUANTUM_BOUND_STATES/height-string' );
  var widthString = require( 'string!QUANTUM_BOUND_STATES/width-string' );
  var offsetString = require( 'string!QUANTUM_BOUND_STATES/offset-string' );
  var eVString = require( 'string!QUANTUM_BOUND_STATES/electron-volt' );
  var nmString = require( 'string!QUANTUM_BOUND_STATES/nanometer' );

  var MAX_X = QuantumBoundStatesConstants.XRANGE.max;
  
  /**
   * @param {SquareWellPotential} potential
   * @param {Property} timeProperty
   * @param {Property} runningProperty
   * @param {function} valueToX
   * @param {function} valueToY
   * @param {function} xToValue
   * @param {function} yToValue
   * @constructor
   */
  function SquareWellPlot( potential, timeProperty, runningProperty, valueToX, valueToY, xToValue, yToValue, options ) {

    Node.call( this, options );
    var thisNode = this;
    
    var energyRange = new Range( potential.minEnergy, potential.maxEnergy );
    var heightRange = QuantumBoundStatesConstants.WELL_HEIGHT_RANGE;
    var widthRange = QuantumBoundStatesConstants.WELL_WIDTH_RANGE;
    
    var wellShape;
    var wellWidth;
    var wellHeight;
    
    var getWidth = function( x ) {
      return xToValue( x + QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH / 2 ) * 2;
    };
    
    var getHeight = function( y ) {
      return yToValue( y + QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH / 2 );
    };
    
    var wellOffsetControl = new PotentialPropertyIndicator( potential.wellOffsetProperty,
                                                           timeProperty,
                                                           runningProperty,
                                                           false,
                                                           offsetString,
                                                           eVString,
                                                           xToValue,
                                                           getHeight,
                                                           energyRange );
    var wellHeightControl =  new PotentialPropertyIndicator( potential.wellHeightProperty,
                                                            timeProperty,
                                                            runningProperty,
                                                            false,
                                                            heightString,
                                                            eVString,
                                                            xToValue,
                                                            getHeight,
                                                            heightRange );
    var wellWidthControl =  new PotentialPropertyIndicator( potential.wellWidthProperty,
                                                           timeProperty,
                                                           runningProperty,
                                                           true,
                                                           widthString,
                                                           nmString,
                                                           getWidth,
                                                           yToValue,
                                                           widthRange );

    wellOffsetControl.centerX = valueToX( 0 );
    
    var drawWell = function() {
      var offset = potential.wellOffsetProperty.value;

      wellWidth = potential.wellWidthProperty.value;
      wellHeight = potential.wellHeightProperty.value;
      wellShape = new Shape().
        moveTo( 0, valueToY( wellHeight + offset ) ).
        horizontalLineTo( valueToX( -wellWidth / 2 ) ).
        verticalLineTo( valueToY( offset ) ).
        horizontalLineTo( valueToX( wellWidth / 2 ) ).
        verticalLineTo( valueToY( wellHeight + offset ) ).
        horizontalLineTo( valueToX( MAX_X ) );
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
    this.addChild( wellHeightControl );
    this.addChild( wellWidthControl );

    potential.wellOffsetProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
      wellOffsetControl.centerY = valueToY( potential.wellOffsetProperty.value );
      wellHeightControl.centerY = valueToY( potential.wellOffsetProperty.value + potential.wellHeightProperty.value );
      wellWidthControl.centerY = valueToY( potential.wellOffsetProperty.value + potential.wellHeightProperty.value / 2 );
    });
    
    potential.wellWidthProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
      wellHeightControl.centerX = valueToX( potential.wellWidthProperty.value / 2 + 0.2 );
      wellWidthControl.centerX = valueToX( potential.wellWidthProperty.value / 2 );
    });
    
    potential.wellHeightProperty.link( function() {
      drawWell();
      wellPath.shape = wellShape;
      wellHeightControl.centerY = valueToY( potential.wellOffsetProperty.value + potential.wellHeightProperty.value );
      wellWidthControl.centerY = valueToY( potential.wellOffsetProperty.value + potential.wellHeightProperty.value / 2 );
    });
  }

  return inherit( Node, SquareWellPlot );
} );