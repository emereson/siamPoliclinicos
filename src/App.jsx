import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProptecteRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/policlinicos/:id">
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
