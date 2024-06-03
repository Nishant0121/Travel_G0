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
    <div>
      account <div onClick={handleLogout}>button</div>
    </div>
  );
}
