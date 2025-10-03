import { useState, useEffect } from "react";
import Footer from "./footer";
import Nav from "./nav";

export default function CardReservas() {
    
      const [query, setQuery] = useState("");

  return (
    
    <div>
        <header>
            <Nav query={query} setQuery={setQuery} showFilter={false} showNavbar={true} showTitleMisReservas={true}/>
        </header>

        <div>
            <p>mis reservas</p>
        </div>

      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </div>
  );
}
