import "./App.css";
import Layout from "./layout";

import { UserContextProvider } from "./userContext";
import { Routes, Route } from "react-router";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route index element={<div>About</div>} />
          <Route path="/about" element={<div>kaka</div>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
