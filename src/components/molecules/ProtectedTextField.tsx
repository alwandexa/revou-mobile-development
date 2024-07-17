import {WithAuthInteraction} from "@contexts/AuthContext";
import {TextField} from ".";

const ProtectedTextField = WithAuthInteraction(TextField);

export default ProtectedTextField;
