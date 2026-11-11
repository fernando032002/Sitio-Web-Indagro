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
   CERRAR MENÚ
========================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {
            nav.classList.remove("active");
        }

    });

});

/* =========================
   ABRIR DETALLE DE PRODUCTOS
========================= */

const cards = document.querySelectorAll(".producto-card");

cards.forEach(card => {

    const boton = card.querySelector(".producto-boton");

    if (!boton) return;

    boton.addEventListener("click", () => {

        // Obtener el producto desde el botón
        const clave = boton.dataset.producto;

        // Buscar su información
        const servicio = servicios[clave];

        if (!servicio) {
            console.error("No se encontró el producto:", clave);
            return;
        }

        // Verificar elementos del detalle
        if (
            !serviceDetail ||
            !serviceTitle ||
            !serviceDescription ||
            !serviceImage ||
            !serviceText
        ) {
            console.error("Faltan elementos del detalle en el HTML.");
            return;
        }

        // Mostrar información
        serviceTitle.textContent = servicio.titulo;
        serviceDescription.textContent = servicio.descripcion;
        serviceText.textContent = servicio.informacion;

        // Mostrar imagen del producto
        serviceImage.src = servicio.imagenPrincipal;
        serviceImage.alt = servicio.titulo;

        // Abrir el detalle
        serviceDetail.style.display = "block";

        // Desplazarse al detalle
        setTimeout(() => {

            const posicion =
                serviceDetail.getBoundingClientRect().top +
                window.scrollY - 110;

            window.scrollTo({
                top: posicion,
                behavior: "smooth"
            });

        }, 100);

    });

});
/* =========================
   INFORMACIÓN DE PRODUCTOS
========================= */

const servicios = {

    control: {
        titulo: "CONTROL ELÉCTRICO",

        descripcion:
            "Soluciones para el control y manejo de sistemas eléctricos.",

        imagenPrincipal:
            "img/info1.png",

        informacion:
            "CONTAMOS CON TODO LO NECESARIO PARA EL CONTROL DE TUS EQUIPOS O PROCESOS EN LAS MEJORES MARCAS"
    },

    potencia: {
        titulo: "POTENCIA",

        descripcion:
            "Servicios relacionados con sistemas de potencia eléctrica.",

        imagenPrincipal:
            "img/potencia1.jpeg",

        informacion:
            "Ofrecemos soluciones para sistemas de potencia eléctrica, equipos eléctricos y aplicaciones industriales."
    },

    hidraulica: {
        titulo: "HIDRÁULICA",

        descripcion:
            "Soluciones y servicios especializados en sistemas hidráulicos.",

        imagenPrincipal:
            "img/hidraulica.",

        informacion:
            "Trabajamos con sistemas hidráulicos, equipos, componentes y soluciones."
    },

    automatizacion: {
        titulo: "AUTOMATIZACIÓN",

        descripcion:
            "Implementación y mejora de sistemas automatizados.",

        imagenPrincipal:
            "img/automatizacion1.jpeg",

        informacion:
            "Desarrollamos soluciones de automatización para mejorar el funcionamiento, control y eficiencia de los procesos."
    },

    neumatica: {
        titulo: "SERVICIOS",

        descripcion:
            "Servicios",

        imagenPrincipal:
            "img/",

        informacion:
            "....."
    }

};

/* =========================
   ABRIR DETALLE DE PRODUCTOS
========================= */

cards.forEach(card => {

    const boton = card.querySelector(".producto-boton");

    if (!boton) return;

    boton.addEventListener("click", () => {

        const servicioSeleccionado = card.dataset.servicio;
        const servicio = servicios[servicioSeleccionado];

        if (!servicio) {
            console.error("No existe información para:", servicioSeleccionado);
            return;
        }

        // Verificar que existan los elementos del detalle
        if (
            !serviceDetail ||
            !serviceTitle ||
            !serviceDescription ||
            !serviceImage ||
            !serviceText
        ) {
            console.error("Faltan elementos HTML del detalle del producto.");
            return;
        }

        // Actualizar información
        serviceTitle.textContent = servicio.titulo;
        serviceDescription.textContent = servicio.descripcion;
        serviceText.textContent = servicio.informacion;

        // Mostrar una sola imagen
        serviceImage.src = servicio.imagenPrincipal;
        serviceImage.alt = servicio.titulo;

        // Mostrar detalle
        serviceDetail.style.display = "block";

        // Desplazarse al detalle sin ocultarlo bajo el encabezado fijo
        setTimeout(() => {

            const posicion =
                serviceDetail.getBoundingClientRect().top +
                window.scrollY -
                110;

            window.scrollTo({
                top: posicion,
                behavior: "smooth"
            });

        }, 100);

    });

});

/* =========================
   REGRESAR A PRODUCTOS
========================= */

if (backServices && serviceDetail) {

    backServices.addEventListener(
        "click",
        () => {

            serviceDetail.style.display =
                "none";


            const servicesSection =
                document.getElementById(
                    "productos"
                );


            if (servicesSection) {

                servicesSection.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }
    );

}

/* ==================================
   CARRUSEL AUTOMÁTICO - NOSOTROS
================================== */

const carrusel = document.querySelector('.nosotros-carousel');

if (carrusel) {

    const track = carrusel.querySelector('.carousel-track');
    const slides = carrusel.querySelectorAll('.carousel-slide');
    const anterior = carrusel.querySelector('.carousel-btn.prev');
    const siguiente = carrusel.querySelector('.carousel-btn.next');
    const indicadores = carrusel.querySelectorAll('.carousel-indicators button');

    let indice = 0;
    let intervalo;

    // Mostrar imagen
    function mostrarImagen(posicion) {

        indice = (posicion + slides.length) % slides.length;

        track.style.transform = `translateX(-${indice * 100}%)`;

        indicadores.forEach((boton, i) => {
            boton.classList.toggle('active', i === indice);
        });

    }

    // Siguiente imagen
    function siguienteImagen() {
        mostrarImagen(indice + 1);
    }

    // Iniciar reproducción automática
    function iniciarCarrusel() {
        clearInterval(intervalo);
        intervalo = setInterval(siguienteImagen, 3000);
    }

    // Botones de navegación
    siguiente.addEventListener('click', () => {
        siguienteImagen();
        iniciarCarrusel();
    });

    anterior.addEventListener('click', () => {
        mostrarImagen(indice - 1);
        iniciarCarrusel();
    });

    // Indicadores
    indicadores.forEach((boton, i) => {
        boton.addEventListener('click', () => {
            mostrarImagen(i);
            iniciarCarrusel();
        });
    });

    // Pausar al pasar el cursor
    carrusel.addEventListener('mouseenter', () => {
        clearInterval(intervalo);
    });

    carrusel.addEventListener('mouseleave', iniciarCarrusel);

    // Iniciar carrusel
    mostrarImagen(0);
    iniciarCarrusel();

}

/* =========================
   MOSTRAR / OCULTAR CORREOS
========================= */

const btnCorreos =
    document.getElementById("btnCorreos");

const correos =
    document.getElementById("correos");


if (btnCorreos && correos) {

    btnCorreos.addEventListener(
        "click",
        () => {

            correos.classList.toggle("mostrar");


            if (
                correos.classList.contains("mostrar")
            ) {

                btnCorreos.textContent =
                    "OCULTAR CORREOS";

            } else {

                btnCorreos.textContent =
                    "VER CORREOS";

            }

        }
    );

}
