import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Image, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import RNSlider from 'react-native-slider';

var white = "#fff";
var styles = /*#__PURE__*/StyleSheet.create({
  container: {
    alignItems: "center",
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: "absolute",
    right: 0,
    top: 0
  },
  controlsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "space-evenly"
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    paddingLeft: 20,
    marginBottom: 10
  },
  playButton: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    width: 50
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22
  },
  progressColumnContainer: {
    flex: 1
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  progressSlider: {
    alignSelf: "stretch"
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25
  },
  thumb: {
    backgroundColor: "#f80e37",
    borderRadius: 50,
    borderWidth: 3,
    height: 20,
    width: 20
  },
  timeRow: {
    alignSelf: "stretch"
  },
  timerLabel: {
    color: white,
    fontSize: 12
  },
  timerLabelsContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -7
  },
  toolbar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  },
  toolbarRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  track: {
    borderRadius: 1,
    height: 5
  }
});

var PLAYER_STATES;

(function (PLAYER_STATES) {
  PLAYER_STATES[PLAYER_STATES["PLAYING"] = 0] = "PLAYING";
  PLAYER_STATES[PLAYER_STATES["PAUSED"] = 1] = "PAUSED";
  PLAYER_STATES[PLAYER_STATES["ENDED"] = 2] = "ENDED";
})(PLAYER_STATES || (PLAYER_STATES = {}));

var humanizeVideoDuration = function humanizeVideoDuration(seconds) {
  var _ref = seconds >= 3600 ? [11, 8] : [14, 5],
      begin = _ref[0],
      end = _ref[1];

  var date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};
var getPlayerStateIcon = function getPlayerStateIcon(playerState) {
  switch (playerState) {
    case PLAYER_STATES.PAUSED:
      return require("./assets/ic_play.png");

    case PLAYER_STATES.PLAYING:
      return require("./assets/ic_pause.png");

    case PLAYER_STATES.ENDED:
      return require("./assets/ic_replay.png");

    default:
      return null;
  }
};

var rewindIcon = /*#__PURE__*/require("./assets/ic_rw.png");

var fastforwardIcon = /*#__PURE__*/require("./assets/ic_ff.png");

var Controls = function Controls(props) {
  var isLoading = props.isLoading,
      playerState = props.playerState,
      onReplay = props.onReplay,
      onPause = props.onPause,
      duration = props.duration,
      progress = props.progress,
      onSeek = props.onSeek,
      live = props.live;
  var icon = getPlayerStateIcon(playerState);
  var pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;

  var ffTenSeconds = function ffTenSeconds() {
    var availableDuration = duration - progress;

    if (availableDuration < 10) {
      onSeek(availableDuration);
    } else {
      onSeek(progress + 10);
    }
  };

  var rwTenSeconds = function rwTenSeconds() {
    onSeek(progress < 10 ? progress : 10);
  };

  var content = isLoading ? React.createElement(ActivityIndicator, {
    size: "large",
    color: "#FFF"
  }) : React.createElement(React.Fragment, null, !live && React.createElement(TouchableOpacity, {
    style: [styles.playButton],
    onPress: rwTenSeconds,
    accessibilityLabel: "Rewind 10 seconds",
    accessibilityHint: "Rewinds the video 10 seconds"
  }, React.createElement(Image, {
    source: rewindIcon,
    style: styles.playIcon
  })), React.createElement(TouchableOpacity, {
    style: [styles.playButton],
    onPress: pressAction,
    accessibilityLabel: PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause",
    accessibilityHint: "Plays and Pauses the Video"
  }, React.createElement(Image, {
    source: icon,
    style: styles.playIcon
  })), !live && React.createElement(TouchableOpacity, {
    style: [styles.playButton],
    onPress: ffTenSeconds,
    accessibilityLabel: "Fast-forward 10 seconds",
    accessibilityHint: "Fast-forwards the video 10 seconds"
  }, React.createElement(Image, {
    source: fastforwardIcon,
    style: styles.playIcon
  })));
  return React.createElement(View, {
    style: [styles.controlsRow]
  }, content);
};

var fullScreenImage = /*#__PURE__*/require("./assets/ic_fullscreen.png");

var Slider = function Slider(props) {
  var customSliderStyle = props.customSliderStyle,
      duration = props.duration,
      mainColor = props.mainColor,
      onFullScreen = props.onFullScreen,
      onPause = props.onPause,
      progress = props.progress,
      live = props.live;
  var containerStyle = (customSliderStyle === null || customSliderStyle === void 0 ? void 0 : customSliderStyle.containerStyle) || {};
  var customTrackStyle = (customSliderStyle === null || customSliderStyle === void 0 ? void 0 : customSliderStyle.trackStyle) || {};
  var customThumbStyle = (customSliderStyle === null || customSliderStyle === void 0 ? void 0 : customSliderStyle.thumbStyle) || {};

  var dragging = function dragging(value) {
    var onSeeking = props.onSeeking,
        playerState = props.playerState;
    onSeeking(value);

    if (playerState === PLAYER_STATES.PAUSED) {
      return;
    }

    onPause();
  };

  var seekVideo = function seekVideo(value) {
    props.onSeek(value);
    onPause();
  };

  console.log('duration', duration, humanizeVideoDuration(duration));
  console.log('progress', progress, humanizeVideoDuration(progress));
  return React.createElement(View, {
    style: [styles.controlsRow, styles.progressContainer, containerStyle]
  }, React.createElement(View, {
    style: styles.progressColumnContainer
  }, React.createElement(View, {
    style: [styles.timerLabelsContainer]
  }, React.createElement(Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(progress)), React.createElement(Text, {
    style: styles.timerLabel
  }, !live ? humanizeVideoDuration(duration) : 'Live')), React.createElement(RNSlider, {
    style: [styles.progressSlider],
    onValueChange: dragging,
    onSlidingComplete: seekVideo,
    maximumValue: Math.floor(duration),
    value: Math.floor(progress),
    trackStyle: [styles.track, customTrackStyle],
    thumbStyle: [styles.thumb, customThumbStyle, {
      borderColor: mainColor
    }],
    minimumTrackTintColor: mainColor
  })), Boolean(onFullScreen) && React.createElement(TouchableOpacity, {
    style: styles.fullScreenContainer,
    onPress: onFullScreen
  }, React.createElement(Image, {
    source: fullScreenImage
  })));
};

var Toolbar = function Toolbar(_ref) {
  var children = _ref.children;
  return React.createElement(React.Fragment, null, children);
};

var MediaControls = function MediaControls(props) {
  var children = props.children,
      _props$containerStyle = props.containerStyle,
      customContainerStyle = _props$containerStyle === void 0 ? {} : _props$containerStyle,
      duration = props.duration,
      _props$fadeOutDelay = props.fadeOutDelay,
      fadeOutDelay = _props$fadeOutDelay === void 0 ? 5000 : _props$fadeOutDelay,
      _props$isLoading = props.isLoading,
      isLoading = _props$isLoading === void 0 ? false : _props$isLoading,
      _props$mainColor = props.mainColor,
      mainColor = _props$mainColor === void 0 ? "rgba(12, 83, 175, 0.9)" : _props$mainColor,
      onFullScreen = props.onFullScreen,
      onReplayCallback = props.onReplay,
      onSeek = props.onSeek,
      onSeeking = props.onSeeking,
      playerState = props.playerState,
      progress = props.progress,
      _props$showOnStart = props.showOnStart,
      showOnStart = _props$showOnStart === void 0 ? true : _props$showOnStart,
      sliderStyle = props.sliderStyle,
      _props$toolbarStyle = props.toolbarStyle,
      customToolbarStyle = _props$toolbarStyle === void 0 ? {} : _props$toolbarStyle,
      _props$live = props.live,
      live = _props$live === void 0 ? false : _props$live;

  var _ref = function () {
    if (showOnStart) {
      return {
        initialOpacity: 1,
        initialIsVisible: true
      };
    }

    return {
      initialOpacity: 0,
      initialIsVisible: false
    };
  }(),
      initialOpacity = _ref.initialOpacity,
      initialIsVisible = _ref.initialIsVisible;

  var _useState = useState(new Animated.Value(initialOpacity)),
      opacity = _useState[0];

  var _useState2 = useState(initialIsVisible),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var fadeOutControls = function fadeOutControls(delay) {
    if (delay === void 0) {
      delay = 0;
    }

    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay: delay,
      useNativeDriver: false
    }).start(function (result) {
      /* I noticed that the callback is called twice, when it is invoked and when it completely finished
      This prevents some flickering */
      if (result.finished) {
        setIsVisible(false);
      }
    });
  };

  useEffect(function () {
    if (!isLoading) {
      fadeOutControls(fadeOutDelay);
    }
  }, [isLoading]);

  var fadeInControls = function fadeInControls(loop) {
    if (loop === void 0) {
      loop = true;
    }

    setIsVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
      useNativeDriver: false
    }).start(function () {
      if (loop) {
        fadeOutControls(fadeOutDelay);
      }
    });
  };

  var onReplay = function onReplay() {
    fadeOutControls(fadeOutDelay);
    onReplayCallback();
  };

  var cancelAnimation = function cancelAnimation() {
    return opacity.stopAnimation(function () {
      return setIsVisible(true);
    });
  };

  var onPause = function onPause() {
    var playerState = props.playerState,
        onPaused = props.onPaused;
    var PLAYING = PLAYER_STATES.PLAYING,
        PAUSED = PLAYER_STATES.PAUSED;

    switch (playerState) {
      case PLAYING:
        {
          cancelAnimation();
          break;
        }

      case PAUSED:
        {
          fadeOutControls(fadeOutDelay);
          break;
        }
    }

    var newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };

  var toggleControls = function toggleControls() {
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    opacity.stopAnimation(function (value) {
      setIsVisible(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };

  return React.createElement(TouchableWithoutFeedback, {
    accessible: false,
    onPress: toggleControls
  }, React.createElement(Animated.View, {
    style: [styles.container, {
      opacity: opacity
    }]
  }, isVisible && React.createElement(View, {
    style: [styles.container, customContainerStyle]
  }, React.createElement(View, {
    style: [styles.controlsRow, styles.toolbarRow, customToolbarStyle]
  }, children), React.createElement(Controls, {
    onPause: onPause,
    onReplay: onReplay,
    isLoading: isLoading,
    playerState: playerState,
    progress: progress,
    duration: duration,
    live: live,
    onSeek: onSeek
  }), React.createElement(Slider, {
    progress: progress,
    duration: duration,
    mainColor: mainColor,
    onFullScreen: onFullScreen,
    playerState: playerState,
    onSeek: onSeek,
    onSeeking: onSeeking,
    onPause: onPause,
    customSliderStyle: sliderStyle,
    live: live
  }))));
};

MediaControls.Toolbar = Toolbar;

export default MediaControls;
export { PLAYER_STATES };
//# sourceMappingURL=react-native-media-controls.esm.js.map
