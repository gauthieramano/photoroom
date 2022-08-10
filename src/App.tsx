import "./App.css";
import AddButton from "./components/AddButton";
import FolderButton from "./components/FolderButton";
import Section from "./components/Section";
import useImageUpload from "./hooks/useImageUpload";

const App = () => {
  const { folders, addFolder, addImage } = useImageUpload();

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

      {foldersEntries.map(([folderId, folder]) => (
        <Section
          button={
            <AddButton
              folderId={folderId}
              onImageAdd={addImage(parseInt(folderId))}
            />
          }
          folder={folder}
          isFirst={folderId === "0"}
          key={folderId}
        />
      ))}
    </div>
  );
};

export default App;
