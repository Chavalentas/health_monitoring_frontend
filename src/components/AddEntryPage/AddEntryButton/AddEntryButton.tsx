import { ButtonProps } from "../../../props/Button.Props";
import AddIcon from "../../Icons/AddIcon/AddIcon";
import "./AddEntryButton.css";

const AddEntryButton = (props: ButtonProps) => {
  return (
    <button className="add-button" onClick={() => props.onClicked()}>
      <AddIcon width={30} height={30} />
    </button>
  );
};

export default AddEntryButton;
