// Registro del Service Worker
if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.log('SW registrado: ', registration.scope);
    } catch (error) {
      console.error('Error al registrar SW', error);
    }
  });
}

// CARTEL DE INSTALACION 
let eventoInstalacion;

function showTemporaryMessage(text) {
  const existing = document.getElementById('pwa-temp-msg');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'pwa-temp-msg';
  el.textContent = text;
  Object.assign(el.style, {
    position: 'fixed',
    left: '12px',
    bottom: '80px',
    background: '#222',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '8px',
    zIndex: 1100,
    fontSize: '13px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
  });
  document.body.appendChild(el);
  setTimeout(() => { el.remove(); }, 3000);
}

async function checkInstallability() {
  const issues = [];

  // Secure context
  if (!window.isSecureContext && location.hostname !== 'localhost') {
    issues.push('No se sirve en contexto seguro (HTTPS o localhost)');
  }

  // Service worker registro
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) issues.push('Service Worker no registrado');
    else console.log('Service Worker registrado (check):', reg.scope);
  } catch (e) {
    issues.push('Error al comprobar Service Worker');
  }

  // Manifest
  try {
    const res = await fetch('manifest.json', { cache: 'no-store' });
    if (!res.ok) {
      issues.push('No se pudo cargar manifest.json (HTTP ' + res.status + ')');
    } else {
      const manifest = await res.json();
      console.log('Manifest cargado:', manifest);
      // icons check
      const icons = manifest.icons || [];
      const has192 = icons.some(i => (i.sizes || '').includes('192') || (i.sizes||'').split('x').some(s=>parseInt(s)>=192));
      if (!has192) issues.push('Falta icono 192x192 en manifest (necesario)');
      if (!manifest.start_url) issues.push('start_url no definido en manifest');
      if (!manifest.display) issues.push('display no definido en manifest');
    }
  } catch (e) {
    issues.push('Error al parsear manifest.json');
  }

  if (issues.length === 0) console.log('Checks de instalabilidad OK');
  else console.warn('Problemas detectados para instalación:', issues);
  return issues;
}

// Al recibir beforeinstallprompt guardamos el evento y mostramos el banner
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("beforeinstallprompt capturado");
    event.preventDefault();
    eventoInstalacion = event;
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.style.display = 'flex';
    console.log('beforeinstallprompt recibido — mostrando banner');
    
    // Bindear los botones ahora que tenemos el evento
    setupInstallButtons();
});

function setupInstallButtons() {
  const botonAceptarInstalacion = document.getElementById('btn-aceptar-pwa');
  const botonCancelarInstalacion = document.getElementById('btn-cancelar-pwa');

  if (botonAceptarInstalacion) {
    botonAceptarInstalacion.addEventListener('click', async () => {
      console.log('CLICK EN INSTALAR');
      console.log('eventoInstalacion:', eventoInstalacion);

      if (!eventoInstalacion) {
        console.log('NO HAY EVENTO');
        showTemporaryMessage('Error: evento de instalación no disponible');
        return;
      }

      console.log('VOY A EJECUTAR PROMPT');

      try {
        eventoInstalacion.prompt();

        const result = await eventoInstalacion.userChoice;

        console.log('RESULTADO:', result);
        
        if (result.outcome === 'accepted') {
          console.log('Aceptó la instalación');
          showTemporaryMessage('Instalación aceptada — por favor espera');
        } else {
          console.log('Canceló la instalación');
          showTemporaryMessage('Instalación cancelada');
        }
        
        eventoInstalacion = null;
        const banner = document.getElementById('pwa-install-banner');
        if (banner) banner.style.display = 'none';
      } catch (e) {
        console.error('Error al instalar:', e);
        showTemporaryMessage('Error durante la instalación');
      }
    });
  }

  if (botonCancelarInstalacion) {
    botonCancelarInstalacion.addEventListener('click', () => {
      eventoInstalacion = null;
      const banner = document.getElementById('pwa-install-banner');
      if (banner) banner.style.display = 'none';
      showTemporaryMessage('Mensaje cerrado');
    });
  }
}

// Bind de botones cuando el DOM está listo (por si acaso)
window.addEventListener('load', () => {
  // Si beforeinstallprompt ya se capturó, setupInstallButtons ya se ejecutó
  // Si no, lo hacemos aquí para que los botones estén listos
  const botonCancelarInstalacion = document.getElementById('btn-cancelar-pwa');
  if (botonCancelarInstalacion) {
    botonCancelarInstalacion.addEventListener('click', () => {
      eventoInstalacion = null;
      const banner = document.getElementById('pwa-install-banner');
      if (banner) banner.style.display = 'none';
      showTemporaryMessage('Mensaje cerrado');
    });
  }

  // Ejecutar checks y mostrar en consola
  checkInstallability().then(issues => {
    if (issues.length === 0) console.log('Aplicación cumple requisitos básicos para instalación');
  });
});

// Si la app se instala, ocultamos el banner y mostramos confirmación
window.addEventListener('appinstalled', () => {
  console.log('PWA instalada');
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'none';
  eventoInstalacion = null;
  console.log('appinstalled event fired');
  try { showTemporaryMessage('Aplicación instalada'); } catch (e) {}
});

//  APLICACIÓN VUE 
const app = Vue.createApp({
  created() {
    this.getProducts();
  },
  data() {
    return {
      libros: [
        { titulo: "Narnia - El leon la bruja y el ropero", autor: "Cs.Lewis", imagen: "images/narnia.png", precio: "$60.000", esFavorito: false, anadidoCarrito: false },
        { titulo: "Narnia - El leon la bruja y el ropero", autor: "Cs.Lewis", imagen: "images/narnia.png", precio: "$60.000", esFavorito: false, anadidoCarrito: false },
        { titulo: "Narnia - El leon la bruja y el ropero", autor: "Cs.Lewis", imagen: "images/narnia.png", precio: "$60.000", esFavorito: false, anadidoCarrito: false }
      ],
      boxes: [
        { titulo: "Colección especial: Agatha Christie", autor: "Agatha Christie", imagen: "images/box1.png", precio: "$150.000", contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"], mostrarDetalles: false, esFavorito: false, anadidoCarrito: false },
        { titulo: "Colección especial: Agatha Christie", autor: "Agatha Christie", imagen: "images/box1.png", precio: "$150.000", contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"], mostrarDetalles: false, esFavorito: false, anadidoCarrito: false },
        { titulo: "Colección especial: Agatha Christie", autor: "Agatha Christie", imagen: "images/box1.png", precio: "$150.000", contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"], mostrarDetalles: false, esFavorito: false, anadidoCarrito: false },
        { titulo: "Colección especial: Agatha Christie", autor: "Agatha Christie", imagen: "images/box1.png", precio: "$150.000", contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"], mostrarDetalles: false, esFavorito: false, anadidoCarrito: false },
        { titulo: "Colección especial: Agatha Christie", autor: "Agatha Christie", imagen: "images/box1.png", precio: "$150.000", contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"], mostrarDetalles: false, esFavorito: false, anadidoCarrito: false },
        { titulo: "Colección especial: Agatha Christie", autor: "Agatha Christie", imagen: "images/box1.png", precio: "$150.000", contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"], mostrarDetalles: false, esFavorito: false, anadidoCarrito: false }
      ],
      boxesSub: [
        { titulo: "Caja misteriosa: Fanaticos del terror", precio: "$85.000", condicion: "Suscribirse", imagen: "images/misteriosa.png" },
        { titulo: "Caja misteriosa: Fanaticos del romance", precio: "$85.000", condicion: "Suscribirse", imagen: "images/misteriosa.png" },
        { titulo: "Caja misteriosa: Fanaticos del acción", precio: "$85.000", condicion: "Suscribirse", imagen: "images/misteriosa.png" },
        { titulo: "Caja misteriosa: Fanaticos del suspenso", precio: "$85.000", condicion: "Suscribirse", imagen: "images/misteriosa.png" }
      ],
      carrito: [],
      mostrarCarrito: false,
    };
  },
  methods: {
    async getProducts() {
      try {
        const res = await fetch('productos.php');
        const products = await res.json();
        this.libros = products;
      } catch (e) {
        console.warn('No se pudo cargar productos.php', e);
      }
    },
    agregarFavorito(producto) {
      producto.esFavorito = !producto.esFavorito;
    },
    agregarCarrito(producto) {
      this.carrito.push(producto);
      producto.anadidoCarrito = true;
    },
    eliminarDelCarrito(producto) {
      this.carrito = this.carrito.filter(item => item !== producto);
      producto.anadidoCarrito = false;
    }
  }
});

app.component('card-box', {
  props: ['box'],
  template: `
    <div> 
        <img class="slider-img" :src="box.imagen">

        <h2>{{ box.titulo }}</h2>

        <h3>{{ box.autor }}</h3>

        <button class="detalles-btn" @click="box.mostrarDetalles = !box.mostrarDetalles"> Ver contenido </button>

        <ul v-if="box.mostrarDetalles">
            <li v-for="item in box.contenido">
                {{ item }}
            </li>
        </ul>

        <div class="btns-cards">
            <button v-if="!box.anadidoCarrito" class="carrito-btn" @click="$root.agregarCarrito(box)">🛒 Añadir al carrito</button>
            
            <button v-else class="carrito-btn" @click="$root.eliminarDelCarrito(box)">❌ Quitar del carrito</button>
        </div>
    </div>
  `
});

app.mount('#app');
