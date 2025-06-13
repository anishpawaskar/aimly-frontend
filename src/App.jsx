import { Route, Routes } from "react-router";
import "./App.css";
import Signin from "./pages/auth/signin";
import AuthLayout from "./pages/auth/layout";
import Signup from "./pages/auth/signup";
import DashboardLayout from "./pages/dashboard/layout";
import TasksLayout from "./pages/tasks/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl">Hello</h1>} />
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<TasksLayout />}>
          <Route
            path="tasks"
            element={
              <div>
                <h1>Tasks</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
