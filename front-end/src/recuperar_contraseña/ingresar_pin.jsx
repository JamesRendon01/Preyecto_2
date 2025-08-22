import { useState } from "react";
import { Link } from "react-router-dom";

export default function IngresarPin() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Mover al siguiente input automáticamente
      if (value !== "" && index < 5) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigo = pin.join("");
    const correo = localStorage.getItem("correoRecuperacion");

    try {
      const res = await fetch("http://localhost:8000/administrador/verificar-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, pin: codigo }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("PIN correcto ✅");
        window.location.href = "/nueva-contrasena";
      } else {
        alert("PIN inválido ❌");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor ❌");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-400 to-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex flex-col items-center py-4 relative">

        <img
          className="w-52 h-28 mt-2 absolute left-155 top-0"
          src="/img/logo.png"
          alt="logo"
        />

        <img src="/img/esquina_sup_derecha.png" alt="" className=" z-13 w-40 h-40  absolute left-215 top-107" />
        <img src="/img/esquina_sup_izquierda.png" alt="" className=" z-13 w-40 h-40  absolute left-97 top-35" />
        <img src="/img/Candado.png" alt="" className="z-13 w-20 h-20 absolute left-198 top-75"/>
        <img src="/img/Candado.png" alt="" className="z-13 w-20 h-20 absolute left-140 top-75"/>

        <div className="w-80 md:w-130 h-25 bg-[#9e9e9e] border-2 border-black p-6 [border-radius:20px] text-white absolute right-130 top-46 z-12">
            <h1 className="font-serif font-bold text-2xl text-black text-center absolute top-4">
                Te enviamos un correo electronico con un pin, porfavor ingrese el codigo!
            </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col md:flex-row items-center mt-10 space-y-8 md:space-y-0 md:space-x-8">
        {/* Formulario */}
        <div className="w-80 md:w-128 h-80 bg-[#003366] border-2 border-black p-6 [border-radius:30px] text-white absolute right-123 top-56 z-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-6xl font-bold mb-4 absolute top-20 left-52">PIN</h1>

             {/* Inputs de PIN */}
            <div className="flex gap-3 mb-6">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  className="w-17 h-19 text-center text-5xl text-black bg-gray-200 border rounded-md mt-35"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className=" w-30 bg-[#9e9e9e] text-black font-serif font-bold py-2 rounded-full mt-4 hover:bg-gray-300 font-playfair border-2 border-black absolute left-50 top-60"
            >
              Continuar
            </button>
          </form>
        </div>

        {/* Contenedor*/}
        <div className="w-80 md:w-156 h-115 bg-white border-4 border-[#5e637e] p-6 [border-radius:30px] flex flex-col items-center absolute left-100 top-33">
          <div></div>
        </div>
      </main>
    </div>
  );
}
