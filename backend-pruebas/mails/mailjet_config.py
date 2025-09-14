from mailjet_rest import Client
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MAILJET_API_KEY")
api_secret = os.getenv("MAILJET_API_SECRET")

mailjet = Client(auth=(api_key, api_secret), version='v3.1')


def enviar_correo_recuperacion(destinatario, pin):
    data = {
        'Messages': [
            {
                "From": {"Email": "escapadeparfaite@gmail.com", "Name": "Escapade Parfaite"},
                "To": [{"Email": destinatario, "Name": "Usuario"}],
                "Subject": "Recuperación de contraseña",
                "TextPart": f"Tu código de recuperación es: {pin}",
                "HTMLPart": f"<h3>Recuperación de contraseña</h3><p>Tu código de recuperación es: <b>{pin}</b></p>"
            }
        ]
    }

    try:
        response = mailjet.send.create(data=data)
        body = response.json()
        status = body.get('Messages', [{}])[0].get('Status', 'error')
        if status.lower() == 'success':
            return True
        else:
            print("Error enviando correo:", body)
            return False
    except Exception as e:
        print("Excepción al enviar correo:", e)
        return False

from mailjet_rest import Client
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MAILJET_API_KEY")
api_secret = os.getenv("MAILJET_API_SECRET")

mailjet = Client(auth=(api_key, api_secret), version='v3.1')


def enviar_correo_bienvenida(destinatario, nombre_usuario):
    data = {
        'Messages': [
            {
                "From": {"Email": "escapadeparfaite@gmail.com", "Name": "Escapade Parfaite"},
                "To": [{"Email": destinatario, "Name": nombre_usuario}],
                "Subject": "¡Bienvenido a Escapade Parfaite! 🎉",
                "TextPart": f"Hola {nombre_usuario}, gracias por registrarte en Escapade Parfaite.",
                "HTMLPart": f"""
                    <h2>¡Bienvenido {nombre_usuario}! 🎉</h2>
                    <p>Gracias por registrarte en <b>Escapade Parfaite</b>. 
                    A partir de ahora podrás explorar y reservar experiencias únicas.</p>
                    <br>
                    <p>¡Estamos felices de tenerte con nosotros! 🌍✨</p>
                """
            }
        ]
    }

    try:
        response = mailjet.send.create(data=data)
        body = response.json()
        status = body.get('Messages', [{}])[0].get('Status', 'error')
        if status.lower() == 'success':
            return True
        else:
            print("Error enviando correo:", body)
            return False
    except Exception as e:
        print("Excepción al enviar correo:", e)
        return False
