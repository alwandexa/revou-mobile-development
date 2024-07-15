import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const ArrowDown = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="m20.444 10.504.991.99c.42.42.42 1.099 0 1.514l-8.676 8.677c-.42.42-1.098.42-1.514 0l-8.68-8.677a1.067 1.067 0 0 1 0-1.513l.991-.991a1.073 1.073 0 0 1 1.532.017l5.126 5.38V3.07c0-.593.478-1.071 1.072-1.071h1.428c.594 0 1.072.478 1.072 1.071v12.83l5.126-5.38a1.065 1.065 0 0 1 1.532-.018Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2.25 2h19.5v20H2.25z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrowDown;
