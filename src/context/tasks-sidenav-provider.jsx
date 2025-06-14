import { createContext, useContext, useState } from "react";

const TasksSidenavContext = createContext(null);

const TasksSidenavProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const contextValue = {
    items,
    setItems,
  };

  return (
    <TasksSidenavContext.Provider value={contextValue}>
      {children}
    </TasksSidenavContext.Provider>
  );
};

const useTasksSidenav = () => useContext(TasksSidenavContext);

export { TasksSidenavProvider, useTasksSidenav };
