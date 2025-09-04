from sqlalchemy.orm import Session
from db.session import SessionLocal 
from models.administrador import Administrador
from utils.security import hash_password 

def convertir_contrasenas():
    db: Session = SessionLocal()

    administradores = db.query(Administrador).all()

    for admin in administradores:
        if not admin.contrasena.startswith("$2b$"):
            print(f"Convirtiendo contraseña de: {admin.correo}")
            admin.contrasena = hash_password(admin.contrasena)

    db.commit()
    db.close()
    print("✔️ Contraseñas convertidas exitosamente.")

if __name__ == "__main__":
    convertir_contrasenas()
