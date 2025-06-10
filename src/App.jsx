import "./App.css";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/primitive/avatar";

function App() {
  return (
    <>
      <h1 className="text-2xl">Hello</h1>
      <div className="flex flex-col gap-4 justify-center items-center m-5">
        <Avatar variant={"square"}>
          <AvatarImage
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
          />
          <AvatarFallback>AP.</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://images.unspla.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
            alt="Pedro Duarte"
          />
          <AvatarFallback>Ap.</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}

export default App;
