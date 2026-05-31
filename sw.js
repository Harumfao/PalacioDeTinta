const CACHE_NAME = 'PalacioDeTintaV0.2';
const ASSETS_TO_CACHE = [ '/icons/bolsa-de-la-compra.png', '/icons/busqueda.png', '/icons/categoria.png', '/icons/cierre-de-sesion-de-usuario copy.png', '/icons/cierre-de-sesion-de-usuario.png', '/icons/corazon.png', '/icons/freemium.png', '/icons/inferior.png', '/icons/menu-hamburguesa.png', '/icons/separador.png', '/images/box1.png', '/images/narnia.png', '/logo/PalacioTinta72.png', '/logo/PalacioTinta192.png', '/logo/PalacioTinta512.png', '/screenshots/PalacioDeTintaScreenshot.png', '/screenshots/PalacioDeTintaScreenshotPhone.png', '/app.js', '/index.html', '/manifest .json', '/productos.php', '/slider.js', '/style.css'];


//Instalamos el SW y guardamos en el caché
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

//Borramos cachés desactualizados
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((cacheNames) => Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        event.respondWith(networkFirst(event.request))
    );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const networkResponse = await fetch(request);

    // Guardamos la respuesta en la cache
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {

    // Si falló, buscamos en la caché o tiramos error
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response(JSON.stringify({ error: 'Sin conexion y sin datos en cache' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }
}