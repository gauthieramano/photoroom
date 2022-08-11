import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { FaSave } from "react-icons/fa";
import { OnChangeFolderName } from "../utils";

type Props = {
  name: string;
  onChangeFolderName: OnChangeFolderName;
};

const FolderName = ({ name, onChangeFolderName }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(name);

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (label === name) {
        setIsEditing(false);

        return;
      }

      const isValid = onChangeFolderName(label);

      // Disable "edit" mode when the new folder name is valid
      if (isValid) {
        setIsEditing(false);
      }
    },
    [label, onChangeFolderName]
  );

  if (isEditing) {
    return (
      <form className="flex gap-2 py-2" onSubmit={handleSubmit}>
        <label>
          <input
            className="rounded-lg p-2"
            onChange={handleChange}
            type="text"
            value={label}
          />
        </label>
        <button
          className="rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-500"
          type="submit"
        >
          <FaSave size="1.5rem" />
        </button>
      </form>
    );
  }

  return (
    <button className="py-4" onClick={handleClick} type="button">
      {label}
    </button>
  );
};

export default FolderName;
