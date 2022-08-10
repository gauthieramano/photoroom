import "./App.css";
import AddButton from "./components/AddButton";
import useImageUpload from "./hooks/useImageUpload";

const App = () => {
  const { result, onImageAdd } = useImageUpload();

  return (
    <div>
      {!result ? (
        <header className="flex h-screen w-full items-center justify-center">
          <AddButton onImageAdd={onImageAdd} />
        </header>
      ) : (
        <img alt="result from the API" src={result} width={300} />
      )}
    </div>
  );
};

export default App;
