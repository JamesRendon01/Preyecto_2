export default function Header({ titulo }) {
  return (
    <header className="header-container">
      {/* Imagen animada del avión */}
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

      {/* Título dinámico */}
      <h1 className="header-title">
        {titulo}
      </h1>
    </header>
  );
}