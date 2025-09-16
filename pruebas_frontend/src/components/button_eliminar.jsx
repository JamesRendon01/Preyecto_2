import { useNavigate } from "react-router-dom";

export default function ButtonDelete({ planId, onDeleted }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        // Primera confirmación
        const confirm1 = window.confirm("¿Seguro que deseas eliminar este plan?");
        if (!confirm1) return;

        // Segunda confirmación
        const confirm2 = window.confirm("⚠️ Esta acción es irreversible. ¿Confirmas eliminar?");
        if (!confirm2) return;

        try {
            const response = await fetch(`http://localhost:8000/plan/delet/${planId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("✅ Plan eliminado correctamente");
                if (onDeleted) onDeleted(planId); // callback para refrescar la lista en el padre
            } else {
                const error = await response.json();
                alert("❌ Error al eliminar: " + (error.detail || "Error desconocido"));
            }
        } catch (error) {
            console.error(error);
            alert("❌ Error de conexión con el servidor");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 border-2 border-black font-bold"
        >
            Eliminar
        </button>
    );
}
