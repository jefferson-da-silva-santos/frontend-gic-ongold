import Menu from "./components/Menu";
import Navgation from "./components/Navgation";
import CardItems from "./components/CardItems/CardItems";
import { useEffect, useState } from "react";
import FormRegister from "./components/FormRegister";
import FormEdition from "./components/FormEdition";
import PageBin from "./components/PageBin";
import useApi from "./hooks/useApi";
import { hasPassed30Days } from "./utils/date/dateUtils";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);
  
  // Remoção dos itens da Lixeira após 30 dias da sua exclusão
  const {
    requestAPI: requestApiDeleted,
  } = useApi("/items/deleted", "GET");

  const { requestAPI: requestItemPermanentDeleted } = useApi(
    `/items/permanent`,
    "DELETE"
  );

  const handlerDeletePermanentItem = async (id) => {
    try {
      const result = await requestItemPermanentDeleted(id);
      if (result) {
        toast.info(
          "Itens do carrinho foram excluídos permanentemente! 🧺",
          "bottom-right"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Função para buscar os dados
  async function fetchData() {
    try {
      const data = await requestApiDeleted();
      if (data) {
        data.map((item) => {
          console.log(item.id);
          if (hasPassed30Days(item?.excluido_em)) {
            handlerDeletePermanentItem(item.id);
          }
        });
      }
    } catch (error) {
      console.error("Erro ao carregar os itens:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

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
          <Route path="/" element={<CardItems items={items}
            setItems={setItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itensPerPage={itensPerPage}
            totalPaginas={totalPaginas}
            setTotalPaginas={setTotalPaginas}
            />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/edition" element={<FormEdition />} />
          <Route path="/edition/:id" element={<FormEdition />} />
          <Route path="/bin" element={<PageBin/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
