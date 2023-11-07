import { ButtonProps } from "../../../props/Button.Props";
import RemoveIcon from "../../Icons/RemoveIcon/RemoveIcon";
import "./RemoveEntryButton.css";

const RemoveEntryButton = (props: ButtonProps) => {
  return (
    <button className="remove-button" onClick={() => props.onClicked()}>
      <RemoveIcon width={30} height={30}/>
    </button>
  );
};

export default RemoveEntryButton;
