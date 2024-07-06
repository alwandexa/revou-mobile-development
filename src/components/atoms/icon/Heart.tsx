import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const Heart = ({width, height, fill = "none"}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20">
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M16.947 3.957c-1.712-1.46-4.259-1.197-5.83.425l-.617.635-.615-.635C8.316 2.76 5.766 2.498 4.054 3.957c-1.963 1.675-2.066 4.682-.31 6.497l6.047 6.244a.98.98 0 0 0 1.416 0l6.047-6.244c1.76-1.815 1.656-4.822-.307-6.497Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2.5 3h16v14h-16z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Heart;
