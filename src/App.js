import "./App.css";
import Login from "./components/Login";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary FallbackComponent={<h1>Some Error Occured</h1>}>
      <div className="App">
        <Login />
      </div>
    </ErrorBoundary>
  );
}

export default App;
