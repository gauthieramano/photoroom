import {
  Folders,
  getFolderName,
  OnChangeFolderName,
  OnMoveImage,
} from "../utils";

type Args = {
  folders: Folders;
  setFolders: (folders: Folders) => void;
};

const useUiActions = ({ folders, setFolders }: Args) => {
  /* ******************************************************
   *                      addFolder                       *
   ********************************************************/

  const addFolder = () => {
    const folderId =
      Math.max(...Object.keys(folders).map((id) => parseInt(id))) + 1;

    const nextFolders = {
      ...folders,
      [folderId]: {
        name: getFolderName(folderId),
        imageUrls: [],
      },
    };

    setFolders(nextFolders);
  };

  /* ******************************************************
   *                   changeFolderName                   *
   ********************************************************/

  const changeFolderName =
    (folderId: number): OnChangeFolderName =>
    (folderName) => {
      const allNames = Object.values(folders).flatMap(({ name }) => name);

      // Two folders cannot have the same name
      if (allNames.includes(folderName)) {
        return false;
      }

      const nextFolders = {
        ...folders,
        [folderId]: {
          ...folders[folderId],
          name: folderName,
        },
      };

      setFolders(nextFolders);

      return true;
    };
  /* ******************************************************
   *                      addFolder                       *
   ********************************************************/

  const deleteFolder = (folderId: number) => () => {
    const nextFolders = { ...folders };

    delete nextFolders[folderId];

    setFolders(nextFolders);
  };

  /* ******************************************************
   *                      moveImage                       *
   ********************************************************/

  const moveImage =
    (prevFolderId: number): OnMoveImage =>
    (nextFolderId, imageUrl) => {
      const nextFolders = {
        ...folders,

        [prevFolderId]: {
          ...folders[prevFolderId],
          imageUrls: folders[prevFolderId].imageUrls.filter(
            (url) => url !== imageUrl
          ),
        },

        [nextFolderId]: {
          ...folders[nextFolderId],
          imageUrls: [...folders[nextFolderId].imageUrls, imageUrl],
        },
      };

      setFolders(nextFolders);
    };

  /* ******************************************************
   *                        Return                        *
   ********************************************************/

  return { addFolder, changeFolderName, deleteFolder, moveImage };
};

export default useUiActions;
