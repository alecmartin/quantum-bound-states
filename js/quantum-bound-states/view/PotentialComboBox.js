// Copyright 2015, University of Colorado Boulder

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

  /**
  * @param {PotentialWell[]} potentials
  * @param {Property} potentialTypeProperty
  * @param {Node} parent
  * @constructor
  */
  function PotentialComboBox( potentials, potentialTypeProperty, parent, options ) {
    
    // strings
    var squareString = require( 'string!QUANTUM_BOUND_STATES/square' );
    var asymString = require( 'string!QUANTUM_BOUND_STATES/asymmetric' );
    var coulomb1DString = require( 'string!QUANTUM_BOUND_STATES/coulomb_1d' );
    var coulomb3DString = require( 'string!QUANTUM_BOUND_STATES/coulomb_3d' );
    var harmonicString = require( 'string!QUANTUM_BOUND_STATES/harmonic-oscillator' );
    
    // images
    var squareImage = require( 'image!QUANTUM_BOUND_STATES/SquareIcon.png' );
    var asymImage = require( 'image!QUANTUM_BOUND_STATES/AsymIcon.png' );
    var coulombImage = require( 'image!QUANTUM_BOUND_STATES/CoulombIcon.png' );
    var harmonicImage = require( 'image!QUANTUM_BOUND_STATES/HarmonicIcon.png' );
    
    var potentialNames = [squareString, asymString, coulomb1DString, coulomb3DString, harmonicString];
    var images = [squareImage, asymImage, coulombImage, coulombImage, harmonicImage];
    
    function createItem( i ) {
      var name = potentialNames[i];
      var node = new Node();
      var text = new Text( name, {font: new PhetFont(12) });
      var icon = new Image( images[i], {left: text.right + 7, top: text.top, scale: 0.2});
      node.addChild( text );
      node.addChild( icon );
      return ComboBox.createItem( node, i );
    }
    
    // items
    var items = [];
    for ( var i = 0; i < potentials.length; i++ ) {
      items[ i ] = createItem( i );
    }
    
    ComboBox.call( this, items, potentialTypeProperty, parent, {
      listPosition: 'below',
      itemYMargin: 3,
      itemXMargin: 0,
      itemHighlightFill: 'rgb(218,255,255)'
    } );
  }

  return inherit( ComboBox, PotentialComboBox);
} );