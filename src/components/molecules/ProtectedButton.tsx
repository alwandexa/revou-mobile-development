import {FunctionComponent} from "react";

import Button, {ButtonProps} from "./Button";
import {WithAuthInteraction} from "@contexts/AuthContext";

const ProtectedButton: FunctionComponent<ButtonProps> =
  WithAuthInteraction(Button);

export default ProtectedButton;
