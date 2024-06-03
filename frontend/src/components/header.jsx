import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { isOpen, setIsOpen } = useContext(UserContext);
  const { user } = useContext(UserContext);

  const togglemenu = () => {
    setIsOpen(!isOpen);
  };
  console.log(user);
  return (
    <div>
      <div className="header flex items-center justify-between">
        <div className=" text-2xl font-bold ml-3">Travel Go</div>
        <div className="hidden sm:flex md:flex lg:flex">
          <Link to={"/"} className=" rounded-full text-lg px-3 py-0.5 m-2">
            Home
          </Link>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">About</div>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">Contact</div>
          <Link
            to={user ? "/account" : "/login"}
            className=" rounded-full text-lg profile flex items-center px-2 m-2"
          >
            <div className="h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mx-2">Logout</div>
          </Link>
        </div>
        <div
          className="flex sm:hidden md:hidden lg:hidden"
          onClick={togglemenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className={isOpen ? "menu absolute w-full z-50 bg-light" : "hidden"}>
        <div className="flex flex-col">
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">Home</div>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">About</div>
          <div className=" rounded-full text-lg px-3 py-0.5 m-2">Contact</div>
          <div className=" rounded-full text-lg profile flex px-2 m-2">
            <div className="h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>{" "}
            <div className=" mx-2">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
