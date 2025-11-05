# routers/reserva.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from db.session import SessionLocal
from models.reserva import Reserva
from models.plan import Plan
from models.ciudad import Ciudad

router = APIRouter(prefix="/graficas")

# ✅ Dependencia para obtener sesión
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================================
# 📊 Ciudades con más reservas
# ==========================================================
@router.get("/ciudades_mas_reservas")
def ciudades_mas_reservas(db: Session = Depends(get_session)):
    """
    Retorna las ciudades con mayor cantidad de reservas.
    """
    resultados = (
        db.query(
            Ciudad.nombre.label("ciudad"),
            func.count(Reserva.id).label("total_reservas")
        )
        .join(Plan, Plan.id == Reserva.id_plan)
        .join(Ciudad, Ciudad.id == Plan.id_ciudad)
        .group_by(Ciudad.nombre)
        .order_by(func.count(Reserva.id).desc())
        .all()
    )

    data = [{"ciudad": r.ciudad, "total_reservas": r.total_reservas} for r in resultados]
    return {"data": data}


# ==========================================================
# 📆 Estadísticas de planes creados por mes
# ==========================================================
@router.get("/estadisticas")
def estadisticas_planes(db: Session = Depends(get_session)):
    resultados = (
        db.query(
            func.date_format(Plan.fecha_creacion, "%Y-%m").label("mes"),
            func.count(Plan.id).label("total_planes"),
        )
        .group_by(func.date_format(Plan.fecha_creacion, "%Y-%m"))
        .order_by(func.date_format(Plan.fecha_creacion, "%Y-%m"))
        .all()
    )

    return {"data": [{"mes": r.mes, "total_planes": r.total_planes} for r in resultados]}


# ==========================================================
# 🗓️ Cantidad de reservas por mes
# ==========================================================
@router.get("/reservas_por_mes")
def reservas_por_mes(db: Session = Depends(get_session)):
    """
    Retorna la cantidad total de reservas agrupadas por mes.
    """
    resultados = (
        db.query(
            func.date_format(Reserva.fecha_reserva, "%Y-%m").label("mes"),
            func.count(Reserva.id).label("total_reservas")
        )
        .group_by(func.date_format(Reserva.fecha_reserva, "%Y-%m"))
        .order_by(func.date_format(Reserva.fecha_reserva, "%Y-%m"))
        .all()
    )

    data = [{"mes": r.mes, "total_reservas": r.total_reservas} for r in resultados]
    return {"data": data}
