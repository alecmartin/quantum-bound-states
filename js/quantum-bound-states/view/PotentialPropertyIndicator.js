// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for the arrow that controls a property of a potential well
 */
define( function( require ){
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PotentialPropertyDragHandler = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialPropertyDragHandler' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Shape = require( 'KITE/Shape' );
  
  /**
  * @param {Property} potentialProperty
  * @param {boolean} isHorizontal
  * @constructor
  */
  function PotentialPropertyIndicator( potentialProperty, isHorizontal, xToValue, yToValue, range, options ){
    var rotation = 0;
    if ( !isHorizontal ) {
      rotation = Math.PI / 2;
    }
    options = _.extend( {
      doubleHead: true,
      tailWidth: 8,
      headWidth: 20,
      headHeight: 16,
      fill: 'rgb(212,129,250)',
      stroke: 'black',
      lineWidth: 2,
      cursor: 'pointer',
      rotation: rotation
    }, options );
    
    ArrowNode.call( this, 0, 0, QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH, 0, options );
    var thisNode = this;
    
    // touch area
    var dx = 0.5 * this.width;
    var dy = 0.25 * this.height;
    this.touchArea = Shape.rectangle( ( -this.width / 2 ) - dx, ( -this.height / 2 ) - dy, this.width + dx + dx, this.height + dy + dy );
    
    // highlight on pointer over
    this.addInputListener( new ButtonListener( {
      over: function( event ) { thisNode.fill = 'white'; },
      up: function( event ) { thisNode.fill = options.fill; }
    } ) );
    
    this.addInputListener( new PotentialPropertyDragHandler( potentialProperty, isHorizontal, xToValue, yToValue, range ) );
  }
  
  return inherit( ArrowNode, PotentialPropertyIndicator );
} );
