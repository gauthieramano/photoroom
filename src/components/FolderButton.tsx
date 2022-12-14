import start from "../startButton.svg";

type Props = {
  onClick: () => void;
};

const TITLE = "Add a new folder";

const FolderButton = ({ onClick }: Props) => (
  <div>
    <p>{TITLE}</p>
    <button className="add-button-label" onClick={onClick} type="button">
      <img alt="Add a new folder" className="add-button-image" src={start} />
    </button>
  </div>
);

export default FolderButton;
