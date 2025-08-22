from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.hotel_controller import router as hotel_router
from controllers.turista_controller import router as turista_router
from controllers.administrador_controller import router as admin_router
from controllers.chat_controller import router as chat_router
from controllers.favorito_controller import router as favorito_router
from controllers.informe_controller import router as informe_router
from controllers.instancia_controller import router as instancia_router
from controllers.notificacion_controller import router as notificacion_router
from controllers.plan_controller import router as plan_router
from controllers.ruta_controller import router as ruta_router
from controllers.ubicacion_controller import router as ubicacion_router
from controllers.reserva_controller import router as reserva_router

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conectar todos los grupos de rutas
app.include_router(hotel_router)
app.include_router(turista_router)
app.include_router(admin_router)
app.include_router(chat_router)
app.include_router(favorito_router)
app.include_router(informe_router)
app.include_router(instancia_router)
app.include_router(notificacion_router)
app.include_router(plan_router)
app.include_router(ruta_router)
app.include_router(ubicacion_router)
app.include_router(reserva_router)
