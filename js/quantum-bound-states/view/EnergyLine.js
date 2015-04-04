// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for a line that represents the energy of an eigenstate
 * Line is initially green, but turns yellow when hovered over
 * Lines are red when they are selected
 */
define( function( require ){
  'use strict';
  
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  //var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  //var Text = require( 'SCENERY/nodes/Text' );
  var Shape = require( 'KITE/Shape' );
  //var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  var Path = require( 'SCENERY/nodes/Path' );
  /**
  * @param {Property} hoveredEigenstateProperty
  * @param {number} width
  * @param {number} index
  * @constructor
  */
  function EnergyLine( hoveredEigenstateProperty, width, index, options ){
    options = _.extend( {
      stroke: 'green',
      lineWidth: 3,
      cursor: 'pointer'
    }, options );
    
    Line.call( this, 0, 0, width, 0 );
    var thisNode = this;
    
    // touch area    
    this.touchArea = Shape.rectangle( 0, -options.lineWidth, width, options.lineWidth );
    this.addChild( new Path( this.touchArea ) );
    
    // highlight on pointer over
    this.addInputListener( new ButtonListener( {
      over: function( event ) {
	console.log("over");
	thisNode.stroke = 'yellow';
	hoveredEigenstateProperty.value = index;
      },
      up: function( event ) {
	console.log("up");
	thisNode.stroke = options.stroke;
	hoveredEigenstateProperty.value = -1;
      }
    } ) );
    
    this.mutate( options );
  }
  
  return inherit( Line, EnergyLine );
} );
