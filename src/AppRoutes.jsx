import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MisPersonajes from "./pages/MisPersonajes";
import CrearPersonaje from "./pages/CrearPersonaje";
import PrivateRoute from "./components/PrivateRoute";
import GameCanvas from './pages/GameCanvas';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/personajes"
        element={
          <PrivateRoute>
            <MisPersonajes />
          </PrivateRoute>
        }
      />

      <Route
        path="/crear-personaje"
        element={
          <PrivateRoute>
            <CrearPersonaje />
          </PrivateRoute>
        }
      />
      <Route
        path="/game"
        element={
          <PrivateRoute>
            <GameCanvas />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
