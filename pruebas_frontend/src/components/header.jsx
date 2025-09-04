//Contiene unos props definidos:
//  *titulo: El texto que mostrara como encabezado
//  *rol: Define que alementos adicionales se renderizan
export default function Header({ titulo, rol }) {
  return (
    //Contenedor principal header
    //se concadena con rol
    <header className={`w-full flex items-center relative${rol}`}>

      {/* Caso: Turista o Admin */}
      {(rol === "turista" || rol === "admin") && (
        <>
          {/* Avion animado */}
          <div
            className="w-32 h-20 bg-cover absolute left-40"
            style={{ backgroundImage: "url('/img/avion.gif')" }}
          ></div>

          {/* Logo */}
          <img
            className="w-48 h-24 mt-2 absolute left-0 top-0"
            src="/img/logo.png"
            alt="logo"
          />

        </>
      )}

      {/* Caso: inicio */}
      {rol === "inicio" && (
        <>

          {/* Logo */}
          <img
            className="w-48 h-24 absolute left-0 top-0"
            src="/img/logo.png"
            alt="logo"
          />

        </>
      )}

      {/* Titulo del header */}
      <h1 className={'font-inter text-6xl font-bold text-black'}>
        {titulo}
      </h1>
    </header>
  );
}