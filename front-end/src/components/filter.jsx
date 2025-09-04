import React, { useState, useEffect } from "react";

const FiltroTabs = ({ onChange }) => {
  const [datos, setDatos] = useState([]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState({
    pais: "",
    ciudad: "",
    lugar: "",
  });

  // 🔹 Cargar datos desde el backend al montar el componente
  useEffect(() => {
    fetch("http://127.0.0.1:8000/filtro")
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error("Error al cargar filtros:", err));
  }, []);

  const handleSelect = (key, value) => {
    const nuevoFiltro = { ...filtroSeleccionado, [key]: value };

    // Resetear filtros dependientes
    if (key === "pais") {
      nuevoFiltro.ciudad = "";
      nuevoFiltro.lugar = "";
    }
    if (key === "ciudad") {
      nuevoFiltro.lugar = "";
    }

    setFiltroSeleccionado(nuevoFiltro);

    if (onChange) onChange(nuevoFiltro);
  };

  // 🔹 Generar listas filtradas
  const paises = [...new Set(datos.map(d => d.pais || ""))];
  const ciudades = [
    ...new Set(
      datos
        .filter(d => !filtroSeleccionado.pais || d.pais === filtroSeleccionado.pais)
        .map(d => d.ciudad || "")
    ),
  ];
  const lugares = [
    ...new Set(
      datos
        .filter(
          d =>
            (!filtroSeleccionado.pais || d.pais === filtroSeleccionado.pais) &&
            (!filtroSeleccionado.ciudad || d.ciudad === filtroSeleccionado.ciudad)
        )
        .map(d => d.lugar || "")
    ),
  ];
  const hoteles = [
    ...new Set(
      datos
        .filter(
          d =>
            (!filtroSeleccionado.pais || d.pais === filtroSeleccionado.pais) &&
            (!filtroSeleccionado.ciudad || d.ciudad === filtroSeleccionado.ciudad) &&
            (!filtroSeleccionado.lugar || d.lugar === filtroSeleccionado.lugar)
        )
    ),
  ];

  return (
    <div className="filtro-tabs-container">
      <div className="filtro-selects">
        {/* País */}
        <select
          value={filtroSeleccionado.pais}
          onChange={(e) => handleSelect("pais", e.target.value)}
          required
        >
          <option value="">País</option>
          {paises.map((pais, index) => (
            <option key={index} value={pais}>{pais}</option>
          ))}
        </select>

        {/* Ciudad */}
        <select
          value={filtroSeleccionado.ciudad}
          onChange={(e) => handleSelect("ciudad", e.target.value)}
          disabled={!filtroSeleccionado.pais}  // habilita solo cuando hay país
          required
        >
          <option value="">Ciudad</option>
          {ciudades.map((ciudad, index) => (
            <option key={index} value={ciudad}>{ciudad}</option>
          ))}
        </select>

        {/* Lugar */}
        <select
          value={filtroSeleccionado.lugar}
          onChange={(e) => handleSelect("lugar", e.target.value)}
          disabled={!filtroSeleccionado.ciudad}
          required
        >
          <option value="">Lugar</option>
          {lugares.map((lugar, index) => (
            <option key={index} value={lugar}>{lugar}</option>
          ))}
        </select>

      </div>
    </div>
  );
};

export default FiltroTabs;
