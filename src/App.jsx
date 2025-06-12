import { Route, Routes } from "react-router";
import "./App.css";
import Signin from "./pages/auth/signin";
import AuthLayout from "./pages/auth/layout";
import Signup from "./pages/auth/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl">Hello</h1>} />
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
