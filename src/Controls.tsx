import React from "react";
import { TouchableOpacity, View, ActivityIndicator, Image } from "react-native";
import styles from "./MediaControls.style";
import { getPlayerStateIcon } from "./utils";
import { Props } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

const rewindIcon = require("./assets/ic_rw.png");
const fastforwardIcon = require("./assets/ic_ff.png");

type ControlsProps = Pick<
  Props,
  | "isLoading"
  | "playerState"
  | "onReplay"
  | "duration"
  | "progress"
  | "onSeek"
  | "streamType"
> & {
  onPause: () => void;
};

const Controls = (props: ControlsProps) => {
  const {
    isLoading,
    playerState,
    onReplay,
    onPause,
    duration,
    progress,
    onSeek,
    streamType,
  } = props;
  const icon = getPlayerStateIcon(playerState);
  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
  const ffTenSeconds = () => {
    const availableDuration = duration - progress;
    if (availableDuration < 10) {
      onSeek(progress + availableDuration);
    } else {
      onSeek(progress + 10);
    }
  };
  const rwTenSeconds = () => {
    onSeek(progress < 10 ? progress - progress : progress - 10);
  };

  const content = isLoading ? (
    <ActivityIndicator size="large" color="#FFF" />
  ) : (
    <>
      {streamType === "onDemand" && playerState !== PLAYER_STATES.ENDED && (
        <TouchableOpacity
          style={[styles.playButton]}
          onPress={rwTenSeconds}
          accessibilityLabel={"Rewind 10 seconds"}
          accessibilityHint={"Rewinds the video 10 seconds"}
        >
          <Image source={rewindIcon} style={styles.playIcon} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.playButton]}
        onPress={pressAction}
        accessibilityLabel={
          PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause"
        }
        accessibilityHint={"Plays and Pauses the Video"}
      >
        <Image source={icon} style={styles.playIcon} />
      </TouchableOpacity>
      {streamType === "onDemand" && playerState !== PLAYER_STATES.ENDED && (
        <TouchableOpacity
          style={[styles.playButton]}
          onPress={ffTenSeconds}
          accessibilityLabel={"Fast-forward 10 seconds"}
          accessibilityHint={"Fast-forwards the video 10 seconds"}
        >
          <Image source={fastforwardIcon} style={styles.playIcon} />
        </TouchableOpacity>
      )}
    </>
  );

  return <View style={[styles.controlsRow]}>{content}</View>;
};

export { Controls };
