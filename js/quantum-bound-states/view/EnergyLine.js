define( function( require ){
	
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  
  var mouse = require( 'SCENERY/input/Mouse' );

  function EnergyLine( model, width, height, options ){
	  
    Line.call(this, options);
    var x1 = 0;
    var y1 = 0;
    var y2 = 0;
  
    var line = new Line(x1, y1, width, y2, {fill:'green'});
    this.addChild(line);
  
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
  });
