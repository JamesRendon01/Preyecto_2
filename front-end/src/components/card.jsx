import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { Heart } from 'lucide-react';

const { Meta } = Card;

const CardComponent = ({ showButton }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/plan/card_planes")
      .then((res) => res.json())
      .then((data) => {
      setPlans(data);
    })
      .catch((err) => console.error("Error cargando planes:", err));
  }, []);

  return (
    <Row gutter={[16, 16]} className="row">
      {Array.isArray(plans) && plans.length > 0 ? (
        plans.map((plan) => (
          <Col span={6} key={plan.id}>
            <Card
              className="card"
              hoverable
              cover={<img src={`http://localhost:8000${plan.imagen}`} alt={plan.nombre} />}
            >
              <Meta title={plan.nombre} description={plan.descripcion} />
              {showButton && (
                <div className="card-button-wrapper">
                  <Button className="reserve-btn" type="primary" shape="round">
                    Reservar
                  </Button>
                  <button className="button-fav">
                    <Heart size={20} color="#000000" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </Card>
          </Col>
        ))
      ) : (
        <p>No hay planes disponibles</p>
      )}
    </Row>
  );
};

export default CardComponent;
