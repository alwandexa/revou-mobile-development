import * as React from 'react';

import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const Person = ({width, height, fill = 'none'}: SvgProps) => (
  <Svg width={width} height={height} fill={fill} viewBox="0 0 32 32">
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M16 16a7 7 0 0 0 7-7 7 7 0 0 0-7-7 7 7 0 0 0-7 7 7 7 0 0 0 7 7Zm4.9 1.75h-.913a9.53 9.53 0 0 1-3.987.875 9.549 9.549 0 0 1-3.987-.875H11.1a7.352 7.352 0 0 0-7.35 7.35v2.275A2.626 2.626 0 0 0 6.375 30h19.25a2.626 2.626 0 0 0 2.625-2.625V25.1a7.352 7.352 0 0 0-7.35-7.35Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M3.75 2h24.5v28H3.75z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Person;
