import { useNavigate } from "react-router-dom";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function ButtonDelete({ planId, onDeleted }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/plan/delet/${planId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("✅ Plan eliminado correctamente");
                if (onDeleted) onDeleted(planId); // refrescar lista
            } else {
                const error = await response.json();
                message.error("❌ Error al eliminar: " + (error.detail || "Error desconocido"));
            }
        } catch (error) {
            console.error(error);
            message.error("❌ Error de conexión con el servidor");
        }
    };

    const showConfirm = () => {
        // Primera confirmación
        Modal.confirm({
            title: "¿Seguro que deseas eliminar este plan?",
            content: "Se eliminará de la lista de planes.",
            okText: "Sí, eliminar",
            cancelText: "Cancelar",
            icon: <ExclamationCircleOutlined style={{ color: "orange" }} />,
            onOk() {
                // Segunda confirmación
                Modal.confirm({
                    title: "⚠️ Esta acción es irreversible",
                    content: "¿Confirmas eliminar definitivamente este plan?",
                    okText: "Eliminar",
                    okType: "danger",
                    cancelText: "Cancelar",
                    icon: <CloseCircleOutlined style={{ color: "red" }} />,
                    onOk() {
                        handleDelete();
                    },
                });
            },
        });
    };

    return (
        <button
            onClick={showConfirm}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 border-2 border-black font-bold"
        >
            Eliminar
        </button>
    );
}
