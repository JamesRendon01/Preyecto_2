import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "./card"; // 👈 Tu componente de Card
import { message, Modal } from "antd";

export default function FormReservas() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {}; // 👈 plan llega desde navigate()

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

  // Autorelleno de ejemplo
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

  // 🔹 Enviar reserva al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8000/reserva/crear_reserva",
        {
          fecha_reserva: formData.fecha,
          costo_final: plan?.precio || 200000,
          disponibilidad: true,
          numero_personas: parseInt(formData.numeroPersonas),
          id_informe: null,
          id_plan: plan?.id,
          id_turista: formData.id,
          token_tarjeta: "tok_test_123456", // 👈 Simulación de token de pago
          email_cliente: formData.correo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Reserva realizada con éxito ✅");
      setShowModal(true); // 👈 Mostrar comprobante
    } catch (error) {
      console.error("❌ Error al crear reserva:", error.response?.data || error);
      message.error("Error al crear la reserva");
    }
  };

  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row justify-center items-start gap-50 px-4">
        {/* 📌 Card del plan */}
        <div className="mt-50">
          {plan && <CardComponent showButton={false} plans={[plan]} />}
        </div>

        {/* 📌 Formulario de reserva */}
        <div className="w-full lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white border-2 border-black rounded-xl p-6 sm:p-10 font-general shadow-lg"
          >
            <h2 className="text-2xl font-bold font-title mb-6 text-center">
              Reserva tu plan
            </h2>

            {/* Correo */}
            <label className="block pb-2">Correo</label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) =>
                setFormData({ ...formData, correo: e.target.value })
              }
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* Nombre */}
            <label className="block pb-2">Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* Identificación */}
            <label className="block pb-2">Identificación</label>
            <input
              type="number"
              value={formData.identificacion}
              onChange={(e) =>
                setFormData({ ...formData, identificacion: e.target.value })
              }
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* Celular */}
            <label className="block pb-2">Celular</label>
            <input
              type="number"
              value={formData.celular}
              onChange={(e) =>
                setFormData({ ...formData, celular: e.target.value })
              }
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* Fecha */}
            <label className="block pb-2">Fecha de reserva</label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* Número de personas */}
            <label className="block pb-2">Número de personas</label>
            <input
              type="number"
              value={formData.numeroPersonas}
              onChange={(e) =>
                setFormData({ ...formData, numeroPersonas: e.target.value })
              }
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* Nombre en la tarjeta */}
            <label className="block pb-2">Nombre en la tarjeta</label>
            <input
              type="text"
              value={formData.tarjeta}
              onChange={(e) => {
                const value = e.target.value;
                // Solo letras y espacios
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFormData({ ...formData, tarjeta: value });
                }
              }}
              placeholder="Nombre como aparece en la tarjeta"
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* Número de tarjeta */}
            <label className="block pb-2">Número de tarjeta</label>
            <input
              type="text"
              value={formData.numeroTarjeta}
              onChange={(e) => {
                // ✅ Eliminar espacios y dejar solo números
                let value = e.target.value.replace(/\D/g, "");

                // ✅ Formatear cada 4 dígitos
                value = value.replace(/(.{4})/g, "$1 ").trim();

                setFormData({ ...formData, numeroTarjeta: value });
              }}
              maxLength={19} // 16 dígitos + 3 espacios
              placeholder="XXXX XXXX XXXX XXXX"
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4 tracking-widest"
              required
            />

            {/* Fecha de vencimiento */}
            <label className="block pb-2">Fecha de vencimiento</label>
            <input
              type="text"
              placeholder="MM/YY"
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // solo números
                if (value.length > 4) value = value.slice(0, 4);
                if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
                setFormData({ ...formData, fechaVencimiento: value });
              }}
              value={formData.fechaVencimiento || ""}
              pattern="^(0[1-9]|1[0-2])\/\d{2}$"
              title="Formato válido: MM/YY"
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-4"
              required
            />

            {/* CCV */}
            <label className="block pb-2">CCV</label>
            <input
              type="text"
              value={formData.ccv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // solo números
                if (value.length <= 4) {
                  setFormData({ ...formData, ccv: value });
                }
              }}
              placeholder="3 o 4 dígitos"
              pattern="\d{3,4}"
              title="El CCV debe contener 3 o 4 dígitos"
              className="bg-white border-2 border-black rounded-xl h-10 w-full px-3 mb-6"
              required
            />

            {/* Botones */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 font-bold font-title mt-5">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-300 w-full sm:w-40 h-10 border-2 border-black rounded-3xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-nav w-full sm:w-40 h-10 border-2 border-black rounded-3xl"
              >
                Reservar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal con comprobante */}
      <Modal
        title="📄 Comprobante de Pago"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <button
            key="close"
            onClick={() => setShowModal(false)}
            className="bg-nav px-4 py-2 border-2 border-black rounded-xl font-bold"
          >
            Cerrar
          </button>,
        ]}
      >
        <div className="p-4 font-general text-sm leading-relaxed">
          <h2 className="text-center font-bold text-xl mb-2">COMPROBANTE DE PAGO</h2>
          <p className="text-right">Nº 00001</p>
          <p className="text-center font-semibold mb-4">✅ Reservación Exitosa</p>

          <p>Bogotá, {new Date().toLocaleDateString("es-CO")}</p>
          <p>Buenas Tardes</p>
          <p>
            Sr. <strong>{formData.nombre}</strong>, identificado con CC{" "}
            <strong>{formData.identificacion}</strong> y Número de Teléfono:{" "}
            <strong>{formData.celular}</strong>.
          </p>
          <p className="mt-2">
            Nos complace avisarle que su reservación en{" "}
            <strong>{plan?.nombre}</strong> ha sido exitosa.
          </p>

          <div className="mt-3">
            <p>
              <strong>Detalles:</strong> Reservación realizada para{" "}
              <strong>{plan?.nombre}</strong>, donde incluye: Alimentación, tour por
              el Caquetá, etc.
            </p>
          </div>

          <p className="mt-3">
            <strong>Fecha de reservación:</strong> {formData.fecha} –{" "}
            {formData.fecha}
          </p>

          <div className="mt-3">
            <p>
              <strong>Precio:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>Precio plan: ${plan?.precio?.toLocaleString("es-CO")}</li>
              <li>
                Precio x persona (x{formData.numeroPersonas}): $
                {(100000 * formData.numeroPersonas).toLocaleString("es-CO")}
              </li>
              <li>Método de pago: Tarjeta de crédito</li>
            </ul>
          </div>

          <p className="mt-3 font-bold">
            TOTAL: $
            {(
              (plan?.precio || 0) +
              100000 * parseInt(formData.numeroPersonas || 0)
            ).toLocaleString("es-CO")}
          </p>

          <p className="mt-4">
            Si tiene alguna inquietud por favor comunicarse con nuestras líneas de
            servicio o nuestras redes sociales, Gracias.
          </p>

          <div className="mt-6 flex justify-between">
            <p>
              Firma del responsable: <strong>Escapade Parfaite</strong>
            </p>
            <p>
              Firma del turista: <strong>{formData.nombre}</strong>
            </p>
          </div>
        </div>
      </Modal>

    </>
  );
}

