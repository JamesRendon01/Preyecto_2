import { useEffect, useState } from "react";

// Componente que renderiza filtros dependientes
const FiltroTabs = ({ onChange }) => {
  // Estado para guardar los dato recibidos desde el backend
  const [datos, setDatos] = useState([]);


  // Estado del filtro seleccionado
  const [filtroSeleccionado, setFiltroSeleccionado] = useState({
    pais: "",
    ciudad: "",
    lugar: "",
  });

  // Carga los filtros desde el backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/filtro")
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error("Error al cargar filtros:", err));
  }, []);

  // Maneja cmabios en cada select
  const handleSelect = (key, value) => {
    const nuevoFiltro = { ...filtroSeleccionado, [key]: value };

    // si se cambia en País se reinicia en ciudad y lugar
    if (key === "pais") {
      nuevoFiltro.ciudad = "";
      nuevoFiltro.lugar = "";
    }
    // si se cambia en Ciudad se reinicia en lugar

    if (key === "ciudad") {
      nuevoFiltro.lugar = "";
    }

    setFiltroSeleccionado(nuevoFiltro);
    if (onChange) onChange(nuevoFiltro);
  };

  //Lista de paises únicos
  const paises = [...new Set(datos.map(d => d.pais || ""))];

  // Lista Ciudades filtradas por País
  const ciudades = [
    ...new Set(
      datos
        .filter(d => !filtroSeleccionado.pais || d.pais === filtroSeleccionado.pais)
        .map(d => d.ciudad || "")
    ),
  ];

  //Lista de lugares filtrados por País y Ciudad
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

  //Renderiza el Filtro
  return (
    //Divisor principal
    <div className="flex flex-col flex-1 mt-2">
      {/* Divisor donde se encuentra el Filtro */}
      <div className="flex gap-2 font-title">
        {/* Select de País */}
        <select
          value={filtroSeleccionado.pais}
          onChange={(e) => handleSelect("pais", e.target.value)}
          required
          className={`bg-white text-black px-4 py-2 rounded-4xl border-2 border-black cursor-pointer font-bold text-[15px] w-[140px] h-[40px] text-center
                      focus:outline-none focus:shadow-[0_0_4px_rgba(44,44,229,0.4)]
                      valid:bg-white valid:text-black valid:border-black
                      disabled:opacity-50 disabled:cursor-not-allowed sm:w-20 lg:w-30`}
        >
          <option value="">País</option>
          {paises.map((pais, index) => (
            <option key={index} value={pais}>{pais}</option>
          ))}
        </select>

        {/* Select de Ciudad */}
        <select
          value={filtroSeleccionado.ciudad}
          onChange={(e) => handleSelect("ciudad", e.target.value)}
          disabled={!filtroSeleccionado.pais}
          required
          className={`bg-white text-black px-4 py-2 rounded-4xl border-2 border-black cursor-pointer font-bold text-[15px] w-[140px] h-[40px] text-center
                      focus:outline-none focus:shadow-[0_0_4px_rgba(44,44,229,0.4)]
                      valid:bg-white valid:text-black valid:border-black
                      disabled:opacity-50 disabled:cursor-not-allowed sm:w-20 lg:w-30`}
        >
          <option value="">Ciudad</option>
          {ciudades.map((ciudad, index) => (
            <option key={index} value={ciudad}>{ciudad}</option>
          ))}
        </select>

        {/* Select de Lugar */}
        <select
          value={filtroSeleccionado.lugar}
          onChange={(e) => handleSelect("lugar", e.target.value)}
          disabled={!filtroSeleccionado.ciudad}
          required
          className={`bg-white text-vlack px-4 py-2 rounded-4xl border-2 border-black cursor-pointer font-bold text-[15px] w-[140px] h-[40px] text-center
                      focus:outline-none focus:shadow-[0_0_4px_rgba(44,44,229,0.4)]
                      valid:bg- valid:text-black valid:border-black
                      disabled:opacity-50 disabled:cursor-not-allowed sm:w-20 lg:w-30`}
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
