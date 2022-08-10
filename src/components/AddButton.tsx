import { ChangeEvent } from "react";
import start from "../startButton.svg";

type Props = {
  onImageAdd: (event: ChangeEvent<HTMLInputElement>) => void;
};

const AddButton = ({ onImageAdd }: Props) => (
  <label className="add-button-label" htmlFor="customFileAdd">
    <input
      accept=".png, .jpg, .jpeg"
      className="file-input"
      id="customFileAdd"
      onChange={onImageAdd}
      type="file"
    />
    <img alt="" className="add-button-image" src={start} />
  </label>
);

export default AddButton;
