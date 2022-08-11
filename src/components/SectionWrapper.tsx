import { ChangeEventHandler } from "react";
import { OnChangeFolderName, OnMoveImage } from "../utils";
import AddButton from "./AddButton";
import FolderName from "./FolderName";
import Section from "./Section";

type Props = {
  folderId: number;
  imageUrls: string[];
  name: string;
  addImage: (folderId: number) => ChangeEventHandler<HTMLInputElement>;
  changeFolderName: (folderId: number) => OnChangeFolderName;
  moveImage: (prevFolderId: number) => OnMoveImage;
};

const SectionWrapper = ({
  folderId,
  imageUrls,
  name,
  addImage,
  changeFolderName,
  moveImage,
}: Props) => (
  <Section
    button={<AddButton folderId={folderId} onImageAdd={addImage(folderId)} />}
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
