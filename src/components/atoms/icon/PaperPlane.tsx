import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const PaperPlane = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M21.604 12.001a1.042 1.042 0 0 0-.615-.95L4.065 3.421l-.003-.003a1.042 1.042 0 0 0-1.355 1.417l.009.017 2.414 6.013a.695.695 0 0 0 .587.367l13.065.46a.307.307 0 1 1 0 .615l-13.062.457a.694.694 0 0 0-.587.367l-2.416 6.017a1.02 1.02 0 0 0 .137 1.17l.03.03a1.07 1.07 0 0 0 1.18.23l16.92-7.627a1.042 1.042 0 0 0 .62-.95Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 3.11h20v17.778H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PaperPlane;
