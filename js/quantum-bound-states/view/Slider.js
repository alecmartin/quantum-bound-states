// Copyright 2002-2015, University of Colorado Boulder

/**
 * view for slider control
 * copied from phetsims wave-on-a-string

 * heavily edited by Samuel Volin
 * @author Anton Ulyanov (Mlearner)
 * @authot Samuel Volin (untra)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Range = require( 'DOT/Range' );
  var Property = require( 'AXON/Property' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var HSlider = require( 'SUN/HSlider' );
  
  function Slider( options ) {
    // console.log("slider init'd");
    var thisNode = this,
      defaultOptions = {
        type: 'simple',
        property: new Property( 0 ),
        range: new Range( 0, 100 ),
        sliderSize: new Dimension2( 200, 110 ),
        tick: { step: 1, minText: '', maxText: '', midTick: true },
        title: '',
        patternValueUnit: '',
        titleDivisor: 1.0,
        buttonStep: 1,
        rounding: false,
        trackLineWidth: 1.0,
        // custom track
        trackSize: new Dimension2( 140, 2 ),
        trackFill: 'black',
        // custom thumb
        thumbSize: new Dimension2( 22, 38 ),
        thumbFillEnabled: new Color( 'hsl(210,50%,63%)' ),
        thumbFillHighlighted: new Color( 'hsl(210,70%,73%)' ),
        // custom ticks
        tickLabelSpacing: 4,
        majorTickLength: 20,
        minorTickLength: 8,
        majorTickLineWidth: 1.5,
        minorTickLineWidth: 1.5,
        //tickcolors
        minorTickStroke: 'black',
        majorTickStroke: 'black',
        //custom font
        textFont: new PhetFont( 18 ),
        labelFont: new PhetFont( 15 ),
        textColor: 'black',
        labelColor: 'black',
        //arrowheight
        arrowHeight: 20,
        titleVerticalOffset: 0
      };
    Node.call( thisNode );
    // console.log("$!$!$!");
    options = _.extend( {}, defaultOptions, options );

    if ( !options.endDrag && options.rounding !== false ) {
      options.endDrag = function() {
        options.property.set( Math.round( options.property.get() * Math.pow( 10, options.rounding ) ) / Math.pow( 10, options.rounding ) );
      };
    }

    
    thisNode.addChild( new Rectangle( 0, 0, options.sliderSize.width, options.sliderSize.height ) );
    //if a title has been set, draw it
    if(options.title !== '') {
      this.addChild( new Text( options.title, {
        centerX: thisNode.width / 2,
        top: options.titleVerticalOffset,
        font: new PhetFont( 18 )
      } ) );
    }

    var buttonNode, plusButton, minusButton, valueLabel;
    var hSlider = new HSlider( options.property, options.range, options );
    var hSliderNode = new Node( {
      children: [ hSlider ],
      x: (thisNode.width - options.trackSize.width) / 2,
      bottom: thisNode.height - 0
    } );
    thisNode.addChild( hSliderNode );

    /*if ( options.tick && options.tick.step ) {
      var i = options.range.min;

      for ( ; i <= options.range.max; i += options.tick.step ) {
        i = Math.round( i * 1000 ) / 1000 ;
        if ( i === options.range.max ) {
          hSlider.addMajorTick( i, new Text( options.tick.maxText, { font: options.labelFont, fill: options.labelColor } ) );
        }
        else if ( i === options.range.min ) {
          hSlider.addMajorTick( i, new Text( options.tick.minText, { font: options.labelFont, fill: options.labelColor } ) );
        }
        else if ( i === (options.range.min + options.range.max) / 2 && options.tick.midtick) {
          hSlider.addMajorTick( i );
        }
        else {
          hSlider.addMinorTick( i );
        }
      }
    }*/
    hSlider.addMajorTick( options.range.min, new Text( options.tick.minText, {
      font: options.labelFont,
      fill: options.labelColor
    } ) );
    hSlider.addMajorTick( options.range.max, new Text( options.tick.maxText, {
      font: options.labelFont,
      fill: options.labelColor
    } ) );

    if ( options.type === 'button' ) {
      buttonNode = new Node( { y: 0 } );
      var buttonPropertyUpdate = function( value ) {
        return function() {
          options.property.set( Math.max( Math.min( options.property.get() + value, options.range.max ), options.range.min ) );
        };
      };
      buttonNode.addChild( plusButton = new ArrowButton( 'right', buttonPropertyUpdate( options.buttonStep ), {
        right: thisNode.width - 5,
        arrowHeight: options.arrowHeight,
        arrowWidth: options.arrowHeight * Math.sqrt( 3 ) / 2
      } ) );
      buttonNode.addChild( minusButton = new ArrowButton( 'left', buttonPropertyUpdate( -options.buttonStep ), { 
        left: 5,
        arrowHeight: options.arrowHeight,
        arrowWidth: options.arrowHeight * Math.sqrt( 3 ) / 2
      } ) );
      buttonNode.addChild( new Rectangle( 0, 0, 90, 22, 5, 5, {
        fill: '#FFF',
        stroke: '#000',
        lineWidth: 1,
        centerX: thisNode.width / 2,
        top: 0
      } ) );
      buttonNode.addChild( valueLabel = new Text( '0', {
        font: options.textFont,
        fill: options.textColor,
        centerX: options.width / 2,
        top: 5
      } ) );
      this.addChild( buttonNode );
    }

    thisNode.mutate( _.extend( _.omit( options, Object.keys( defaultOptions ) ), {
      x: options.sliderX
    } ) );

    options.property.link( function updateProperty( value ) {
      if ( options.type === 'button' ) {
        var text = value;
        text = ( options.property.get() / options.titleDivisor ).toFixed( options.rounding );
        valueLabel.text = text + " " + options.patternValueUnit;
        valueLabel.centerX = thisNode.width / 2;
        plusButton.enabled = ( value < options.range.max );
        minusButton.enabled = ( value > options.range.min );
      }
    } );
  }

  inherit( Node, Slider );

  return Slider;
} );