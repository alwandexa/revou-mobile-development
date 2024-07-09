import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const ArrowUp = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="m3.556 13.496-.991-.99a1.066 1.066 0 0 1 0-1.514l8.678-8.677c.42-.42 1.099-.42 1.514 0l8.678 8.673c.42.42.42 1.098 0 1.513l-.991.991a1.074 1.074 0 0 1-1.532-.018L13.789 8.1v12.829c0 .593-.478 1.071-1.072 1.071h-1.43a1.069 1.069 0 0 1-1.071-1.071V8.099l-5.128 5.38a1.066 1.066 0 0 1-1.532.018Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2.25 2h19.5v20H2.25z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrowUp;
