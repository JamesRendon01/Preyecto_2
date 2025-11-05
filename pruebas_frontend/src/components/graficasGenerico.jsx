import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas-oklch";
import jsPDF from "jspdf";
import { Modal, Input, Checkbox, Button, message } from "antd";
import PropTypes from "prop-types";
import { subirInforme } from "../services/informe.service";
import PlantillaInforme from "./plantilla_informe";
import ProgressCircle from "./barraCarga.jsx";
export default function GraficasGenerico({
  data,
  campoEjeX,
  campoValor,
  titulo,
  tipo = "barras",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreInforme, setNombreInforme] = useState("");
  const [descargarLocal, setDescargarLocal] = useState(false);
  const [previewPDF, setPreviewPDF] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false); // 👈 Estado para loader

  const colores = ["#2563eb", "#60a5fa", "#93c5fd", "#bfdbfe"];

  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => {
    setModalVisible(false);
    setNombreInforme("");
    setDescargarLocal(false);
    setPreviewPDF(null);
    setLoadingPreview(false);
  };

  // 🧾 Generar PDF (vista previa o final)
  const generarPDF = async (modoVista = false) => {
    if (!nombreInforme.trim()) {
      message.warning("Por favor ingresa un nombre para el informe.");
      return;
    }

    try {
      if (modoVista) setLoadingPreview(true); // 🔄 Activar loader solo para vista previa

      const grafica = document.getElementById(`grafica-${titulo}`);
      if (!grafica) return message.error("No se encontró la gráfica.");

      // 🧩 Capturar la gráfica como imagen
      const canvasGrafica = await html2canvas(grafica, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const imgGrafica = canvasGrafica.toDataURL("image/png");

      // 🧩 Crear contenedor temporal y renderizar la plantilla con la imagen
      const tempContainer = document.createElement("div");
      document.body.appendChild(tempContainer);

      const fecha = new Date().toLocaleDateString();

      const root = ReactDOM.createRoot(tempContainer);
      root.render(
        <PlantillaInforme
          nombreInforme={nombreInforme}
          fecha={fecha}
          titulo={titulo}
          imagenGrafica={imgGrafica}
        />
      );

      // Esperar para que se apliquen estilos
      await new Promise((res) => setTimeout(res, 500));

      // Capturar el contenido renderizado
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      // Limpiar DOM temporal
      root.unmount();
      document.body.removeChild(tempContainer);

      // 🧾 Crear PDF con proporciones correctas
      const pdf = new jsPDF("landscape", "pt", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      // 📄 Vista previa
      if (modoVista) {
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPreviewPDF(pdfUrl);
        setLoadingPreview(false); // ✅ Ocultar loader
        return;
      }

      // 📤 Guardado final
      const blob = pdf.output("blob");
      const fileName = `${nombreInforme.replace(/\s+/g, "_")}.pdf`;
      const archivo = new File([blob], fileName, { type: "application/pdf" });

      const idAdministrador = 1;
      await subirInforme(nombreInforme, idAdministrador, archivo);

      if (descargarLocal) pdf.save(fileName);
      message.success("✅ Informe generado correctamente.");
      cerrarModal();
    } catch (error) {
      console.error(error);
      message.error("Error al generar el informe.");
      setLoadingPreview(false);
    }
  };

  return (
    <div id={`grafica-${titulo}`} className="bg-white shadow-lg p-4 rounded-2xl h-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black text-center flex-1">{titulo}</h2>
        <button
          onClick={abrirModal}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 border-2 border-black"
        >
          Generar Informe
        </button>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        {tipo === "barras" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={campoEjeX} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={campoValor} fill="#2563eb" />
          </BarChart>
        ) : tipo === "lineas" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={campoEjeX} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={campoValor} stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              dataKey={campoValor}
              nameKey={campoEjeX}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colores[i % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>

      {/* Modal de generación */}
      <Modal title="Generar Informe" open={modalVisible} onCancel={cerrarModal} footer={null}>
        <p>Ingresa el nombre que deseas asignarle al informe:</p>
        <Input
          placeholder="Ejemplo: Informe de Actividad"
          value={nombreInforme}
          onChange={(e) => setNombreInforme(e.target.value)}
          className="mb-3"
        />
        <Checkbox checked={descargarLocal} onChange={(e) => setDescargarLocal(e.target.checked)}>
          Descargar también localmente
        </Checkbox>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => generarPDF(true)}>Vista previa</Button>
          <Button type="primary" onClick={() => generarPDF(false)}>
            Generar Informe
          </Button>
        </div>

        {/* 🌀 Loader de vista previa */}
        {loadingPreview && (
          <div className="flex flex-col items-center mt-6">
            <ProgressCircle size={80} color="primary" speed={400} step={5} />
            <p className="mt-2 text-gray-600 text-sm">Generando vista previa...</p>
          </div>
        )}

        {/* 📄 Vista previa PDF */}
        {!loadingPreview && previewPDF && (
          <div className="mt-4 border border-gray-300 rounded-md p-2">
            <h3 className="text-center font-semibold mb-2">Vista previa del informe</h3>
            <iframe
              src={previewPDF}
              title="Vista previa PDF"
              width="100%"
              height="400px"
              style={{ borderRadius: "8px" }}
            ></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
}

GraficasGenerico.propTypes = {
  data: PropTypes.array.isRequired,
  campoEjeX: PropTypes.string.isRequired,
  campoValor: PropTypes.string.isRequired,
  titulo: PropTypes.string,
  tipo: PropTypes.oneOf(["barras", "lineas", "pastel"]),
};
