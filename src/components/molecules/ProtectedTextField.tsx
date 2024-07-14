import WithAuthInteraction from "../hoc/WithAuthInteraction";
import TextField from "./TextField";

const ProtectedTextField = WithAuthInteraction(TextField);

export default ProtectedTextField;
