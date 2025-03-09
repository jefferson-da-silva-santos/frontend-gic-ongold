import React, { useState } from "react";
import axios from "axios";
import saveAs from "file-saver";

const ButtonReport = () => {
  const [loadingDownload, setLoadingDownload] = useState(false);

  const downloadPDF = async () => {
    setLoadingDownload(true);
    try {
      const response = await axios.get("http://localhost:3000/api/gic/report", {
        responseType: "blob",
      });

      // Cria um novo Blob a partir da resposta
      const blob = new Blob([response.data], { type: "application/pdf" });
      // Usa o FileSaver para salvar o arquivo
      saveAs(blob, "relatorio.pdf");
    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
    } finally {
      setLoadingDownload(false);
    }
  };

  return (
    <div className="group-button-report">
      {loadingDownload ? (
        <div className="progress-container">
          <div className="progress-circle"></div>
        </div>
      ) : (
        <button disabled={loadingDownload} onClick={downloadPDF} className="btn-report">
          <i className="bi bi-file-earmark-arrow-down"></i>
        </button>
      )}
    </div>
  );
};

export default ButtonReport;
