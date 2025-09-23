import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {message } from "antd";


export default function FormUpdatePlans() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Inicializamos el estado con valores por defecto
    const [plan, setPlan] = useState({
        nombre: "",
        descripcion_corta: "",
        descripcion: "",
        costo_persona: "",
        id_ciudad: "",
        imagen: null
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/plan/listar-plan-id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPlan({
                    nombre: data.nombre || "",
                    descripcion_corta: data.descripcion_corta || "",
                    descripcion: data.descripcion || "",
                    costo_persona: data.costo_persona || "",
                    id_ciudad: data.id_ciudad || "",
                    imagen: data.imagen || null
                });
                setLoading(false);
            })
            .catch((err) => console.error("Error al cargar el plan", err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value });
    };

    const handleFileChange = (e) => {
        setPlan({ ...plan, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", plan.nombre);
        formData.append("descripcion_corta", plan.descripcion_corta);
        formData.append("descripcion", plan.descripcion);
        formData.append("costo_persona", plan.costo_persona);
        formData.append("id_ciudad", plan.id_ciudad);

        if (plan.imagen instanceof File) {
            formData.append("imagen", plan.imagen);
        }

        try {
            const res = await fetch(`http://localhost:8000/plan/update/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (res.ok) {
                message.success("Plan actualizado correctamente");
                navigate("/listar_planes_admin");
            } else {
                alert("Error al actualizar el plan");
            }
        } catch (error) {
            console.error("Error en la actualizacion:", error);
            message.error("Error de conexion al servidor");
        }
    };

    if (loading) return <p className="text-center mt-10">Cargando...</p>;
    if (!plan) return <p className="text-center mt-10">No se encontró el Plan</p>;

    return (
        <div className="p-6 flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-6 w-96"
            >
                <h2 className="text-xl font-bold mb-4 text-center">
                    Editar Plan #{id}
                </h2>

                {/* Imagen */}
                <label className="block mb-2 font-medium">Imagen</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                {!(plan.imagen instanceof File) && plan.imagen && (
                    <img
                        src={`http://localhost:8000/uploads/planes_img/${plan.imagen}`} 
                        alt="Imagen actual"
                        className="w-full h-40 object-cover rounded mb-4"
                    />
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

                {/* Descripción corta */}
                <label className="block mb-2 font-medium">Descripción Corta</label>
                <textarea
                    name="descripcion_corta"
                    value={plan.descripcion_corta}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Descripción larga */}
                <label className="block mb-2 font-medium">Descripción</label>
                <textarea
                    name="descripcion"
                    value={plan.descripcion}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                />

                {/* Precio */}
                <label className="block mb-2 font-medium">Precio</label>
                <input
                    type="number"
                    name="costo_persona"
                    value={plan.costo_persona}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Ciudad */}
                <label className="block mb-2 font-medium">Ciudad</label>
                <input
                    type="text"
                    name="id_ciudad"
                    value={plan.id_ciudad}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {/* Botón */}
                <button
                    type="submit"
                    className="bg-fondo text-black px-4 py-2 rounded hover:bg-green-600 w-full"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
}
