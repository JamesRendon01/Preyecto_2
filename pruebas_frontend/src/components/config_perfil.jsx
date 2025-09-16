import { useState, useEffect } from "react";

export default function ActualizarTurista() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    celular: "",
    fecha_nacimiento: "",
    ciudad: "",
    tipo_identificacion: "",
    identificacion: "",
    direccion: ""
  });

  const [loading, setLoading] = useState(true);
  const [turistaId, setTuristaId] = useState(null);

  // Función para decodificar el token manualmente
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás logueado");
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);
    if (!decoded || !decoded.sub) {
      alert("Token inválido");
      setLoading(false);
      return;
    }

    setTuristaId(decoded.sub);

    // Traer datos actuales del usuario
    fetch("http://localhost:8000/turista/mis-datos", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setFormData({
          nombre: data.nombre || "",
          correo: data.correo || "",
          celular: data.celular || "",
          fecha_nacimiento: data.fecha_nacimiento || "",
          ciudad: data.ciudad || "",
          tipo_identificacion: data.tipo_identificacion || "",
          identificacion: data.identificacion || "",
          direccion: data.direccion || ""
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turistaId) {
      alert("No se pudo obtener el ID del turista");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás logueado");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/turista/${turistaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + JSON.stringify(errorData));
        return;
      }

      const result = await response.json();
      alert(result.mensaje);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar los datos");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <form className="bg-white shadow-lg rounded-xl p-6 w-96" onSubmit={handleSubmit}>
        {/* Nombre */}
        <label className="block mb-2 font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="w-full border px-3 py-2 rounded mb-4"
          required
          value={formData.nombre}
          onChange={handleChange}
        />

        {/* Correo */}
        <label className="block mb-2 font-medium">Correo</label>
        <input
          type="email"
          name="correo"
          className="w-full border px-3 py-2 rounded mb-4"
          required
          value={formData.correo}
          onChange={handleChange}
        />

        {/* Celular */}
        <label className="block mb-2 font-medium">Celular</label>
        <input
          type="number"
          name="celular"
          className="w-full border px-3 py-2 rounded mb-4"
          value={formData.celular}
          onChange={handleChange}
        />

        {/* Fecha Nacimiento */}
        <label className="block mb-2 font-medium">Fecha Nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          className="w-full border px-3 py-2 rounded mb-4"
          required
          value={formData.fecha_nacimiento}
          onChange={handleChange}
        />

        {/* Ciudad */}
        <label className="block mb-2 font-medium">Ciudad</label>
        <input
          type="text"
          name="ciudad"
          className="w-full border px-3 py-2 rounded mb-4"
          required
          value={formData.ciudad}
          onChange={handleChange}
        />

        {/* Tipo identificación */}
        <label className="block mb-2 font-medium">Tipo identificacion</label>
        <input
          type="text"
          name="tipo_identificacion"
          className="w-full border px-3 py-2 rounded mb-4"
          required
          value={formData.tipo_identificacion}
          onChange={handleChange}
        />

        {/* Identificacion */}
        <label className="block mb-2 font-medium">Identificacion</label>
        <input
          type="number"
          name="identificacion"
          className="w-full border px-3 py-2 rounded mb-4"
          required
          value={formData.identificacion}
          onChange={handleChange}
        />

        {/* Direccion */}
        <label className="block mb-2 font-medium">Direccion</label>
        <input
          type="text"
          name="direccion"
          className="w-full border px-3 py-2 rounded mb-4"
          required
          value={formData.direccion}
          onChange={handleChange}
        />

        {/* Botón */}
        <button className="bg-fondo text-black px-4 py-2 rounded hover:bg-green-600 w-full">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
