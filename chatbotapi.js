const url = "https://openlibrary.org/search.json?q=";

const headers = new Headers({
    "user": "programming (email@gmail.com)"
});

const options = {
    method: 'GET',
    headers: headers}

import {intenciones} from "./intenciones.js";

let lastRespUrl = "";

// Funcion buscar libro en API
    async function getBook(lastRespUrl) {

    try {

        const res = await fetch(url + lastRespUrl, options);
        const data = await res.json();

        if (!data.docs.length) {
            return null;
        }

        return data.docs[0];

    } catch (error) {

        responder(
            "Bot",
            "Error al buscar el libro en la API."
        );

        console.error(error);
    }
}
// Abrir chatbot
const btnChat = document.querySelector('#btn-chat');
const chatContainer = document.querySelector('.chat-container');

btnChat.addEventListener('click', () => {
    chatContainer.classList.toggle('abierto');
});

//Cerrar chatbot
const btnClose = document.querySelector('#close');

btnClose.addEventListener('click', () => {
    chatContainer.classList.remove('abierto');
});


const input = document.querySelector('#user-ask');
const form = document.querySelector('form');
const chat = document.querySelector('#chat');



//Entrada y salida de mensaje
form.addEventListener('submit', async (e)=> {
    console.log("SE ENVIO EL FORM");
    e.preventDefault();  
    const texto = input.value;
    lastRespUrl = texto
    .toLowerCase()
    .replace("search ", "")
    .replace("buscar ", "")
    .replace("quiero buscar el libro de", "")
    .replace("quiero buscar un libro ", "")
    .replaceAll(" ", "+");

    if (texto.trim() === '') return;

    responder('Usuario', texto);

    const mensaje = texto.toLowerCase();

    // Pedir coordenadas al chatbot
if (
    mensaje.includes("coordenadas") ||
    mensaje.includes("ubicacion") ||
    mensaje.includes("ubicación") ||
    mensaje.includes("donde estoy") ||
    mensaje.includes("mi ubicacion")
) {
console.log("ENTRO A COORDENADAS");

    responder('Bot', "Obteniendo tu ubicación... "); // 

    setTimeout(() => {
        obtenerCoordenadas();
    }, 1000);


    } else {
        const cargandoMsg = responder('Bot', 'Espere un momento...');

        try {
            const respuesta = await obtenerRespuesta(texto);

            setTimeout(() => {
                cargandoMsg.textContent = respuesta; 
            }, 1300);

        } catch (error) {
            cargandoMsg.textContent = "Ocurrió un error.";
        }
    
    }

    input.value = '';
});

//Funciones del chatbot

function responder(remitente, mensaje) {
    const tipo = remitente === 'Usuario' ? 'user' : 'bot';

    const msg = document.createElement('div');
    msg.classList.add('message', tipo);
    msg.textContent = mensaje;

    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;

    return msg;
}


const obtenerRespuesta = async (texto) => {
    const mensaje = texto.toLowerCase().trim();

    for (let intencion of intenciones) {
        for (let palabra of intencion.palabras) {
          if (mensaje.includes(palabra)) {
            if (intencion.tipo === `search`){
                const libros = await getBook(lastRespUrl);

                if (!libros) { return "No encontré ese libro.";
                }
                return `El libro ${libros.title} del autor ${libros.author_name} fue publicado en ${libros.first_publish_year} con ${libros.edition_count} ediciones, actualmente disponemos con 35 en stock.`;
            }
            const indice = Math.floor(Math.random() * intencion.respuestas.length);
              return intencion.respuestas[indice];
          }
        }
    }

    input.value = '';
    return 'No entendí tu consulta. ¿Qué buscas?';

}

// Errores coordenadas

function obtenerCoordenadas() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                responder('Bot', `Tus coordenadas son:

Latitud: ${lat}
Longitud: ${lon}`);
            },
            (error) => {
                responder('Bot', "No pude obtener tu ubicación");
                console.error(error);
            }
        );
    } else {
        responder('Bot', "Tu navegador no soporta geolocalización");
    }
}