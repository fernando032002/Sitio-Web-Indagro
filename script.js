/* =========================
   MENÚ MÓVIL
========================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


/* =========================
   CERRAR MENÚ AL SELECCIONAR
========================= */

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("active");
    });
});


/* =========================
   CATÁLOGO DE PRODUCTOS
========================= */

const servicios = {

control: {
    titulo: "CONTROL ELÉCTRICO",

    descripcion: "",

    productos: [

        {
            nombre: "",
            imagen: "img/categorias/img/ce1.png",
            claseImagen: "img-control-1",
            descripcion: ""
        },

        {
            nombre: "",
            imagen: "img/productos/relevadores.jpg",
            claseImagen: "img-control-2",
            descripcion: ""
        },

        {
            nombre: "",
            imagen: "img/productos/interruptores.jpg",
            claseImagen: "img-control-3",
            descripcion: ""
        }

    ]
},
      


    potencia: {
        titulo: "POTENCIA",

        descripcion:
            "",

        productos: [

            {
                nombre: "",
                imagen: "img/categorias/img/p1.jpeg",
                descripcion:
                    ""
            },

            {
                nombre: "",
                imagen: "img/categorias/img/p2.jpeg",
                descripcion:
                    ""
            },

            {
                nombre: "",
                imagen: "img/categorias/img/p3.jpeg",
                descripcion:
                    ""
            }

        ]
    },


    hidraulica: {
        titulo: "HIDRÁULICA",

        descripcion:
            "",

        productos: [

            {
                nombre: "",
                imagen: "img/productos/bombas.jpg",
                descripcion:
                    ""
            },

            {
                nombre: "",
                imagen: "img/productos/valvulas.jpg",
                descripcion:
                    ""
            },

            {
                nombre: "",
                imagen: "img/productos/mangueras.jpg",
                descripcion:
                    ""
            }

        ]
    },


    automatizacion: {
        titulo: "AUTOMATIZACIÓN",

        descripcion:"",
            

        productos: [

            {
                nombre: "",
                imagen: "img/productos/sensores.jpg",
                descripcion:
                    ""
            },

            {
                nombre: "",
                imagen: "img/productos/variadores.jpg",
                descripcion:
                    ""
            },

            {
                nombre: "",
                imagen: "img/productos/plc.jpg",
                descripcion:
                    ""
            }

        ]
    },


    servicios: {
        titulo: "SERVICIOS",

        descripcion:
            "Conoce algunos de los servicios que puede ofrecer IndAgro.",

        productos: [

            {
                nombre: "Mantenimiento",
                imagen: "img/productos/mantenimiento.jpg",
                descripcion:
                    ""
            },

            {
                nombre: "Instalaciones",
                imagen: "img/productos/instalaciones.jpg",
                descripcion:
                    ""
            },

            {
                nombre: "Asesoría técnica",
                imagen: "img/productos/asesoria.jpg",
                descripcion:
                    ""
            }

        ]
    }

};


/* =========================
   ELEMENTOS DEL CATÁLOGO
========================= */

const serviceDetail =
    document.getElementById("serviceDetail");

const serviceTitle =
    document.getElementById("serviceTitle");

const serviceDescription =
    document.getElementById("serviceDescription");

const listaProductos =
    document.getElementById("listaProductos");

const backServices =
    document.getElementById("backServices");


/* =========================
   MOSTRAR PRODUCTOS
========================= */

function mostrarCategoria(clave) {

    const categoria = servicios[clave];

    if (
        !categoria ||
        !serviceDetail ||
        !serviceTitle ||
        !serviceDescription ||
        !listaProductos
    ) {
        console.error("No se pudo mostrar la categoría:", clave);
        return;
    }

    // Actualizar título y descripción
    serviceTitle.textContent = categoria.titulo;

    serviceDescription.textContent = categoria.descripcion;

    // Limpiar productos anteriores
    listaProductos.replaceChildren();


    // Crear tarjetas de productos
    categoria.productos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.className = "catalogo-producto-card";


        // Imagen
        const imagen = document.createElement("img");

        imagen.src = producto.imagen;

        imagen.alt = producto.nombre;

        imagen.loading = "lazy";

        // Asignar tamaño individual a cada imagen
            imagen.className = producto.claseImagen || "";

            imagen.addEventListener("error", () => {

            imagen.alt = `Imagen pendiente: ${producto.nombre}`;

            imagen.classList.add("imagen-no-disponible");

        }, { once: true });


        // Contenido
        const contenido = document.createElement("div");

        contenido.className = "catalogo-producto-info";


        // Nombre
        const nombre = document.createElement("h3");

        nombre.textContent = producto.nombre;


        // Descripción
        const descripcion = document.createElement("p");

        descripcion.textContent = producto.descripcion;


        // Agregar elementos
        contenido.append(nombre, descripcion);

        tarjeta.append(imagen, contenido);

        listaProductos.appendChild(tarjeta);

    });


    // Mostrar catálogo
    serviceDetail.classList.add("mostrar");


    // Desplazarse al catálogo
    setTimeout(() => {

        const top =
            serviceDetail.getBoundingClientRect().top +
            window.scrollY - 110;

        window.scrollTo({
            top: top,
            behavior: "smooth"
        });

    }, 100);

}


/* =========================
   BOTONES DE CATEGORÍAS
========================= */

document.querySelectorAll(
    ".producto-boton[data-producto]"
).forEach(boton => {

    boton.addEventListener("click", () => {

        const clave = boton.dataset.producto;

        mostrarCategoria(clave);

    });

});


/* =========================
   REGRESAR A CATEGORÍAS
========================= */

if (backServices && serviceDetail) {

    backServices.addEventListener("click", () => {

        serviceDetail.classList.remove("mostrar");

        document.querySelector(
            ".productos-contenedor"
        )?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

}


/* ==================================
   CARRUSEL AUTOMÁTICO - NOSOTROS
================================== */

const carrusel =
    document.querySelector(".nosotros-carousel");

if (carrusel) {

    const track =
        carrusel.querySelector(".carousel-track");

    const slides =
        carrusel.querySelectorAll(".carousel-slide");

    const anterior =
        carrusel.querySelector(".carousel-btn.prev");

    const siguiente =
        carrusel.querySelector(".carousel-btn.next");

    const indicadores =
        carrusel.querySelectorAll(
            ".carousel-indicators button"
        );


    if (track && slides.length && anterior && siguiente) {

        let indice = 0;

        let intervalo;


        // Mostrar imagen
        function mostrarImagen(posicion) {

            indice =
                (posicion + slides.length) % slides.length;

            track.style.transform =
                `translateX(-${indice * 100}%)`;

            indicadores.forEach((boton, i) => {

                boton.classList.toggle(
                    "active",
                    i === indice
                );

            });

        }


        // Iniciar reproducción automática
        function iniciarCarrusel() {

            clearInterval(intervalo);

            intervalo = setInterval(() => {

                mostrarImagen(indice + 1);

            }, 3000);

        }


        // Botón siguiente
        siguiente.addEventListener("click", () => {

            mostrarImagen(indice + 1);

            iniciarCarrusel();

        });


        // Botón anterior
        anterior.addEventListener("click", () => {

            mostrarImagen(indice - 1);

            iniciarCarrusel();

        });


        // Indicadores
        indicadores.forEach((boton, i) => {

            boton.addEventListener("click", () => {

                mostrarImagen(i);

                iniciarCarrusel();

            });

        });


        // Pausar al pasar el cursor
        carrusel.addEventListener("mouseenter", () => {

            clearInterval(intervalo);

        });


        // Reanudar al retirar el cursor
        carrusel.addEventListener("mouseleave", iniciarCarrusel);


        // Iniciar carrusel
        mostrarImagen(0);

        iniciarCarrusel();

    }

}

/* =========================
   MOSTRAR / OCULTAR CORREOS
========================= */

const btnCorreos =
    document.getElementById("btnCorreos");

const correos =
    document.getElementById("correos");


if (btnCorreos && correos) {

    btnCorreos.addEventListener("click", () => {

        correos.classList.toggle("mostrar");

        btnCorreos.textContent =
            correos.classList.contains("mostrar")
                ? "OCULTAR CORREOS"
                : "VER CORREOS";

    });

}