import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Comment = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M12 3.25c-5.523 0-10 3.637-10 8.125 0 1.938.836 3.71 2.227 5.105-.489 1.97-2.122 3.723-2.141 3.743a.31.31 0 0 0-.059.34c.051.117.16.187.285.187 2.59 0 4.532-1.242 5.493-2.008 1.277.48 2.695.758 4.195.758 5.523 0 10-3.637 10-8.125 0-4.488-4.477-8.125-10-8.125Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 3.25h20v17.5H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Comment;
