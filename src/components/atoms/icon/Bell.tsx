import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Bell = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M12 22a2.5 2.5 0 0 0 2.499-2.5H9.5A2.5 2.5 0 0 0 12 22Zm8.414-5.848c-.755-.811-2.167-2.03-2.167-6.027 0-3.035-2.128-5.465-4.998-6.06V3.25a1.25 1.25 0 1 0-2.498 0v.814c-2.87.596-4.998 3.026-4.998 6.061 0 3.996-1.412 5.216-2.167 6.027A1.22 1.22 0 0 0 3.25 17c.004.64.507 1.25 1.254 1.25h14.992c.747 0 1.25-.61 1.254-1.25a1.22 1.22 0 0 0-.336-.848Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M3.25 2h17.5v20H3.25z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Bell;
