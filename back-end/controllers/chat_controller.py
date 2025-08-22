from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.chat import Chat
from dtos.chat_dto import chatCreateDTO
from dtos.chat_dto import chatUpdateDTO
from db.session import SessionLocal


#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
#rutas
router = APIRouter( prefix='/chat' )


@router.get('/')
def listar_hoteles(
                db: session = Depends(get_session)
                ):
    lc = db.query(Chat).all()
    if not lc:
         raise HTTPException(status_code=404, detail="No hay Chats registrados")
    return lc

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    lc = db.query(Chat).filter(Chat.id == id).first()
    if not lc:
         raise HTTPException(status_code=404, detail="Chat no encontrado")
    return lc


#Ruta post
@router.post("/")
def crear_chat(nuevo_chat: chatCreateDTO, db:session = Depends(get_session)):
            
                # Validar que el correo o identificación no se repita
            existente = db.query(Chat).filter(
                (Chat.id_turista == nuevo_chat.id_turista)

            ).first()

            if existente:
                raise HTTPException(status_code=400, detail="Chat ya existe")
            #crear categoria
            nc = Chat(
                    estado = nuevo_chat.estado,
                    mensaje = nuevo_chat.mensaje,
                    id_administrador = nuevo_chat.id_administrador,
                    id_turista = nuevo_chat.id_turista
            )
            #inserto la nueva categoria
            db.add(nc)
            #confirmo la transaccion manualmente
            db.commit()
            #nueva categoria la dispongo en memoria
            db.refresh(nc)
            return nc

@router.put('/{id}')
def actualizar_chat(
                id: int, datos: chatCreateDTO,
                db: session = Depends(get_session)
                ):
    ac = db.query(Chat).filter(Chat.id == id).first()
    if not ac:
        raise HTTPException(status_code=404, detail="Chat no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(ac, key, value)
    db.commit()
    db.refresh(ac)
    return "Se modifico exitosamente el chat con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_turista(
                id: int,
                db: session = Depends(get_session)
                ):
    ec = db.query(Chat).filter(Chat.id == id).first()
    if not ec:
         raise HTTPException(status_code=404, detail="Chat no encontrado")
    db.delete(ec)
    db.commit()
    return "Se elimino con exito el chat con el Id:" + str(id)
