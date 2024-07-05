import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Eye = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M21.88 11.493C19.995 7.817 16.267 5.33 12 5.33c-4.268 0-7.997 2.489-9.88 6.163a1.124 1.124 0 0 0 0 1.014C4.005 16.183 7.733 18.67 12 18.67c4.268 0 7.997-2.489 9.88-6.163a1.125 1.125 0 0 0 0-1.014ZM12 17.003a4.998 4.998 0 0 1-4.62-3.089 5.005 5.005 0 0 1 3.644-6.82A4.998 4.998 0 0 1 17 12a5.004 5.004 0 0 1-3.086 4.622 4.996 4.996 0 0 1-1.914.38Zm0-8.338a3.308 3.308 0 0 0-.879.132 1.663 1.663 0 0 1-2.323 2.324 3.329 3.329 0 0 0 3.315 4.197 3.325 3.325 0 0 0 3.043-4.398A3.327 3.327 0 0 0 12 8.665Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 5.33h20v13.34H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Eye;
