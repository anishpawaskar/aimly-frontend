import { NavLink, Route, Routes } from "react-router";
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
        <Route
          path="/"
          element={
            <div>
              <h1 className="text-2xl">Hello</h1>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "text-red-300" : "text-green-300"
                }
              >
                {({ isActive }) => {
                  console.log("isActive", isActive);
                  return <p>{isActive ? "active" : "pending"}</p>;
                }}
              </NavLink>
            </div>
          }
        />
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/projects/:projectId/tasks" element={<TasksLayout />}>
          <Route
            index
            element={
              <div>
                <h1>Tasks</h1>
              </div>
            }
          />
          <Route path=":taskId" element={<div>TaskId</div>} />
        </Route>
        <Route path="/tags/:tagId/tasks" element={<TasksLayout />}>
          <Route
            index
            element={
              <div>
                <h1>Tasks</h1>
              </div>
            }
          />
          <Route path=":taskId" element={<div>TaskId</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
