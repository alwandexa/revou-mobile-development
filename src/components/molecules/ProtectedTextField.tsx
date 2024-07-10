import withAuthInteraction from "../hoc/withAuthInteraction";
import TextField from "./TextField";

const ProtectedTextField = withAuthInteraction(TextField);

export default ProtectedTextField;
