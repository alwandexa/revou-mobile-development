import * as React from "react";
import Svg, {SvgProps, G, Path, Defs, ClipPath} from "react-native-svg";

const House = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M21.993 11.983c0 .615-.52 1.097-1.111 1.097H19.77l.024 5.472c0 .096-.007.185-.017.277v.554c0 .755-.622 1.367-1.39 1.367h-.555c-.038 0-.076-.03-.114-.003-.049-.028-.098.003-.146.003H15.61a1.378 1.378 0 0 1-1.389-1.367v-3.008c0-.605-.496-1.094-1.11-1.094h-2.223c-.615 0-1.111.489-1.111 1.094v3.008c0 .755-.622 1.367-1.39 1.367h-1.94c-.052 0-.104-.003-.156-.007a1.54 1.54 0 0 1-.125.007H5.61a1.378 1.378 0 0 1-1.389-1.367v-3.828c0-.031.001-.065.003-.096V13.08H3.113A1.092 1.092 0 0 1 2 11.983c0-.308.104-.581.348-.82l8.902-7.639c.243-.24.52-.274.764-.274.243 0 .52.068.732.24l8.865 7.673c.278.239.42.512.382.82Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 3.25h20v17.5H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default House;
