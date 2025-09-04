export default function Header({ titulo, rol }) {
  return (
    <header className={`header-container ${rol}`}>

      {(rol === "turista" || rol === "admin") &&(
        <>
          <div
            className="header-avion"
            style={{ backgroundImage: "url('/img/avion.gif')" }}
          ></div>

          {/* Logo */}
          <img
            className="header-logo"
            src="/img/logo.png"
            alt="logo"
          />

        </>
      )}

      {rol === "inicio" &&(
        <>
          
          {/* Logo */}
          <img
            className="header-logo"
            src="/img/logo.png"
            alt="logo"
          />

        </>
      )}
      <h1 className="header-title">
        {titulo}
      </h1>
    </header>
  );
}