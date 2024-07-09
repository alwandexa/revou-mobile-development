import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Plus = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M20.571 9.857h-6.428V3.43c0-.79-.64-1.429-1.429-1.429h-1.428c-.79 0-1.429.64-1.429 1.429v6.428H3.43c-.79 0-1.429.64-1.429 1.429v1.428c0 .79.64 1.429 1.429 1.429h6.428v6.428c0 .79.64 1.429 1.429 1.429h1.428c.79 0 1.429-.64 1.429-1.429v-6.428h6.428c.79 0 1.429-.64 1.429-1.429v-1.428c0-.79-.64-1.429-1.429-1.429Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 2h20v20H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Plus;
