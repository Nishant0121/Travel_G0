import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../userContext";

export default function Account() {
  const [loading, setLoading] = useState(false);

  const userdata = JSON.parse(localStorage.getItem("user"));
  const { user } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      // Start loading animation
      setLoading(true);

      // Send a POST request to the logout endpoint
      await axios.post("/logout");
      // Redirect to the login page or perform any other action after logout
      // For example, you can redirect to the login page
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
      // Handle logout failure if needed
    } finally {
      // Stop loading animation
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="card max-w-96 dark:bg-blue-950 bg-blue-50 text-dark dark:text-light p-3 rounded-xl flex flex-col items-center justify-center">
        <div className="image h-24 w-24 flex items-center justify-center rounded-full">
          <img
            className="rounded-full h-24
            w-24"
            src={userdata.user.profimgurl}
            alt="profile"
            srcSet=""
          />
        </div>
        <div className="name m-3 text-center">{userdata.user.name}</div>
        <div className="email m-3">{userdata.user.email}</div>
        <button
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleLogout}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
