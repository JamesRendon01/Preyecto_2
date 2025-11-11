from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from db.session import SessionLocal
from models.plan import Plan
from models.reserva import Reserva
from models.turista import Turista
from models.informe import Informe
from datetime import date, datetime, timezone, timedelta

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

COLOMBIA_TZ = timezone(timedelta(hours=-5))

# Dependency para obtener sesión
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Totales generales (planes, reservas, turistas) ---
@router.get("/totales")
def obtener_totales_generales(db: Session = Depends(get_session)):
    total_planes = db.query(func.count(Plan.id)).scalar() or 0
    total_reservas = db.query(func.count(Reserva.id)).scalar() or 0
    total_turistas = db.query(func.count(Turista.id)).scalar() or 0

    return {
        "total_planes": total_planes,
        "total_reservas": total_reservas,
        "total_turistas": total_turistas
    }

# --- Estadísticas de reservas ---
@router.get("/reservas")
def obtener_estadisticas_reservas(db: Session = Depends(get_session)):
    hoy = date.today()

    total_reservas = db.query(func.count(Reserva.id)).scalar() or 0
    reservas_hoy = (
        db.query(func.count(Reserva.id))
        .filter(func.date(Reserva.fecha_reserva) == hoy)
        .scalar()
        or 0
    )
    total_ingresos = db.query(func.sum(Reserva.costo_final)).scalar() or 0

    return {
        "total_reservas": total_reservas,
        "reservas_hoy": reservas_hoy,
        "total_ingresos": total_ingresos
    }


@router.get("/total_planes")
def obtener_totales_planes(db: Session = Depends(get_session)):
    """
    Retorna:
    - total_planes: cantidad total de planes creados.
    - planes_hoy: cantidad de planes creados hoy.
    """
    # 🔹 Fecha actual
    hoy = date.today()

    # 🔹 Total de planes
    total_planes = db.query(func.count(Plan.id)).scalar() or 0

    # 🔹 Planes creados hoy
    planes_hoy = (
        db.query(func.count(Plan.id))
        .filter(func.date(Plan.fecha_creacion) == hoy)
        .scalar()
        or 0
    )

    return {
        "total_planes": total_planes,
        "planes_hoy": planes_hoy
    }

@router.get("/dashboardListarTuristas")
def obtener_totales_turistas(db: Session = Depends(get_session)):
    """
    Retorna:
    - total_turistas: cantidad total de turistas.
    - registrados_hoy: cantidad de turistas registrados hoy.
    """
    # Fecha actual en zona horaria de Colombia
    hoy_colombia = datetime.now(COLOMBIA_TZ).date()

    # Total de turistas
    total_turistas = db.query(func.count(Turista.id)).scalar() or 0

    # Turistas registrados hoy (comparando solo la fecha)
    registrados_hoy = (
        db.query(func.count(Turista.id))
        .filter(func.date(Turista.fecha_registro) == hoy_colombia)
        .scalar()
        or 0
    )

    return {
        "total_turistas": total_turistas,
        "registrados_hoy": registrados_hoy
    }

@router.get("/dashboardListarnformes")
def obtener_totales_informes(db: Session = Depends(get_session)):
    """
    Retorna:
    - total_informes: cantidad total de informes creados.
    - informes_hoy: cantidad de informes creados hoy.
    """
    # Fecha actual en la zona horaria de Colombia
    hoy_colombia = datetime.now(COLOMBIA_TZ).date()

    # Total de informes
    total_informes = db.query(func.count(Informe.id)).scalar() or 0

    # Informes creados hoy (comparando solo la fecha)
    informes_hoy = (
        db.query(func.count(Informe.id))
        .filter(func.date(Informe.fecha_creacion) == hoy_colombia)
        .scalar()
        or 0
    )

    return {
        "total_informes": total_informes,
        "informes_hoy": informes_hoy
    }