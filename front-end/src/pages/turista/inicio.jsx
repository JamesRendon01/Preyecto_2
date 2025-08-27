// pages/HomePage.jsx
import CardCarousel from "../../components/CardCarousel.jsx";
import Header from "../../components/header.jsx";

export default function HomePage() {
  return (
    <div className="inicio">
      <div className="title"><Header />
      <button className="boton">hasdag</button>
      </div>
      <CardCarousel interval={4000} />
    </div>
  );
}
