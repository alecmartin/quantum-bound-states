// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constructor for the arrow that controls a property of a potential well
 */
define( function( require ){
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RewindButton = require( 'SCENERY_PHET/buttons/RewindButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var normalString = require( 'string!QUANTUM_BOUND_STATES/normal' );
  var fastForwardString = require( 'string!QUANTUM_BOUND_STATES/fast-forward' );
  var femtoSecondString = require( 'string!QUANTUM_BOUND_STATES/fs' );
  
  /**
  * @param {QuantumBoundStatesModel} model
  * @constructor
  */
  function TimeControls( model, options ){
    var dilateX = 5;
    var dilateY = 2;
    var radioButtonRadius = 7.1;
    var timeProperty = model.timeProperty;
    var runningProperty = model.runningProperty;
    var speedProperty = model.speedProperty;
    var buttonOptions = { font: new PhetFont( 16 ), fill: 'white' };
    
    var fastForwardButton = new AquaRadioButton( speedProperty, 'fast', new Text( fastForwardString, buttonOptions ), {
      radius: radioButtonRadius,
    } );
    var normalButton = new AquaRadioButton( speedProperty, 'normal', new Text( normalString, buttonOptions ), {
      radius: radioButtonRadius,
      x: 130,
    } );
    fastForwardButton.touchArea = fastForwardButton.localBounds.dilatedXY( dilateX, dilateY );
    normalButton.touchArea = normalButton.localBounds.dilatedXY( dilateX, dilateY );
    var buttonVBox = new VBox( {
      align: 'left',
      spacing: 6,
      children: [
        normalButton,
        fastForwardButton
      ]
    } );
    
    var playPauseButton = new PlayPauseButton( runningProperty, { togetherID: 'playPauseButton' } ).mutate( { scale: 0.7 } );

    // Make the Play/Pause button bigger when it is showing the pause button
    var pauseSizeIncreaseFactor = 0.75;
    runningProperty.lazyLink( function( isPlaying ) {
      playPauseButton.scale( isPlaying ? ( 1 / pauseSizeIncreaseFactor ) : pauseSizeIncreaseFactor );
    } );

    var stepButton = new StepButton( function() { model.stepManual(); }, runningProperty );

    // Make the step button slightly smaller than the pause button.
    stepButton.mutate( { scale: ( playPauseButton.height / stepButton.height ) * 0.9 } );
    runningProperty.link( function() {
      stepButton.enabled = !runningProperty.value;
    } );
    
    var rewindButton = new RewindButton( function() { model.resetTime(); }, runningProperty );
    rewindButton.mutate( { scale: stepButton.height / rewindButton.height } );
    
    var textBox = new Rectangle( 0, rewindButton.top + 5, 100, rewindButton.height - 5, 0, 0, { fill: 'white' } );
    var timeString = timeProperty.value.toFixed( 1 ) + " " + femtoSecondString;
    var right = textBox.right - 5;
    var timeText = new Text( timeString, {
      font: new PhetFont( 16 ),
      right: right,
      centerY: textBox.centerY
    } );
    textBox.addChild( timeText );
    timeProperty.link( function() {
      timeText.text = timeProperty.value.toFixed( 1 ) + " " + femtoSecondString;
      timeText.right = right;
    } );
    
    options = _.extend( {
      spacing: 4,
      children: [
        buttonVBox,
        new HStrut( 25 ),
        rewindButton,
        new HStrut( 7 ),
        playPauseButton,
        new HStrut( 7 ),
        stepButton,
        new HStrut( 25 ),
        textBox
      ]
    }, options );
    HBox.call( this, options );
  }
  
  return inherit( HBox, TimeControls );
} );
