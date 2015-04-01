// Copyright 2002-2015, University of Colorado Boulder
define( function( require ){
	
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  
  var mouse = require( 'SCENERY/input/Mouse' );

  /**
  * @param {QuantumBoundStatesModel} model
  * @param {number} width
  * @param {number} height
  * @constructor
  */
  function EnergyLine( model, width, height, options ){

    var energyline = new Line();
	  
    // var topline = new Line(x1, y1, width, y2, {stroke:'green', lineWidth: 3});
    // var midline1 = new Line(x1, y1+30, width, y2+30, {stroke:'green', lineWidth: 3});
    // var midline2 = new Line(x1, y1+60, width, y2+60, {stroke:'green', lineWidth: 3});
    // var midline3 = new Line(x1, y1+90, width, y2+90, {stroke:'green', lineWidth: 3});    
    // var bottomline = new Line(x1, y1+100, width, y2+100, {stroke:'red', lineWidth: 3});

  }
  return inherit( Line, EnergyLine );

  });