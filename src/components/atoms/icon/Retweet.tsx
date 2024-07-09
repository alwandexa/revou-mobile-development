import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";

const Retweet = ({width, height, fill, ...props}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={fill}
      d="M11.444 17.445a1.11 1.11 0 1 0 0-2.223h-3.89a1.11 1.11 0 0 1-1.11-1.11V9.666h1.11a1.115 1.115 0 0 0 .789-1.9L6.121 5.545a1.113 1.113 0 0 0-1.573 0L2.326 7.767c-.32.32-.414.796-.24 1.212.174.417.576.688 1.028.688h1.11v4.444a3.334 3.334 0 0 0 3.334 3.334h3.886Zm1.11-11.112a1.11 1.11 0 1 0 0 2.223h3.89a1.11 1.11 0 0 1 1.11 1.11v4.445h-1.11a1.115 1.115 0 0 0-.788 1.9l2.222 2.222a1.113 1.113 0 0 0 1.573 0l2.222-2.223a1.112 1.112 0 0 0-.788-1.9h-1.112V9.668a3.334 3.334 0 0 0-3.333-3.334h-3.885Z"
    />
  </Svg>
);

export default Retweet;
