# Palacio De Tinta

Aplicación web tipo catálogo de libros y cajas literarias con componentes de carrito, favoritos y un chatbot interactivo.

## Descripción

`Palacio De Tinta` es un proyecto web que simula una tienda de libros. Incluye:

- Catálogo de libros y cajas literarias.
- Carrito de compras básico con añadidos y eliminaciones.
- Favoritos con estado visual.
- Chatbot que responde a intenciones predefinidas y busca libros usando la API de Open Library.
- Modo PWA con manifest, service worker y banner de instalación.

## Tecnologías usadas

- HTML / CSS / JavaScript
- Vue 3 (sintaxis global con `vue.global.js`)
- PHP para servir datos de productos desde `productos.php`
- Service Worker (`sw.js`) para caché y modo offline
- Manifest Web App (`manifest.json`) para instalación como PWA

## Funcionalidades

- Interfaz responsiva de catálogo con secciones de:
  - Más vendidos
  - Nuevos ingresos
  - Cajas literarias
  - Cajas por suscripción
- Carrito desplegable con conteo dinámico.
- Chatbot flotante que:
  - responde saludos y preguntas básicas,
  - muestra stock y precios de libros,
  - busca libros en la API de Open Library,
  - puede obtener coordenadas del usuario.
- Banner de instalación PWA y soporte para `beforeinstallprompt`.
- Cacheo de activos para funcionamiento offline básico.

## Estructura del proyecto

- `index.html` - página principal y estructura de la app.
- `style.css` - estilos visuales y diseño general.
- `app.js` - lógica de Vue, carrito, favoritos y registro del service worker.
- `chatbotapi.js` - chatbot, búsqueda de libros y manejo de la UI del chat.
- `intenciones.js` - intenciones/lógica de respuestas del chatbot.
- `productos.php` - datos de ejemplo para el catálogo de libros.
- `manifest.json` - configuración de la PWA.
- `sw.js` - service worker para cacheo de recursos.
- `icons/`, `images/`, `logo/`, `screenshots/` - recursos gráficos.

## Instalación y uso

1. Abrir el proyecto en un servidor local que soporte PHP.
2. Acceder a `index.html` desde el navegador.
3. Interactuar con el catálogo, agregar productos al carrito y usar el chatbot.
4. Si se habilita la instalación PWA, el banner permitirá agregar la app al dispositivo.

## Notas

- El chatbot usa una lista de intenciones estáticas y una integración sencilla con la API de Open Library.
- El carrito actual no persiste datos entre recargas.
- Se recomienda ejecutar el proyecto sobre HTTPS o `localhost` para probar la instalación PWA correctamente.
