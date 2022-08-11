import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import AddButton from "./components/AddButton";
import FolderButton from "./components/FolderButton";
import FolderName from "./components/FolderName";
import Section from "./components/Section";
import useImageUpload from "./hooks/useImageUpload";
import useStore from "./hooks/useStore";
import useUiActions from "./hooks/useUiActions";

const App = () => {
  const { folders, setFolders } = useStore();

  const { addImage } = useImageUpload({
    folders,
    setFolders,
  });

  const { addFolder, changeFolderName, moveImage } = useUiActions({
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
        {foldersEntries.map(([folderId, { imageUrls, name }]) => (
          <Section
            button={
              <AddButton
                folderId={folderId}
                onImageAdd={addImage(parseInt(folderId))}
              />
            }
            folderId={parseInt(folderId)}
            folderName={
              <FolderName
                name={name}
                onChangeFolderName={changeFolderName(parseInt(folderId))}
              />
            }
            imageUrls={imageUrls}
            isFirst={folderId === "0"}
            key={folderId}
            onMoveImage={moveImage(parseInt(folderId))}
          />
        ))}
      </DndProvider>
    </div>
  );
};

export default App;
