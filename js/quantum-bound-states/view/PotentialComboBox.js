// Copyright 2002-2015, University of Colorado Boulder

/**
 * Combo box to choose between 5 types of potentials
 *
 * @author Emily Randall
 */
define( function( require ) {
  'use strict';

  // modules
  var ComboBox = require( 'SUN/ComboBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Creates a combo box item
  function createItem( potential, i ) {
    var node = new Node();
    var text = new Text( potential.name, { font: new PhetFont( 12 ) } );
    var icon = new Image( potential.image, { left: text.right + 7, top: text.top, scale: 0.2 } );
    node.addChild( text );
    node.addChild( icon );
    return ComboBox.createItem( node, i );
  };

  /**
   * @param {PotentialWell[]} potentials
   * @param {Property} potentialTypeProperty
   * @param {Node} parent
   * @constructor
   */
  function PotentialComboBox( potentials, potentialTypeProperty, parent ) {

    var items = [];
    for ( var i = 0; i < potentials.length; i++ ) {
      items[ i ] = createItem( potentials[ i ], i );
    }

    ComboBox.call( this, items, potentialTypeProperty, parent, {
      listPosition: 'below',
      itemYMargin: 3,
      itemXMargin: 0,
      itemHighlightFill: 'rgb(218,255,255)'
    } );
  }

  return inherit( ComboBox, PotentialComboBox );
} );