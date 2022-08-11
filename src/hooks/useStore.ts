import { useState } from "react";
import { Folders } from "../utils";

const useStore = () => {
  const [folders, setFolders] = useState<Folders>({});

  return { folders, setFolders };
};

export default useStore;
