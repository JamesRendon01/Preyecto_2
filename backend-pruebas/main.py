from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from security.headers import security_headers

# Importar los controladores
from controllers.turista_controller import router as turista_router
from controllers.administrador_controller import router as admin_router
from controllers.favorito_controller import router as favorito_router
from controllers.informe_controller import router as informe_router
from controllers.plan_controller import router as plan_router
from controllers.ubicacion_controller import router as ubicacion_router
from controllers.reserva_controller import router as reserva_router
from controllers.persona_reserva_controller import router as persona_reserva_router
from controllers.ciudad_controller import router as ciudad_router
from controllers.filtro_controller import router as filtro_router

app = FastAPI(title="API de Reservas Turísticas", version="1.0")


# 🌐 CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4000",
    "http://127.0.0.1:4000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧱 Archivos estáticos
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 🛡️ Middleware (DEBE IR DESPUÉS)
app.middleware("http")(security_headers)

# 🔗 Rutas
app.include_router(turista_router)
app.include_router(admin_router)
app.include_router(favorito_router)
app.include_router(informe_router)
app.include_router(plan_router)
app.include_router(ubicacion_router)
app.include_router(reserva_router)
app.include_router(ciudad_router)
app.include_router(filtro_router)
