import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MenuManagement from "./pages/MenuManagement";
import OrderManagement from "./pages/OrderManagement";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/menu"/>}/>
        <Route path="/menu" element={<MenuManagement/>}/>
        <Route path="/orders" element={<OrderManagement/>}/>
      </Routes>
    </Router>
  );
}
