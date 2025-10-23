// context/breadcrumb_context.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: "Inicio", path: "/inicio" },
  ]);

  const location = useLocation();
  const navigationType = useNavigationType();

  // 🧭 Actualiza los breadcrumbs al cambiar de ruta
  useEffect(() => {
    const path = location.pathname;

    // Si estamos en la página de inicio, solo muestra "Inicio"
    if (path === "/inicio") {
      setBreadcrumbItems([{ title: "Inicio", path }]);
      return;
    }

    // Si el usuario navega hacia atrás (POP), limpia el breadcrumb actual
    if (navigationType === "POP") {
      setBreadcrumbItems((prev) => prev.filter((b) => b.path !== path));
    }
  }, [location.pathname, navigationType]);

  // ✅ Memorizar las funciones evita recrearlas en cada render
  const addBreadcrumb = useCallback((item) => {
    setBreadcrumbItems((prev) => {
      // Evita duplicados
      if (prev.some((b) => b.path === item.path)) return prev;
      return [...prev, item];
    });
  }, []);

  const resetBreadcrumb = useCallback(() => {
    setBreadcrumbItems([{ title: "Inicio", path: "/inicio" }]);
  }, []);

  return (
    <BreadcrumbContext.Provider
      value={{ breadcrumbItems, addBreadcrumb, resetBreadcrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
