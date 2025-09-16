from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.turista_controller import router as turista_router
from controllers.administrador_controller import router as admin_router
from controllers.favorito_controller import router as favorito_router
from controllers.informe_controller import router as informe_router
from controllers.plan_controller import router as plan_router
from controllers.ubicacion_controller import router as ubicacion_router
from controllers.reserva_controller import router as reserva_router
from controllers.ciudad_controller import router as ciudad_router
from controllers.filtro_controller import router as filtro_router
from fastapi.staticfiles import StaticFiles
from security.headers import security_headers

app = FastAPI()

app.middleware("http")(security_headers)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

origins = [
    "http://localhost:5173",   # Vite por defecto
    "http://localhost:3000",   # CRA por defecto
    "http://localhost:4000",   # el que te está apareciendo en el error
    "http://192.168.20.62:3000", # si pruebas con IP local
    "http://192.168.20.62:4000"  # si pruebas con IP local en otro puerto
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conectar todos los grupos de rutas
app.include_router(turista_router)
app.include_router(admin_router)
app.include_router(favorito_router)
app.include_router(informe_router)
app.include_router(ubicacion_router)
app.include_router(reserva_router)
app.include_router(ciudad_router)
app.include_router(plan_router)
app.include_router(filtro_router)
