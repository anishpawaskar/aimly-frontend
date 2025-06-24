import { createContext, useContext, useState } from "react";

const TaskPageContext = createContext(null);

const TaskPageProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);

  const contextValue = {
    projects,
    setProjects,
    tags,
    setTags,
    tasks,
    setTasks,
  };

  return (
    <TaskPageContext.Provider value={contextValue}>
      {children}
    </TaskPageContext.Provider>
  );
};

const useTaskPage = () => useContext(TaskPageContext);

export { TaskPageProvider, useTaskPage };
