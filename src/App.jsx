import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { PerformancePage } from "./pages/PerformancePage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App
 