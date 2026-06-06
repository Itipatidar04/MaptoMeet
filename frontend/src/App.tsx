import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import MapPage from "./pages/MapPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
