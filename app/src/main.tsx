import ReactDOM from "react-dom/client";
import NavBar from "./NavBar.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Mirage from "./pages/maps/Mirage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/maps/mirage" element={<Mirage />} />
    </Routes>
  </BrowserRouter>
);
