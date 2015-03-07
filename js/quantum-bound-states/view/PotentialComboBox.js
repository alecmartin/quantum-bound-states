//  Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var ComboBox = require( 'SUN/ComboBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  function PotentialComboBox( model, parent, options ) {
    
    // strings
    var squareString = require( 'string!QUANTUM_BOUND_STATES/square' );
    var asymString = require( 'string!QUANTUM_BOUND_STATES/asymmetric' );
    var coulomb1DString = require( 'string!QUANTUM_BOUND_STATES/coulomb_1d' );
    var coulomb3DString = require( 'string!QUANTUM_BOUND_STATES/coulomb_3d' );
    var harmonicString = require( 'string!QUANTUM_BOUND_STATES/harmonic-oscillator' );
    
    // images
    var squareImage = require( 'image!QUANTUM_BOUND_STATES/SquareIcon.png' );
    
    var potentialNames = [squareString, asymString, coulomb1DString, coulomb3DString, harmonicString];
    
    // items
    var items = [];
    for ( var i = 0; i < model.potentials.length; i++ ) {
      var potential = model.potentials[ i ];
      items[ i ] = createItem( i, potential );
    }
    
    ComboBox.call( this, items, model.currentPotentialProperty, parent, {
      listPosition: 'below',
      itemYMargin: 12,
      itemHighlightFill: 'rgb(218,255,255)'
    } );
    
    function createItem( i, potential ) {
      var name = potentialNames[i];
      var node = new Node();
      var text = new Text( name, {font: new PhetFont(16) });
      var icon = new Image( squareImage, {left: text.right + 3});
      node.addChild( text );
      node.addChild( icon );
      return ComboBox.createItem( node, potential );
    }
  }

  return inherit( ComboBox, PotentialComboBox);
} );