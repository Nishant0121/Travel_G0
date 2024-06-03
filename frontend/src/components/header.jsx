import { useContext } from "react";
import { UserContext } from "../userContext";

export default function Header() {
  const { isOpen, setIsOpen } = useContext(UserContext);

  const togglemenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className="header flex items-center justify-between">
        <div>Name</div>
        <div className="hidden sm:flex md:flex lg:flex">
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">Home</div>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">About</div>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">ontact</div>
          <div className=" rounded-full text-lg profile flex px-2 m-2">
            <div>img</div>
            <div>Logout</div>
          </div>
        </div>
        <div
          className="flex sm:hidden md:hidden lg:hidden"
          onClick={togglemenu}
        >
          button
        </div>
      </div>
      <div className={isOpen ? "menu absolute w-full bg-light" : "hidden"}>
        <div className="flex flex-col">
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">Home</div>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">About</div>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">ontact</div>
          <div className=" rounded-full text-lg profile flex px-2 m-2">
            <div>img</div>
            <div>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
