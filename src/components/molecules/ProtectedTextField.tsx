import {WithAuthInteraction} from "../../contexts/AuthContext";
import TextField from "./TextField";

const ProtectedTextField = WithAuthInteraction(TextField);

export default ProtectedTextField;
