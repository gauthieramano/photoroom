import "./App.css";
import AddButton from "./components/AddButton";
import Images from "./components/Images";
import useImageUpload from "./hooks/useImageUpload";

const App = () => {
  const { imageUrls, onImageAdd } = useImageUpload();

  return (
    <div>
      <header
        className={`flex w-full items-center justify-center ${
          imageUrls.length ? "p-4" : "h-screen"
        }`}
      >
        <AddButton onImageAdd={onImageAdd} />
      </header>

      {!!imageUrls.length && <Images imageUrls={imageUrls} />}
    </div>
  );
};

export default App;
