import { useState } from "react";
import Login from "./pages/Login";
import { Home } from "./pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated ? (
    <Home />
  ) : (
    <Login setIsAuthenticated={setIsAuthenticated} />
  );
}

export default App;
