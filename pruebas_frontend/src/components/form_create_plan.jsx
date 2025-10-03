import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormCrearPlan() {
    const navigate = useNavigate();

    const [plan, setPlan] = useState({
        nombre: "",
        descripcion_corta: "",
        descripcion: "",
        costo_persona: "",
        id_ciudad: "",
        id_informe: "",
        imagen: null
    });

    const [preview, setPreview] = useState(null); // Vista previa de la imagen

    // Manejo de inputs de texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value });
    };

    // Manejo de imagen
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

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!plan.nombre.trim()) {
            alert("El nombre es obligatorio");
            return;
        }
        if (!plan.descripcion_corta.trim()) {
            alert("La descripción corta es obligatoria");
            return;
        }
        if (!plan.descripcion.trim()) {
            alert("La descripción es obligatoria");
            return;
        }
        if (!plan.costo_persona) {
            alert("El precio por persona es obligatorio");
            return;
        }

        const formData = new FormData();
        formData.append("nombre", plan.nombre);
        formData.append("descripcion_corta", plan.descripcion_corta);
        formData.append("descripcion", plan.descripcion);

        // Convertimos costo_persona a float
        formData.append("costo_persona", parseFloat(plan.costo_persona));

        // Solo enviamos id_ciudad o id_informe si tienen valor numérico válido
        if (plan.id_ciudad && !isNaN(plan.id_ciudad)) {
            formData.append("id_ciudad", Number(plan.id_ciudad));
        }
        if (plan.id_informe && !isNaN(plan.id_informe)) {
            formData.append("id_informe", Number(plan.id_informe));
        }

        // Imagen
        if (plan.imagen instanceof File) {
            formData.append("imagen", plan.imagen);
        }

        // DEBUG: ver qué estamos enviando
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const res = await fetch("http://localhost:8000/plan/crear-plan", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Plan creado correctamente");
                navigate("/listar_planes_admin");
            } else {
                const errorData = await res.json();
                alert(errorData.detail || "Error al crear el plan");
            }
        } catch (error) {
            console.error("Error en la creación:", error);
            alert("Error de conexión al servidor");
        }
    };


    return (
        <div className="p-6 flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Crear Nuevo Plan</h2>

                {/* Imagen */}
                <label className="block mb-2 font-medium">Imagen</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
                {preview && (
                    <img src={preview} alt="Vista previa" className="mb-4 w-full h-48 object-cover rounded" />
                )}

                {/* Nombre */}
                <label className="block mb-2 font-medium">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={plan.nombre}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Descripción */}
                <label className="block mb-2 font-medium">Descripción Corta</label>
                <textarea
                    name="descripcion_corta"
                    value={plan.descripcion_corta}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                <label className="block mb-2 font-medium">Descripción</label>
                <textarea
                    name="descripcion"
                    value={plan.descripcion}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Precio */}
                <label className="block mb-2 font-medium">Precio por Persona</label>
                <input
                    type="number"
                    name="costo_persona"
                    value={plan.costo_persona}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Ciudad */}
                <label className="block mb-2 font-medium">ID Ciudad</label>
                <input
                    type="text"
                    name="id_ciudad"
                    value={plan.id_ciudad}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                />

                {/* Botón */}
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                >
                    Crear Plan
                </button>
            </form>
        </div>
    );
}
