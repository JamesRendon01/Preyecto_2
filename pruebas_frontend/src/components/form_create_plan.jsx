import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function FormCrearPlan() {
    const navigate = useNavigate();

    // Estado principal del plan
    const [plan, setPlan] = useState({
        nombre: "",
        descripcion_corta: "",
        descripcion: "",
        costo_persona: "",
        id_ciudad: "",
        id_informe: "",
        imagen: null,
    });

    // Estados auxiliares
    const [preview, setPreview] = useState(null); // Vista previa de imagen
    const [ciudades, setCiudades] = useState([]); // Lista de ciudades

    // 🔹 Cargar las ciudades desde el backend al montar el componente
    useEffect(() => {
        fetch("http://localhost:8000/ciudad/listar_ciudades") // <-- Ajusta si tu ruta difiere
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener ciudades");
                return res.json();
            })
            .then((data) => setCiudades(data))
            .catch((err) => {
                console.error("Error cargando ciudades:", err);
                message.error("No se pudieron cargar las ciudades");
            });
    }, []);

    // Manejo de campos de texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value });
    };

    // Manejo de archivo de imagen
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPlan({ ...plan, imagen: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!plan.nombre.trim()) return alert("El nombre es obligatorio");
        if (!plan.descripcion_corta.trim()) return alert("La descripción corta es obligatoria");
        if (!plan.descripcion.trim()) return alert("La descripción es obligatoria");
        if (!plan.costo_persona) return alert("El precio por persona es obligatorio");
        if (!plan.id_ciudad) return alert("Debe seleccionar una ciudad");

        // Construimos el FormData
        const formData = new FormData();
        formData.append("nombre", plan.nombre);
        formData.append("descripcion_corta", plan.descripcion_corta);
        formData.append("descripcion", plan.descripcion);
        formData.append("costo_persona", parseFloat(plan.costo_persona));
        formData.append("id_ciudad", Number(plan.id_ciudad));
        if (plan.id_informe && !isNaN(plan.id_informe)) {
            formData.append("id_informe", Number(plan.id_informe));
        }
        if (plan.imagen instanceof File) {
            formData.append("imagen", plan.imagen);
        }

        try {
            const res = await fetch("http://localhost:8000/plan/crear-plan", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                message.success("✅ Plan creado correctamente");
                navigate("/listar_planes_admin");
            } else {
                const errorData = await res.json();
                message.error(errorData.detail || "❌ Error al crear el plan");
            }
        } catch (error) {
            console.error("Error en la creación:", error);
            message.error("❌ Error de conexión con el servidor");
        }
    };


    return (
        <div className="p-6 flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Crear Nuevo Plan</h2>

                {/* Imagen */}
                <label className="block mt-2 font-medium">Imagen</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
                {preview && (
                    <img src={preview} alt="Vista previa" className="mb-4 w-full h-48 object-cover rounded" />
                )}

                {/* Nombre */}
                <label className="block mt-2 font-medium">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={plan.nombre}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Descripción */}
                <label className="block mt-2 font-medium">Descripción Corta</label>
                <textarea
                    name="descripcion_corta"
                    value={plan.descripcion_corta}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                <label className="block mt-2 font-medium">Descripción</label>
                <textarea
                    name="descripcion"
                    value={plan.descripcion}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Precio */}
                <label className="block mt-2 font-medium">Precio por Persona</label>
                <input
                    type="number"
                    name="costo_persona"
                    value={plan.costo_persona}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Ciudad */}
                <label className="block mt-2 font-medium">ID Ciudad</label>
                <select
                    name="id_ciudad"
                    value={plan.id_ciudad}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded mb-20"
                    required
                >
                    <option value="">Seleccione una ciudad</option>
                    {ciudades.map((ciudad) => (
                        <option key={ciudad.id} value={ciudad.id}>
                            {ciudad.nombre}
                        </option>
                    ))}
                </select>
                <div className="mt-5">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                    >
                        Crear Plan
                    </button>
                </div>
                {/* Botón */}

            </form>
        </div>
    );
}
