import { useState, useEffect } from "react";

export default function FormReservas({ idPlan = 1, idInforme = 1 }) {
  const [turista, setTurista] = useState({
    correo: "",
    nombre: "",
    tipo_identificacion: "",
    identificacion: "",
    celular: "",
    id: null,
  });

  const [mp, setMp] = useState(null);
  const [fechaReserva, setFechaReserva] = useState("");
  const [numeroPersonas, setNumeroPersonas] = useState(1);
  const [costoFinal, setCostoFinal] = useState(100000);

  // Inicializar Mercado Pago
  useEffect(() => {
    const mpInstance = new window.MercadoPago(
      "TEST-a16a2919-7d22-41c9-9c37-c047cbc9bdf7",
      { locale: "es-CO" }
    );
    setMp(mpInstance);
  }, []);

  // Traer datos del turista
  useEffect(() => {
    const fetchTurista = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://192.168.20.62:8000/turista/mis-datos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al obtener los datos del turista");
        const data = await res.json();
        setTurista({
          correo: data.correo || "",
          nombre: data.nombre || "",
          tipo_identificacion: data.tipo_identificacion || "",
          identificacion: data.identificacion || "",
          celular: data.celular || "",
          id: data.id,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchTurista();
  }, []);

  const handleChangeTurista = (e) => {
    const { name, value } = e.target;
    setTurista((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mp) return alert("Mercado Pago no está inicializado");
    if (!fechaReserva) return alert("Seleccione una fecha válida");

    // Validación de campos de tarjeta
    const card_number = e.target.card_number.value;
    const card_expiration = e.target.card_expiration.value;
    const card_cvv = e.target.card_cvv.value;
    const card_holder_name = e.target.card_holder_name.value;

    if (!card_number || !card_expiration || !card_cvv || !card_holder_name) {
      return alert("Complete todos los campos de la tarjeta");
    }

    const [month, year] = card_expiration.split("/");
    if (!month || !year || isNaN(month) || isNaN(year)) {
      return alert("Formato de fecha de tarjeta incorrecto");
    }

    try {
      const cardData = {
        cardNumber: card_number.replace(/\s+/g, ""),
        cardExpirationMonth: month.padStart(2, "0"),
        cardExpirationYear: "20" + year,
        securityCode: card_cvv,
        cardholder: {
          name: card_holder_name,
          identification: {
            type: turista.tipo_identificacion,
            number: turista.identificacion.toString(),
          },
        },
      };

      // Crear token de tarjeta
      const { id: token_tarjeta } = await mp.createCardToken(cardData);
      if (!token_tarjeta) return alert("No se pudo generar el token de la tarjeta");

      const body = {
        fecha_reserva: fechaReserva,
        costo_final: Number(costoFinal),
        disponibilidad: true,
        numero_personas: Number(numeroPersonas),
        id_informe: Number(idInforme),
        id_plan: Number(idPlan),
        id_turista: Number(turista.id),
        email_cliente: turista.correo,
        token_tarjeta,
      };

      console.log("Enviando al backend:", body);

      const res = await fetch("http://192.168.20.62:8000/reserva/crear_reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error backend:", data);
        return alert("Error al crear reserva: " + JSON.stringify(data.detail || data));
      }

      console.log("Reserva creada:", data);
      alert("Reserva enviada correctamente");
    } catch (err) {
      console.error("Error al procesar la reserva:", err);
      alert(err.message || "Error desconocido");
    }
  };

  return (
    <div className="flex w-125 h-auto bg-nav border-4 border-black p-6 rounded-lg text-black sm:w-90 sm:ml-10 sm:mb-10 md:ml-10 md:mt-30 lg:ml-10 lg:mt-40 xl:ml-30 xl:w-120 xl:mt-50">
      <form onSubmit={handleSubmit} className="flex flex-col lg:text-xl xl:text-2xl xl:ml-5">
        <label>Correo:</label>
        <input type="email" name="correo" value={turista.correo} onChange={handleChangeTurista} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <label>Nombre Completo:</label>
        <input type="text" name="nombre" value={turista.nombre} onChange={handleChangeTurista} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <label>Tipo de identificación:</label>
        <select name="tipo_identificacion" value={turista.tipo_identificacion} onChange={handleChangeTurista} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200">
          <option value="">Seleccione un tipo de documento</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="PP">Pasaporte</option>
          <option value="PPT">Permiso por Protección Temporal</option>
        </select>

        <label>Identificación:</label>
        <input type="number" name="identificacion" value={turista.identificacion} onChange={handleChangeTurista} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <label>Número de celular:</label>
        <input type="number" name="celular" value={turista.celular} onChange={handleChangeTurista} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <label>Fecha de reserva:</label>
        <input type="date" value={fechaReserva} onChange={(e) => setFechaReserva(e.target.value)} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <label>Número de personas:</label>
        <input type="number" value={numeroPersonas} onChange={(e) => setNumeroPersonas(e.target.value)} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <label>Costo final:</label>
        <input type="number" value={costoFinal} onChange={(e) => setCostoFinal(e.target.value)} required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <label>Tarjeta de crédito:</label>
        <input type="text" name="card_number" placeholder="Número de tarjeta" required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />
        <input type="text" name="card_expiration" placeholder="MM/AA" required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />
        <input type="text" name="card_cvv" placeholder="CVV" required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />
        <input type="text" name="card_holder_name" placeholder="Nombre en la tarjeta" required className="w-full p-1 rounded-md text-black mt-2 bg-gray-200" />

        <div className="flex gap-4 mt-4">
          <button type="button" className="bg-fondo text-black font-bold px-4 py-2 rounded-md hover:bg-white">Cancelar</button>
          <button type="submit" className="bg-fondo text-black font-bold px-4 py-2 rounded-md hover:bg-white">Reservar</button>
        </div>
      </form>
    </div>
  );
}
