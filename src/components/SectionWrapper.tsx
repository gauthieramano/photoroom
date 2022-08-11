import { ChangeEventHandler } from "react";
import { OnChangeFolderName, OnMoveImage } from "../utils";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import FolderName from "./FolderName";
import Section from "./Section";

type Props = {
  folderId: number;
  imageUrls: string[];
  name: string;
  addImage: (folderId: number) => ChangeEventHandler<HTMLInputElement>;
  changeFolderName: (folderId: number) => OnChangeFolderName;
  deleteFolder: (folderId: number) => () => void;
  moveImage: (prevFolderId: number) => OnMoveImage;
};

const SectionWrapper = ({
  folderId,
  imageUrls,
  name,
  addImage,
  changeFolderName,
  deleteFolder,
  moveImage,
}: Props) => (
  <Section
    button={<AddButton folderId={folderId} onImageAdd={addImage(folderId)} />}
    deleteButton={<DeleteButton onClick={deleteFolder(folderId)} />}
    folderId={folderId}
    folderName={
      <FolderName name={name} onChangeFolderName={changeFolderName(folderId)} />
    }
    imageUrls={imageUrls}
    isFirst={folderId === 0}
    onMoveImage={moveImage(folderId)}
  />
);

export default SectionWrapper;
