import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import MapPage from "./pages/MapPage.tsx";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      {/*Global toast container*/}
      <Toaster richColors position="top-right" />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
