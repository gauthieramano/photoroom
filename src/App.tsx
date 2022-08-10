import "./App.css";
import AddButton from "./components/AddButton";
import useImageUpload from "./hooks/useImageUpload";

const App = () => {
  const { result, onImageAdd } = useImageUpload();

  return (
    <div>
      <header>
        {!result ? (
          <AddButton onImageAdd={onImageAdd} />
        ) : (
          <img alt="result from the API" src={result} width={300} />
        )}
      </header>
    </div>
  );
};

export default App;
