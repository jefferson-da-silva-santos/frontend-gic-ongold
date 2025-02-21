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
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const stages = [
  { id: 1, name: "list" },
  { id: 2, name: "register" },
  { id: 3, name: "edit" },
  { id: 4, name: "autoedit" },
  { id: 5, name: "bin" },
];

function App() {
  const [items, setItems] = useState([]);
  const [stage, setStage] = useState(stages[0].name);
  const [identify, setIdentify] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);

  const openAutoEdit = (id) => {
    if (stage !== stages[3].name) {
      setIdentify(id);
      setStage(stages[3].name);
    }
  };

  // Remoção dos itens da Lixeira após 30 dias da sua exclusão
  const {
    data: dataDeleted,
    error: errorDeleted,
    loading: loadingDeleted,
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
<<<<<<< HEAD
  useEffect(() => {
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
=======
  async function fetchData() {
    try {
      const data = await requestApiDeleted();
      if (data) {
        data.map((item) => {
          console.log(item.id);
          if (hasPassed30Days(item?.excluido_em)) {
            handlerDeletePermanentItem(item.id)
          }
        });
>>>>>>> main
      }
    } catch (error) {
      console.error("Erro ao carregar os itens:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <Menu
          stage={stage}
          isMenuMobileVisible={isMenuMobileVisible}
          setIsMenuMobileVisible={setIsMenuMobileVisible}
        />
        <Navgation
          setItems={setItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMenuMobileVisible={isMenuMobileVisible}
          setIsMenuMobileVisible={setIsMenuMobileVisible}
        />
        <Routes>
          <Route path="/" element={<CardItems
            openAutoEdit={openAutoEdit}
            items={items}
            setItems={setItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/edition" element={<FormEdition />} />
          <Route path="/edition/:id" element={<FormEdition identify={identify} setIdentify={setIdentify} />} />
          <Route path="/bin" element={<PageBin stage={stage} />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
