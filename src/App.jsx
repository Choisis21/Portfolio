import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
;


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
 