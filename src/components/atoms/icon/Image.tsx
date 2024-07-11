import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Image = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M7.938 6.688a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75ZM19.465 3.25h-15C3.12 3.25 2 4.37 2 5.75v12.5c0 1.38 1.12 2.5 2.465 2.5h15a2.5 2.5 0 0 0 2.5-2.5V5.75c0-1.38-1.086-2.5-2.5-2.5Zm.625 14.738-5.344-7.261c-.097-.18-.32-.29-.558-.29a.736.736 0 0 0-.594.289L9.43 16.355l-1.45-1.801a.74.74 0 0 0-.576-.266.741.741 0 0 0-.577.266l-2.95 3.664s0 .002 0 0L3.875 5.75c0-.345.28-.625.625-.625h15c.345 0 .625.28.625.625v12.238h-.035Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 2h20v20H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Image;
