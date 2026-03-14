
import { Routes, Route } from "react-router-dom";
import QRPage from "./pages/QRPage";
import MenuPage from "./pages/MenuPage";
import WaiterPage from "./pages/WaiterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QRPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/waiter" element={<WaiterPage />} />
    </Routes>
  );
}
