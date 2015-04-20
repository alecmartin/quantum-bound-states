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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  // var Text = require( 'SCENERY/nodes/Text' );
  var Shape = require( 'KITE/Shape' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  var Path = require( 'SCENERY/nodes/Path' );
  /**
  * @param {Property} hoveredEigenstateProperty
  * @param {function} setOneCoefficient
  * @param {number} width
  * @param {number} index
  * @param {number} energy
  * @constructor
  */
  function EnergyLine( hoveredEigenstateProperty, setOneCoefficient, width, index, energy, options ){
    this.options = _.extend( {
      stroke: 'green',
      lineWidth: 2,
      cursor: 'pointer'
    }, options );
    Line.call( this, 0, 0, width, 0 );
    var thisNode = this;
    
    // touch area    
    this.touchArea = Shape.rectangle( 0, -this.options.lineWidth * 2, width, this.options.lineWidth * 2 );
    this.addChild( new Path( this.touchArea ) );

    //label on energy line
    var textString = 'E <sub>' + index + '</sub> = '  + energy.toFixed( 2 );
    var energyLevelString = new SubSupText( textString, { font: new PhetFont( 14 ), fill: 'yellow', visible: false, bottom: this.top + 2 });
    this.addChild( energyLevelString );
    
    // highlight on pointer over
    this.addInputListener( new ButtonListener( {
      over: function( event ) {
        thisNode.stroke = 'yellow';
        hoveredEigenstateProperty.set( index );
        energyLevelString.visible = true;
      },
      up: function( event ) {
        thisNode.stroke = thisNode.options.stroke;
        hoveredEigenstateProperty.set( -1 );
        energyLevelString.visible = false;
      },
      down: function( event ){
        setOneCoefficient( index );
      }
    } ) );
    
    this.mutate( this.options );
  }
  
  return inherit( Line, EnergyLine, {

    setStroke: function( color ) {
      this.options.stroke = color;
      this.stroke = color;
    }

  } );
} );