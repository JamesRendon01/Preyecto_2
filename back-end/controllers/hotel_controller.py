from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.hotel import Hotel
from dtos.hotel_dto import hotelCreateDTO
from dtos.hotel_dto import hotelUpdateDTO
from db.session import SessionLocal

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
#objeto que contiene este grupo
#rutas
router = APIRouter( prefix='/hotel' )

#crear cada rutaen el grupo

@router.get('/')
def listar_hoteles(
                db: session = Depends(get_session)
                ):
    lh = db.query(Hotel).all()
    if not lh:
         raise HTTPException(status_code=404, detail="No hay hoteles registrados")
    return lh

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    lh = db.query(Hotel).filter(Hotel.id == id).first()
    if not lh:
         raise HTTPException(status_code=404, detail="Hotel no encontrado")
    return lh

#Ruta post
@router.post("/")
def crear_hoteles(nuevo_hotel: hotelCreateDTO, db:session = Depends(get_session)):
            # Validar que el correo o identificación no se repita
            existente = db.query(Hotel).filter(
                (Hotel.direccion == nuevo_hotel.direccion)
            ).first()

            if existente:
                raise HTTPException(status_code=400, detail="Hotel ya existe")

            #crear categoria
            nh = Hotel(
                nombre = nuevo_hotel.nombre,
                ciudad = nuevo_hotel.ciudad,
                direccion = nuevo_hotel.direccion
            )
            #inserto la nueva categoria
            db.add(nh)
            #confirmo la transaccion manualmente
            db.commit()
            #nueva categoria la dispongo en memoria
            db.refresh(nh)
            return nh

#Ruta update
@router.put('/{id}')
def actualizar_hoteles(
                id: int, datos: hotelUpdateDTO,
                db: session = Depends(get_session)
                ):
    ah = db.query(Hotel).filter(Hotel.id == id).first()
    if not ah:
        raise HTTPException(status_code=404, detail="Hotel no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(ah, key, value)
    db.commit()
    db.refresh(ah)
    return "Se modifico exitosamente el hotel con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_hoteles(
                id: int,
                db: session = Depends(get_session)
                ):
    eh = db.query(Hotel).filter(Hotel.id == id).first()
    if not eh:
         raise HTTPException(status_code=404, detail="Hotel no encontrado")
    db.delete(eh)
    db.commit()
    return "Se elimino con exito el hotel con el Id:" + str(id)