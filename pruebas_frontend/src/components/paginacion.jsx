import React, { useState } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/reset.css';

const Paginacion = () => {
  const [current, setCurrent] = useState(1); // mejor iniciar en 1

  const onChange = (page) => {
    console.log("Página seleccionada:", page);
    setCurrent(page);
  };

  return (
    <div className="flex flex-col items-center mb-20">


      {/* Paginación */}
      <Pagination
        current={current}
        onChange={onChange}
        total={50}
        className="bg-white rounded shadow p-2"
      />
    </div>
  );
};

export default Paginacion;
