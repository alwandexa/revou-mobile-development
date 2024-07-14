import {FunctionComponent} from "react";
import WithAuthInteraction from "../hoc/WithAuthInteraction";
import Button, {ButtonProps} from "./Button";

const ProtectedButton: FunctionComponent<ButtonProps> =
  WithAuthInteraction(Button);

export default ProtectedButton;
