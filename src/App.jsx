import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl">Hello</h1>} />
      </Routes>
    </>
  );
}

export default App;
