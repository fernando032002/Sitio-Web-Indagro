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
   ELEMENTOS DE PRODUCTOS
========================= */

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
        titulo: "POTENCIA ELÉCTRICA",

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
            "img/hidraulica.jpg",

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
        titulo: "NEUMÁTICA",

        descripcion:
            "Soluciones para sistemas y equipos neumáticos.",

        imagenPrincipal:
            "img/neumatica.jpg",

        informacion:
            "Ofrecemos soluciones para sistemas neumáticos, equipos, componentes y aplicaciones industriales."
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

/* =========================
   CARRUSEL NOSOTROS
========================= */

const imagenesNosotros =
    document.querySelectorAll(
        ".carousel-image"
    );

const botonAnterior =
    document.getElementById(
        "prevAbout"
    );

const botonSiguiente =
    document.getElementById(
        "nextAbout"
    );


let indiceNosotros = 0;


/* =========================
   MOSTRAR IMAGEN
========================= */

function mostrarImagenNosotros(indice) {

    imagenesNosotros.forEach(
        imagen => {

            imagen.classList.remove(
                "active"
            );

        }
    );


    if (imagenesNosotros[indice]) {

        imagenesNosotros[indice]
            .classList.add("active");

    }

}


/* =========================
   SIGUIENTE
========================= */

if (botonSiguiente) {

    botonSiguiente.addEventListener(
        "click",
        () => {

            indiceNosotros++;


            if (
                indiceNosotros >=
                imagenesNosotros.length
            ) {

                indiceNosotros = 0;

            }


            mostrarImagenNosotros(
                indiceNosotros
            );

        }
    );

}


/* =========================
   ANTERIOR
========================= */

if (botonAnterior) {

    botonAnterior.addEventListener(
        "click",
        () => {

            indiceNosotros--;


            if (indiceNosotros < 0) {

                indiceNosotros =
                    imagenesNosotros.length - 1;

            }


            mostrarImagenNosotros(
                indiceNosotros
            );

        }
    );

}


/* =========================
   CAMBIO AUTOMÁTICO
========================= */

if (
    imagenesNosotros.length > 0
) {

    setInterval(() => {

        indiceNosotros++;


        if (
            indiceNosotros >=
            imagenesNosotros.length
        ) {

            indiceNosotros = 0;

        }


        mostrarImagenNosotros(
            indiceNosotros
        );

    }, 5000);

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
