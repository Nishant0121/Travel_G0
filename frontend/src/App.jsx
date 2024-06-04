import "./App.css";
import Layout from "./layout";
import Login from "./pages/login";
import Register from "./pages/register";
import axios from "axios";

import { UserContextProvider } from "./userContext";
import { Routes, Route } from "react-router";
import Account from "./pages/account";
import AddPlaceForm from "./pages/addplace";

axios.defaults.baseURL = "https://travel-go-server-d825.onrender.com";
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
          <Route path="/addplaces" element={<AddPlaceForm />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
