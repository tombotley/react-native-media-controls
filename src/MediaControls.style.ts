import { StyleSheet } from "react-native";

const white = "#fff";

export default StyleSheet.create({
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
    top: 0,
  },
  controlsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    paddingLeft: 20,
    marginBottom: 10,
  },
  playButton: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22,
  },
  progressColumnContainer: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  progressSlider: {
    alignSelf: "stretch",
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25,
  },
  thumb: {
    backgroundColor: "#f80e37",
    borderRadius: 50,
    borderWidth: 3,
    height: 20,
    width: 20,
  },
  timeRow: {
    alignSelf: "stretch",
  },
  timerLabel: {
    color: white,
    fontSize: 12,
  },
  timerLabelsContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -7,
  },
  toolbar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  toolbarRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  track: {
    borderRadius: 1,
    height: 5,
  },
});
