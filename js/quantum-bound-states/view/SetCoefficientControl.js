// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for a set of controls for manipulating one
 * eigenstate coefficient. The value of the coefficient
 * can be between 0 and 1.
 */

 define( function( require ) {
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var Property = require( 'AXON/Property' );

  var SetCoefficientControl = function( coefficient, index ) { 

    var C_INC = 0.10; // Coefficient increment constant

    HBox.call( this, _.extend( { } ) );
    // this.options = _.extend( { }, options );
    this.index = index;
    this.coefficientProperty = new Property ( coefficient );

    // Labels and text
    var whiteFont = { font: new PhetFont( 14 ), fill: 'white' };
    var blackFont = { font: new PhetFont( 14 ), fill: 'black' };

    var cLabelString = 'c<sub>' + this.index.toString() + '</sub>:';
    var cValueString = this.coefficientProperty.get( ).toFixed(2);

    this.cLabelText = new SubSupText( cLabelString, blackFont );
    this.cValueText = new Text( cValueString, whiteFont );


    // Arrow Buttons
    this.decArrow = new ArrowButton( 'left', function( ) {
      this.coefficientProperty.set( this.coefficientProperty.get( ) - C_INC );
      this.coefficientProperty.get( ) == 0.0 ? this.rectFill = 'white' : this.rectF;
      this.rect.fill = this.rectFill;
      this.coefficientProperty.get( ) == 0.0 ? this.decArrow.enabled = false : this.decArrow.enabled = true;
      this.coefficientProperty.get( ) == 1.0 ? this.incArrow.enabled = false : this.incArrow.enabled = true;
    }, {
      arrowHeight: 20,
      arrowWidth: 20 * Math.sqrt( 3 ) / 2
    });
    this.incArrow = new ArrowButton( 'right', function( ) {
      this.coefficientProperty.set( this.coefficientProperty.get( ) + C_INC );
      this.coefficientProperty.get( ) == 0.0 ? this.rectFill = 'white' : this.rectFill = 'red';
      this.rect.fill = this.rectFill;
      this.coefficientProperty.get( ) == 0.0 ? this.decArrow.enabled = false : this.decArrow.enabled = true;
      this.coefficientProperty.get( ) == 1.0 ? this.incArrow.enabled = false : this.incArrow.enabled = true;
    }, {
      arrowHeight: 20,
      arrowWidth: 20 * Math.sqrt( 3 ) / 2
    });

    this.coefficientProperty.get( ) == 0.0 ? this.rectFill = 'white' : this.rectFill = 'red';
    this.rect = new Rectangle( 0, 0, 90, 22, 5, 5, {
      stroke: 'black',
      fill: this.rectFill,
      lineWidth: 1,
    } );

    this.displayNode = new Node(  );
    this.displayNode.addChild( this.rect );
    this.displayNode.addChild( this.cValueText );


    this.addChild( this.cLabelText );
    this.addChild( this.decArrow );
    this.addChild( this.displayNode );
    this.addChild( this.incArrow )




    return inherit( Node, SetCoefficientControl, {
      setIndex: function( index ) {
        this.index = index;
        var cLabelString = 'c<sub>' + this.index.toString() + '</sub>:';
        this.cLabelText.text = cLabelString;
      },
      setCoefficient: function( coefficient ) {
        this.coefficientProperty.set( coefficient );
        var cValueString = this.coefficientProperty.get( ).toFixed(2);
        this.coefficientProperty.get( ) == 0.0 ? this.rectFill = 'white' : this.rectFill = 'red';
        this.rect.fill = this.rectFill;
        this.coefficientProperty.get( ) == 0.0 ? this.decArrow.enabled = false : this.decArrow.enabled = true;
        this.coefficientProperty.get( ) == 1.0 ? this.incArrow.enabled = false : this.incArrow.enabled = true;
      }
    } );
  };
 } );