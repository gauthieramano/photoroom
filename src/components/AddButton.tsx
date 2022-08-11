import { ChangeEventHandler } from "react";
import start from "../startButton.svg";

type Props = {
  folderId: number;
  onImageAdd: ChangeEventHandler<HTMLInputElement>;
};

const AddButton = ({ folderId, onImageAdd }: Props) => (
  <label className="add-button-label" htmlFor={`customFileAdd${folderId}`}>
    <input
      accept=".png, .jpg, .jpeg"
      className="file-input"
      id={`customFileAdd${folderId}`}
      onChange={onImageAdd}
      type="file"
    />
    <img alt="" className="add-button-image" src={start} />
  </label>
);

export default AddButton;
