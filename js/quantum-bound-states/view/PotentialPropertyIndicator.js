// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for the arrow that controls a property of a potential well
 * @author Emily Randall
 */
define( function( require ){
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PotentialPropertyDragHandler = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/view/PotentialPropertyDragHandler' );
  var QuantumBoundStatesConstants = require( 'QUANTUM_BOUND_STATES/quantum-bound-states/model/QuantumBoundStatesConstants' );
  var Shape = require( 'KITE/Shape' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  
  /**
  * @param {Property} potentialProperty
  * @param {boolean} isHorizontal
  * @param {string} propertyString
  * @param {string} unitString
  * @param {function} xToValue
  * @param {function} yToValue
  * @param {min: number, max: number} range
  * @constructor
  */
  function PotentialPropertyIndicator( potentialProperty, isHorizontal, propertyString, unitString, xToValue, yToValue, range, options ){
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
    
    //var arrow = new ArrowNode( 0, 0, QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH, 0, options );
    ArrowNode.call( this, 0, 0, QuantumBoundStatesConstants.PROPERTY_INDICATOR_LENGTH, 0, options );
    var thisNode = this;
    
    // touch area
    var dx = 0.5 * this.width;
    var dy = 0.25 * this.height;
    this.touchArea = Shape.rectangle( ( -this.width / 2 ) - dx, ( -this.height / 2 ) - dy, this.width + dx + dx, this.height + dy + dy );
    
    var textOptions = {
      font: new PhetFont( 14 ),
      fill: 'white',
      visible: false,
      left: this.right + 5,
      bottom: this.top + 5,
      rotation: -rotation
    };
    var propertyText = new SubSupText( propertyString + ": " + potentialProperty.value.toFixed( 1 ) + " " + unitString, textOptions );
    //this.addChild( propertyText );
    
    // highlight on pointer over
    this.addInputListener( new ButtonListener( {
      over: function( event ) {
        thisNode.fill = 'white';
        propertyText.visible = true;
      },
      up: function( event ) {
        thisNode.fill = options.fill;
        propertyText.visible = false;
      }
    } ) );
    
    this.addInputListener( new PotentialPropertyDragHandler( potentialProperty, isHorizontal, xToValue, yToValue, range ) );
  }
  
  return inherit( ArrowNode, PotentialPropertyIndicator );
} );
