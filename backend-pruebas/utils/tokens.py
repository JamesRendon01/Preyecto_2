from itsdangerous import URLSafeTimedSerializer
import os

SECRET_KEY = os.getenv("SECRET_KEY", "CLAVE-SUPER-SECRETA")
serializer = URLSafeTimedSerializer(SECRET_KEY)

def generar_token(correo):
    return serializer.dumps(correo)

def verificar_token(token, expiration=3600):
    try:
        return serializer.loads(token, max_age=expiration)
    except Exception:
        return None