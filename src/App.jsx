
import { Routes, Route } from "react-router-dom";
import QRPage from "./pages/QRPage";
import MenuPage from "./pages/MenuPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QRPage />} />
      <Route path="/menu" element={<MenuPage />} />
    </Routes>
  );
}
