// context/breadcrumb_context.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: "Dashboard", path: "/dashboard-administrador" },
  ]);

  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/dashboard-administrador") {
      setBreadcrumbItems([{ title: "Dashboard", path }]);
      return;
    }

    if (navigationType === "POP") {
      setBreadcrumbItems((prev) => prev.filter((b) => b.path !== path));
    }
  }, [location.pathname, navigationType]);

  const addBreadcrumb = (item) => {
    setBreadcrumbItems((prev) => {
      if (prev.some((b) => b.path === item.path)) return prev;
      return [...prev, item];
    });
  };

  const resetBreadcrumb = () => {
    setBreadcrumbItems([{ title: "Dashboard", path: "/dashboard-administrador" }]);
  };

  return (
    <BreadcrumbContext.Provider
      value={{ breadcrumbItems, addBreadcrumb, resetBreadcrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
