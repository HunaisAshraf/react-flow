import "./App.css";
import "@xyflow/react/dist/style.css";
import Flow from "./components/Flow";
import DataProvider from "./context/DataProvider";
import Details from "./components/Details";

function App() {
  return (
    <DataProvider>
      <Flow />
      <Details />
    </DataProvider>
  );
}

export default App;
