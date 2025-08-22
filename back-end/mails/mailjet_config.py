from mailjet_rest import Client
import os
from dotenv import load_dotenv

load_dotenv()  # Carga las variables de entorno desde .env

api_key = os.getenv("MAILJET_API_KEY")
api_secret = os.getenv("MAILJET_API_SECRET")

mailjet = Client(auth=(api_key, api_secret), version='v3.1')


def enviar_correo_recuperacion(destinatario, token):
    # URL con el token (ajusta la URL según tu frontend)
    enlace = f"http://localhost:5500/nueva_contrasena.html?token={token}"

    # Configuración del correo
    data = {
        'Messages': [
            {
                "From": {
                    "Email": "rendondavid328@gmail.com",
                    "Name": "Escapade Parfaite"
                },
                "To": [
                    {
                        "Email": destinatario,
                        "Name": "Usuario"
                    }
                ],
                "Subject": "Recuperación de contraseña",
                "TextPart": f"Para recuperar tu contraseña haz clic en este enlace: {enlace}",
                "HTMLPart": f"""
                    <h3>Recuperación de contraseña</h3>
                    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                    <p><a href="{enlace}">{enlace}</a></p>
                """
            }
        ]
    }

    # Envío del correo
    response = mailjet.send.create(data=data)

    # Depuración
    print("STATUS:", response.status_code)
    print("RESPUESTA:", response.json())

    return response.status_code == 200
