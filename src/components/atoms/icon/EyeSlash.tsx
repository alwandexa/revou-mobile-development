import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const EyeSlash = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M12 16.5c-2.37 0-4.29-1.835-4.466-4.16L4.256 9.807c-.43.54-.827 1.112-1.147 1.737a1.011 1.011 0 0 0 0 .912C4.803 15.763 8.159 18 11.999 18a9.71 9.71 0 0 0 2.435-.327l-1.622-1.254c-.267.051-.54.078-.812.081Zm9.807 1.816-3.455-2.67a10.351 10.351 0 0 0 2.54-3.19 1.01 1.01 0 0 0 0-.912C19.195 8.237 15.841 6 12 6a9.63 9.63 0 0 0-4.604 1.178L3.421 4.105a.5.5 0 0 0-.702.088l-.614.79a.5.5 0 0 0 .088.701l18.386 14.21a.498.498 0 0 0 .702-.087l.614-.79a.5.5 0 0 0-.088-.701Zm-5.741-4.438-1.229-.95a2.961 2.961 0 0 0-3.628-3.81c.188.256.29.565.29.882-.004.106-.02.21-.047.313l-2.3-1.778A4.447 4.447 0 0 1 12 7.5a4.498 4.498 0 0 1 4.5 4.5c0 .676-.165 1.306-.434 1.879Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 4h20v16H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EyeSlash;
