import { FaTrash } from "react-icons/fa";

type Props = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: Props) => (
  <button
    className="rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-500"
    onClick={onClick}
    type="button"
  >
    <FaTrash />
  </button>
);

export default DeleteButton;
