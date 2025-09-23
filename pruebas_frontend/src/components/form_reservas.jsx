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

