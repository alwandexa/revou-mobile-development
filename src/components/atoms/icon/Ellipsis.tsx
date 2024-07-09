import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Ellipsis = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M12 9.097A2.9 2.9 0 0 1 14.9 12a2.9 2.9 0 1 1-5.8 0A2.9 2.9 0 0 1 12 9.097ZM9.1 4.903a2.9 2.9 0 1 0 5.8 0 2.9 2.9 0 1 0-5.8 0Zm0 14.194a2.9 2.9 0 1 0 5.8 0 2.9 2.9 0 1 0-5.8 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M9.1 2h5.8v20H9.1z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Ellipsis;
