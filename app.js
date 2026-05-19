const app = Vue.createApp({
    created(){
        //console.log('Creacion de la instancia');
        this.getProducts();
    },
    data() {
        return {

            libros: [
                {
                    titulo: "Narnia - El leon la bruja y el ropero",
                    autor : "Cs.Lewis",
                    imagen: "images/narnia.png",
                    precio: "$60.000",
                    esFavorito: false,
                    anadidoCarrito: false,

                    
                },
                 {
                    titulo: "Narnia - El leon la bruja y el ropero",
                    autor : "Cs.Lewis",
                    imagen: "images/narnia.png",
                    precio: "$60.000",
                    esFavorito: false,
                    anadidoCarrito: false,

                },
                 {
                    titulo: "Narnia - El leon la bruja y el ropero",
                    autor : "Cs.Lewis",
                    imagen: "images/narnia.png",
                    precio: "$60.000",
                    esFavorito: false,
                    anadidoCarrito: false,

                }
                
            ],

            boxes: [
                {
                    titulo: "Colección especial: Agatha Christie",
                    autor: "Agatha Christie",
                    imagen: "images/box1.png",
                    precio: "$150.000",
                    contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"],
                    mostrarDetalles: false,
                    esFavorito: false,
                    anadidoCarrito: false,


                },
                
                {
                    titulo: "Colección especial: Agatha Christie",
                    autor: "Agatha Christie",
                    imagen: "images/box1.png",
                    precio: "$150.000",
                    contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"],
                    mostrarDetalles: false,
                    esFavorito: false,
                    anadidoCarrito: false,



                },
                {
                    titulo: "Colección especial: Agatha Christie",
                    autor: "Agatha Christie",
                    imagen: "images/box1.png",
                    precio: "$150.000",
                    contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"],
                    mostrarDetalles: false,
                    esFavorito: false,
                    anadidoCarrito: false,


                },
                {
                    titulo: "Colección especial: Agatha Christie",
                    autor: "Agatha Christie",
                    imagen: "images/box1.png",
                    precio: "$150.000",
                    contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"],
                    mostrarDetalles: false,
                    esFavorito: false,
                    anadidoCarrito: false,



                },
                {
                    titulo: "Colección especial: Agatha Christie",
                    autor: "Agatha Christie",
                    imagen: "images/box1.png",
                    precio: "$150.000",
                    contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"],
                    mostrarDetalles: false,
                    esFavorito: false,
                    anadidoCarrito: false,

                },
                {
                    titulo: "Colección especial: Agatha Christie",
                    autor: "Agatha Christie",
                    imagen: "images/box1.png",
                    precio: "$150.000",
                    contenido: ["Obra completa de Agatha Christie", "Marca paginas tematico", "Plancha de stickers"],
                    mostrarDetalles: false,
                    esFavorito: false,
                    anadidoCarrito: false,




                },
                
                

            ],
        


            boxesSub: [
                {
                
                titulo: "Caja misteriosa: Fanaticos del terror",
                precio: "$85.000",
                condicion:"Suscribirse",
                imagen: "images/misteriosa.png",


            },
            {
                
                titulo: "Caja misteriosa: Fanaticos del romance",
                precio: "$85.000",
                condicion:"Suscribirse",
                imagen: "images/misteriosa.png",

                

            },
            {
                
                titulo: "Caja misteriosa: Fanaticos del acción",
                precio: "$85.000",
                condicion:"Suscribirse",
                imagen: "images/misteriosa.png",

                

            },
            {
                
                titulo: "Caja misteriosa: Fanaticos del suspenso",
                precio: "$85.000",
                condicion:"Suscribirse",
                imagen: "images/misteriosa.png",

                
                

            },

        ],
        
            carrito: [],
            mostrarCarrito: false,

        }

        
    },



        methods: {

            async getProducts(){
                //console.log('get products');
                const res = await fetch('productos.php');
                const products = await res.json();
                //console.log(products);
                this.libros = products;

            },

        agregarFavorito(producto) {

            producto.esFavorito  = !producto.esFavorito

        },

        agregarCarrito(producto) {

        this.carrito.push(producto)

        producto.anadidoCarrito = true

        },
        eliminarDelCarrito(producto) {

        this.carrito = this.carrito.filter(

        item => item !== producto

    )
    producto.anadidoCarrito = false

}

    }



})

app.component("card-box", {

    props: ["box"],

    template: `

    <div> <img class="slider-img" :src="box.imagen">

        <h2>{{ box.titulo }}</h2>

        <h3>{{ box.autor }}</h3>

        <button class="detalles-btn" @click="box.mostrarDetalles = !box.mostrarDetalles" > Ver contenido  </button>

        <ul v-if="box.mostrarDetalles">

            <li v-for="item in box.contenido">

                {{ item }}

            </li>

        </ul>

        <div class="btns-cards">

            <button v-if="!box.anadidoCarrito" class="carrito-btn" @click="$root.agregarCarrito(box)">🛒 Añadir al carrito</button>
            <button v-else class="carrito-btn" @click="$root.eliminarDelCarrito(box)">✅ Añadido </button>

            <button v-if="!box.esFavorito" class="favorito-btn" @click="$root.agregarFavorito(box)">🤍 Favorito</button>

            <button v-else class="favorito-btn"  @click="$root.agregarFavorito(box)">❤️ Añadido
            </button></div>

    </div>

    `

})

app.mount("#app")