import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const ChevronLeft = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#BABABD"
        d="m6.252 11.223 8.902-8.901a1.1 1.1 0 0 1 1.555 0l1.039 1.038c.428.429.429 1.123.002 1.553L10.694 12l7.055 7.087c.428.43.427 1.124-.002 1.553l-1.038 1.038a1.1 1.1 0 0 1-1.555 0l-8.902-8.901a1.1 1.1 0 0 1 0-1.554Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M5.93 2h12.14v20H5.93z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ChevronLeft;
