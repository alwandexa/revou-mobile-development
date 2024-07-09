import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Person = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm3.5 1.25h-.652a6.808 6.808 0 0 1-5.696 0H8.5a5.251 5.251 0 0 0-5.25 5.25v1.625C3.25 21.16 4.09 22 5.125 22h13.75c1.035 0 1.875-.84 1.875-1.875V18.5a5.251 5.251 0 0 0-5.25-5.25Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M3.25 2h17.5v20H3.25z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Person;
