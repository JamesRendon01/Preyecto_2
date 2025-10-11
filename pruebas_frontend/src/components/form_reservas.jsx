import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "./card";
import { message, Modal } from "antd";

export default function FormReservas() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};

  const [formData, setFormData] = useState({
    id: "",
    correo: "",
    nombre: "",
    fecha: "",
    identificacion: "",
    celular: "",
    numeroPersonas: "",
    tarjeta: "",
    numeroTarjeta: "",
    ccv: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/turista/reservas/mis-datos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setFormData((prev) => ({ ...prev, ...res.data })))
        .catch((err) =>
          console.error("❌ Error al obtener los datos del turista", err)
        );
    }
  }, []);

  const formatValidationDetail = (detail) => {
    // FastAPI validation errors often come as an array of objects
    if (Array.isArray(detail)) {
      return detail
        .map((d) => {
          if (typeof d === "string") return d;
          // d may be {loc: [...], msg: "...", type: "..."}
          return d?.msg ? `${d.msg} (${(d.loc || []).join(" > ")})` : JSON.stringify(d);
        })
        .join("\n");
    }
    if (typeof detail === "object") return JSON.stringify(detail);
    return String(detail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:8000/reserva/crear_reserva",
        {
          fecha_reserva: formData.fecha,
          costo_final: plan?.precio || 200000,
          disponibilidad: true,
          numero_personas: parseInt(formData.numeroPersonas, 10),
          id_informe: null,
          id_plan: plan?.id,
          id_turista: formData.id,
          token_tarjeta: "tok_test_123456",
          email_cliente: formData.correo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("✅ Reserva realizada con éxito");
      setShowModal(true);
    } catch (error) {
      console.error("❌ Error al crear reserva (detalle completo):", error);

      // Caso: tenemos respuesta del servidor
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data || {};
        const detail = data.detail ?? data.message ?? data.error ?? data;

        // 400 -> posible duplicado u otra validación de negocio
        if (status === 400) {
          const text = formatValidationDetail(detail);
          if (typeof text === "string" && text.toLowerCase().includes("reserva")) {
            Modal.warning({
              title: "Reserva duplicada",
              content: text,
              okText: "Entendido",
            });
          } else {
            message.error(text || "Solicitud inválida (400)");
          }
        }
        // 401 -> token inválido/expirado
        else if (status === 401) {
          message.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
          navigate("/login");
        }
        // 422 -> errores de validación de Pydantic (FastAPI)
        else if (status === 422) {
          const text = formatValidationDetail(detail);
          Modal.error({
            title: "Error de validación",
            content: (
              <div style={{ whiteSpace: "pre-line" }}>
                {text || "Revisa los datos enviados (formato/valores)."}
              </div>
            ),
          });
        }
        // 500 u otros
        else {
          const text = formatValidationDetail(detail);
          message.error(text || "Error del servidor. Inténtalo más tarde.");
        }
      }
      // Caso: petición hecha pero no hubo respuesta (server down / CORS / red)
      else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        message.error(
          "No hubo respuesta del servidor. Revisa la conexión o que el backend esté en ejecución."
        );
      }
      // Error en la configuración de la petición
      else {
        message.error(error.message || "Error inesperado al crear la reserva.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row justify-center items-start gap-50 px-4">
        <div className="mt-50">{plan && <CardComponent showButton={false} plans={[plan]} />}</div>

        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="w-full bg-white border-2 border-black rounded-xl p-6 sm:p-10 font-general shadow-lg">
            <h2 className="text-2xl font-bold font-title mb-6 text-center">Reserva tu plan</h2>

            <label className="block pb-2">Correo</label>
            <input readOnly type="email" value={formData.correo} className="bg-black/20 border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">Nombre</label>
            <input readOnly type="text" value={formData.nombre} className="bg-black/20 border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">Identificación</label>
            <input readOnly type="number" value={formData.identificacion} className="bg-black/20 border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">Celular</label>
            <input readOnly type="number" value={formData.celular} className="bg-black/20 border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">Fecha de reserva</label>
            <input type="date" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">Número de personas</label>
            <input type="number" value={formData.numeroPersonas} onChange={(e) => setFormData({ ...formData, numeroPersonas: e.target.value })} className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">Nombre en la tarjeta</label>
            <input type="text" value={formData.tarjeta} onChange={(e) => { const v = e.target.value; if (/^[a-zA-Z\s]*$/.test(v)) setFormData({ ...formData, tarjeta: v }); }} placeholder="Nombre como aparece en la tarjeta" className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">Número de tarjeta</label>
            <input type="text" value={formData.numeroTarjeta} onChange={(e) => { let value = e.target.value.replace(/\D/g, ""); value = value.replace(/(.{4})/g, "$1 ").trim(); setFormData({ ...formData, numeroTarjeta: value }); }} maxLength={19} placeholder="XXXX XXXX XXXX XXXX" className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4 tracking-widest" required />

            <label className="block pb-2">Fecha de vencimiento</label>
            <input type="text" placeholder="MM/YY" onChange={(e) => { let value = e.target.value.replace(/\D/g, ""); if (value.length > 4) value = value.slice(0, 4); if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2); setFormData({ ...formData, fechaVencimiento: value }); }} value={formData.fechaVencimiento || ""} pattern="^(0[1-9]|1[0-2])\/\d{2}$" title="Formato válido: MM/YY" className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4" required />

            <label className="block pb-2">CCV</label>
            <input type="text" value={formData.ccv} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 4) setFormData({ ...formData, ccv: value }); }} placeholder="3 o 4 dígitos" pattern="\d{3,4}" title="El CCV debe contener 3 o 4 dígitos" className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-6" required />

            <div className="flex flex-col sm:flex-row justify-center gap-5 font-bold font-title mt-5">
              <button type="button" onClick={() => navigate(-1)} className="bg-gray-300 w-full sm:w-40 h-10 border-2 border-black rounded-3xl">Cancelar</button>
              <button type="submit" disabled={isSubmitting} className={`w-full sm:w-40 h-10 border-2 border-black rounded-3xl ${isSubmitting ? "bg-gray-300" : "bg-nav"}`}>
                {isSubmitting ? "Reservando..." : "Reservar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal title="📄 Comprobante de Pago" open={showModal} onCancel={() => setShowModal(false)} footer={[
        <button key="close" onClick={() => setShowModal(false)} className="bg-nav px-4 py-2 border-2 border-black rounded-xl font-bold">Cerrar</button>
      ]}>
        <div className="p-4 font-general text-sm leading-relaxed">
          <h2 className="text-center font-bold text-xl mb-2">COMPROBANTE DE PAGO</h2>
          <p className="text-center font-semibold mb-4">✅ Reservación Exitosa</p>
          <p>Bogotá, {new Date().toLocaleDateString("es-CO")}</p>
          <p>Sr. <strong>{formData.nombre}</strong>, identificado con CC <strong>{formData.identificacion}</strong> y teléfono <strong>{formData.celular}</strong>.</p>
          <p className="mt-2">Su reserva para el plan <strong>{plan?.nombre}</strong> ha sido procesada exitosamente.</p>

          <div className="mt-3">
            <p><strong>Fecha de reserva:</strong> {formData.fecha}</p>
            <p><strong>Número de personas:</strong> {formData.numeroPersonas}</p>
          </div>

          <div className="mt-3">
            <p><strong>Total:</strong> {(((plan?.precio || 0) + 100000 * parseInt(formData.numeroPersonas || 0))).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}</p>
            <p>Método de pago: Tarjeta de crédito</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
