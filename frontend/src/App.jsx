import "./App.css";
import Layout from "./layout";
import Login from "./pages/login";
import Register from "./pages/register";
import axios from "axios";

import { UserContextProvider } from "./userContext";
import { Routes, Route } from "react-router";
import Account from "./pages/account";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route path="/" element={<div>About</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
