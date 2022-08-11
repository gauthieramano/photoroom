import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import AddButton from "./components/AddButton";
import FolderButton from "./components/FolderButton";
import SectionWrapper from "./components/SectionWrapper";
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
          <AddButton folderId={0} onImageAdd={addImage(0)} />
        )}
      </header>

      <DndProvider backend={HTML5Backend}>
        {foldersEntries.map(([folderId, { imageUrls, name }]) => (
          <SectionWrapper
            addImage={addImage}
            changeFolderName={changeFolderName}
            folderId={parseInt(folderId)}
            imageUrls={imageUrls}
            key={folderId}
            moveImage={moveImage}
            name={name}
          />
        ))}
      </DndProvider>
    </div>
  );
};

export default App;
