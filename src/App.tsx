import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import AddButton from "./components/AddButton";
import FolderButton from "./components/FolderButton";
import Section from "./components/Section";
import useImageUpload from "./hooks/useImageUpload";
import useStore from "./hooks/useStore";

const App = () => {
  const { folders, setFolders } = useStore();

  const { addFolder, addImage, changeFolderName, moveImage } = useImageUpload({
    folders,
    setFolders,
  });

  const foldersEntries = Object.entries(folders);

  return (
    <div>
      <header
        className={`flex w-full items-center justify-center ${
          foldersEntries.length ? "p-4" : "h-screen"
        }`}
      >
        {foldersEntries.length ? (
          <FolderButton onClick={addFolder} />
        ) : (
          <AddButton folderId="initial" onImageAdd={addImage(0)} />
        )}
      </header>

      <DndProvider backend={HTML5Backend}>
        {foldersEntries.map(([folderId, folder]) => (
          <Section
            button={
              <AddButton
                folderId={folderId}
                onImageAdd={addImage(parseInt(folderId))}
              />
            }
            folder={folder}
            folderId={parseInt(folderId)}
            isFirst={folderId === "0"}
            key={folderId}
            onChangeFolderName={changeFolderName(parseInt(folderId))}
            onMoveImage={moveImage(parseInt(folderId))}
          />
        ))}
      </DndProvider>
    </div>
  );
};

export default App;
