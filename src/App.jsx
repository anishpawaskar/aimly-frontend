import { useState } from "react";
import "./App.css";
import {
  PopoverMenu,
  PopoverMenuAction,
  PopoverMenuCancel,
  PopoverMenuContent,
  PopoverMenuFooter,
  PopoverMenuTrigger,
} from "./components/primitive/popover-menu";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1 className="text-2xl">Hello</h1>
      <div className="flex flex-col gap-4 justify-center items-center m-5">
        <PopoverMenu open={open} onOpenChange={setOpen}>
          <PopoverMenuTrigger>Click me</PopoverMenuTrigger>
          <PopoverMenuContent>
            <div>Do what ever you want</div>
            <PopoverMenuFooter>
              <PopoverMenuCancel className={"flex-1 h-8"}>
                Cancel
              </PopoverMenuCancel>
              <PopoverMenuAction className={"flex-1 h-8"}>Ok</PopoverMenuAction>
            </PopoverMenuFooter>
          </PopoverMenuContent>
        </PopoverMenu>
      </div>
    </>
  );
}

export default App;
