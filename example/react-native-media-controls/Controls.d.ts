/// <reference types="react" />
import { Props } from "./MediaControls";
declare type ControlsProps = Pick<Props, "isLoading" | "playerState" | "onReplay" | "duration" | "progress" | "onSeek" | "live"> & {
    onPause: () => void;
};
declare const Controls: (props: ControlsProps) => JSX.Element;
export { Controls };
