import "./App.css";
import Layout from "./layout";
import Login from "./pages/login";

import { UserContextProvider } from "./userContext";
import { Routes, Route } from "react-router";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route path="/" element={<div>About</div>} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
