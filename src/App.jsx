import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import { useState } from "react";
import FormRegister from "./components/FormRegister";
import FormEdition from "./components/FormEdition";
import PageBin from "./components/PageBin";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);

  const [itensPerPage] = useState(4);
  const [totalPaginas, setTotalPaginas] = useState(1);

  return (
    <div className="container">
      <BrowserRouter>
        <Menu
          isMenuMobileVisible={isMenuMobileVisible}
          setIsMenuMobileVisible={setIsMenuMobileVisible}
        />
        <Navgation
          setItems={setItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMenuMobileVisible={isMenuMobileVisible}
          setIsMenuMobileVisible={setIsMenuMobileVisible}
          itensPerPage={itensPerPage}
          setTotalPaginas={setTotalPaginas}
        />
        <Routes>
          <Route
            path="/"
            element={
              <CardItems
                items={items}
                setItems={setItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itensPerPage={itensPerPage}
                totalPaginas={totalPaginas}
                setTotalPaginas={setTotalPaginas}
              />
            }
          />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/edition" element={<FormEdition />} />
          <Route path="/edition/:id" element={<FormEdition />} />
          <Route path="/bin" element={<PageBin />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
