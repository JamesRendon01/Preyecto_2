import { useState, useEffect } from "react";

export default function FormReservas() {
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    fecha: "",
    identificacion: "",
    celular: "",
    tarjeta: "",
    numeroTarjeta: "",
    ccv: "",
  });

  // Autorelleno de ejemplo
  useEffect(() => {
    setFormData({
      correo: "usuario@ejemplo.com",
      nombre: "Juan Pérez",
      fecha: "2025-09-25",
      identificacion: "123456789",
      celular: "3001234567",
      tarjeta: "Visa",
      numeroTarjeta: "4111111111111111",
      ccv: "123",
    });
  }, []);

  return (
    <div className="mt-50 flex justify-center">
      <form className="w-90 h-160 bg-white border-2 border-black rounded-xl p-10 font-general">
        <label className="block pb-2 pt-2">Correo</label>
        <input
          type="email"
          value={formData.correo}
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <label className="block pb-2 pt-2">Nombre</label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <label className="block pb-2 pt-2">Fecha</label>
        <input
          type="date"
          value={formData.fecha}
          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <label className="block pb-2 pt-2">Identificación</label>
        <input
          type="number"
          value={formData.identificacion}
          onChange={(e) =>
            setFormData({ ...formData, identificacion: e.target.value })
          }
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <label className="block pb-2 pt-2">Celular</label>
        <input
          type="number"
          value={formData.celular}
          onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <label className="block pb-2 pt-2">Tarjeta</label>
        <input
          type="text"
          value={formData.tarjeta}
          onChange={(e) => setFormData({ ...formData, tarjeta: e.target.value })}
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <label className="block pb-2 pt-2">Número de tarjeta</label>
        <input
          type="number"
          value={formData.numeroTarjeta}
          onChange={(e) =>
            setFormData({ ...formData, numeroTarjeta: e.target.value })
          }
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <label className="block pb-2 pt-2">CCV</label>
        <input
          type="text"
          value={formData.ccv}
          onChange={(e) => setFormData({ ...formData, ccv: e.target.value })}
          className="bg-white border-2 border-black rounded-xl h-7 w-70"
        />

        <div className="flex mt-5 gap-5 font-bold font-title">
          <button
            type="button"
            className="bg-nav w-40 h-10 border-2 border-black rounded-3xl"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-nav w-40 h-10 border-2 border-black rounded-3xl"
          >
            Reservar
          </button>
        </div>
      </form>
    </div>
  );
}
