import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const PaperClip = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M4.94 20.209c-2.283-2.355-2.24-6.153.053-8.5l8.194-8.38a4.371 4.371 0 0 1 6.276 0 4.547 4.547 0 0 1 0 6.338l-7.142 7.299a2.915 2.915 0 0 1-4.218-.039c-1.105-1.17-1.07-3.026.057-4.178l5.614-5.736a.625.625 0 0 1 .884-.009l.893.874c.247.242.251.637.01.884l-5.615 5.735c-.192.197-.204.525-.025.715.17.18.44.184.613.006l7.142-7.299a2.046 2.046 0 0 0 0-2.843 1.874 1.874 0 0 0-2.701 0l-8.194 8.38c-1.358 1.39-1.379 3.638-.047 5.013a3.331 3.331 0 0 0 4.807.011l6.721-6.875a.625.625 0 0 1 .884-.01l.894.874a.625.625 0 0 1 .01.884l-6.721 6.875a5.828 5.828 0 0 1-8.39-.02Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 2h20v20H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PaperClip;
