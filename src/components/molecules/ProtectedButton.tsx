import {FunctionComponent} from "react";
import withAuthInteraction from "../hoc/withAuthInteraction";
import Button, {ButtonProps} from "./Button";

const ProtectedButton: FunctionComponent<ButtonProps> =
  withAuthInteraction(Button);

export default ProtectedButton;
