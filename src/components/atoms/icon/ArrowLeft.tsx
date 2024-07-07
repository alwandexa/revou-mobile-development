import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const ArrowLeft = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#BABABD"
        d="m13.496 20.444-.99.991c-.42.42-1.099.42-1.514 0L2.315 12.76a1.067 1.067 0 0 1 0-1.514l8.677-8.68c.42-.42 1.098-.42 1.513 0l.991.991a1.073 1.073 0 0 1-.017 1.532l-5.38 5.126h12.83c.593 0 1.071.478 1.071 1.072v1.428c0 .594-.478 1.072-1.071 1.072H8.099l5.38 5.126c.437.416.446 1.108.018 1.532Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 2.25h20v19.5H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrowLeft;
