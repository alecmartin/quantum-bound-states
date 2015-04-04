// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for a line that represents the energy of an eigenstate
 * Line is initially green, but turns yellow when hovered over
 * Lines are red when they are selected
 */
define( function( require ){
  'use strict';
	
  var inherit = require( 'PHET_CORE/inherit' );
  // var FillHighlightListener = require( 'SCENERY_PHET/input/FillHighlightListener' );
  // var HighlightListener = require( 'SCENERY_PHET/input/HighlightListener' );
  var ButtonListener = require('SCENERY/input/ButtonListener');
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  /**
  * @param {Property} hoveredEigenstateProperty
  * @param {number} width
  * @constructor
  */

  function EnergyLine( hoveredEigenstateProperty, width, options ){
    options = _.extend( {
      stroke: 'green',
      lineWidth: 3
    }, options );
   

    Line.call( this, 0, 0, width, 0);
    // this.addInputListener( new FillHighlightListener( 'green', 'yellow' ) );

    var inputListener = new ButtonListener( {
      over: function( event ) {  this.options.stroke = 'yellow'; this.mutate( options ); },
      up: function( event ) { this.options.stroke = 'green'; this.mutate( options ); }
    } );

    this.addInputListener(inputListener);
    
    this.mutate( options );
  }
  
  return inherit( Line, EnergyLine );

} );
