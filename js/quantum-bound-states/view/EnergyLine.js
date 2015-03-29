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
	  
    var x1 = 0;
    var y1 = 20;
    var y2 = 20;
    Line.call(this, options);
    
    var topline = new Line(x1, y1, width, y2, {stroke:'green', lineWidth: 3});
    var midline1 = new Line(x1, y1+30, width, y2+30, {stroke:'green', lineWidth: 3});
    var midline2 = new Line(x1, y1+60, width, y2+60, {stroke:'green', lineWidth: 3});
    var midline3 = new Line(x1, y1+90, width, y2+90, {stroke:'green', lineWidth: 3});    
    var bottomline = new Line(x1, y1+100, width, y2+100, {stroke:'red', lineWidth: 3});

    this.addChild(topline);
    this.addChild(midline1);
    this.addChild(midline2);
    this.addChild(midline3);
    this.addChild(bottomline);
  
   //  while(mouse.over(width, this)){
	  // var line = new Line(x1, y1, width, y2, {fill:'red'});
	  // this.addChild(line);
	 
	  // var texts = new Text( positionString, {
   //    font: new PhetFont( 9 ),
   //    fill: 'red',
   //    });
   //    this.addChild( texts );
   //  }
  
  
  }
  return inherit( Line, EnergyLine );

  });
