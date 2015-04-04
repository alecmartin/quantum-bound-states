// Copyright 2002-2015, University of Colorado Boulder

/**
 * Drag handler that changes a property of a potential well
 */
define( function( require ){
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  
  /**
  * @param {Property} potentialProperty
  * @param {boolean} isHorizontal
  * @constructor
  */
  function PotentialPropertyDragHandler( potentialProperty, isHorizontal, xToValue, yToValue, range ){
    var clickXOffset; // x-offset between initial click and thumb's origin
    var clickYOffset; // y-offset between initial click and thumb's origin
    SimpleDragHandler.call( this, {
      
      allowTouchSnag: true,
      
      // Record the offset between the pointer and the indicator's origin.
      start: function( event ) {
        clickXOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        clickYOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
      },
      
      drag: function( event ) {
        if ( isHorizontal ) {
          // Adjust the x-coordinate for the offset between the pointer and the indicator's origin
          var x = event.currentTarget.globalToParentPoint( event.pointer.point ).x - clickXOffset;
          // Convert the x-coordinate to a model value
          var distance = xToValue( x );
          distance = Util.clamp( distance, range.min, range.max );
          potentialProperty.set( distance );
        }
        else {
          // Adjust the y-coordinate for the offset between the pointer and the indicator's origin
          var y = event.currentTarget.globalToParentPoint( event.pointer.point ).y - clickYOffset;
          // Convert the y-coordinate to a model value
          var energy = yToValue( y );
          energy = Util.clamp( energy, range.min, range.max );
          potentialProperty.set( energy );
        }
      }
    } );
  }
  
  return inherit( SimpleDragHandler, PotentialPropertyDragHandler );
} );
