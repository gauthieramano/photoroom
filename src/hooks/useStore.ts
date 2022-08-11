import localforage from "localforage";
import { useEffect, useState } from "react";
import { Folders } from "../utils";

const useStore = () => {
  // eslint-disable-next-line react/hook-use-state
  const [folders, setAppFolders] = useState<Folders>({});

  const setFolders = (nextFolders: Folders) => {
    setAppFolders(nextFolders);

    localforage.setItem("folders", nextFolders);
  };

  useEffect(() => {
    const readLocalStorage = async () => {
      try {
        const nextFolders = (await localforage.getItem("folders")) as Folders;

        if (nextFolders) {
          setAppFolders(nextFolders);
        }
      } catch (error) {
        console.error(error);
      }
    };

    readLocalStorage();
  }, []);

  return { folders, setFolders };
};

export default useStore;
