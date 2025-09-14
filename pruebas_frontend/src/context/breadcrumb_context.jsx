// BreadcrumbContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: "Home", path: "/dashboard-administrador" },
  ]);

  
  const location = useLocation();
  const navigationType = useNavigationType(); // detecta POP, PUSH, REPLACE

  // Cada vez que cambia la ruta, actualizar breadcrumb
  useEffect(() => {
    const path = location.pathname;

    if (path === "/dashboard-administrador") {
      setBreadcrumbItems([{ title: "Home", path }]);
      return;
    }

    if (navigationType === "POP") {
      // Usuario retrocedió: eliminar la última página si coincide con el path actual
      setBreadcrumbItems((prev) => prev.filter((b) => b.path !== path));
    }
  }, [location.pathname, navigationType]);

  const addBreadcrumb = (item) => {
    setBreadcrumbItems((prev) => {
      // Evitar que el mismo path se agregue otra vez
      if (prev.some((b) => b.path === item.path)) return prev;

      // Mantener el orden de ingreso
      return [...prev, item];

    });
  };

  const resetBreadcrumb = () => {
    setBreadcrumbItems([{ title: "Home", path: "/dashboard-administrador" }]);
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbItems, addBreadcrumb, resetBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
