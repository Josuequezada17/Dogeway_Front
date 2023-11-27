//Hacer scroll al presionar los botones del nav
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);

    if (section) {
        // Utiliza la función scrollIntoView para desplazarte a la sección
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Datos de ejemplo de perfiles
 var perfiles = [
    { nombre: 'Usuario1', imagen: 'img/image 26.png', detalle: 'Detalle del perfil 1' },
    { nombre: 'Usuario2', imagen: 'img/pastor-aleman.png', detalle: 'Detalle del perfil 2' },
    { nombre: 'Usuario3', imagen: 'img/rottweiler.png', detalle: 'Detalle del perfil 3' },
    { nombre: 'Usuario4', imagen: 'img/logo.png', detalle: 'Detalle del perfil 4' },
    // Agrega más perfiles según sea necesario
];

// Función para llenar dinámicamente los recuadros de perfil
function llenarPerfiles() {
    var perfilesContainer = document.getElementById('perfilesContainer');

    perfiles.forEach(function(perfil) {
        //Crea el espacio para el cuadro
        var perfilDiv = document.createElement('div');
        perfilDiv.className = 'perfil';

        //Extrar imagen
        var imagen = document.createElement('img');
        imagen.src = perfil.imagen;
        perfilDiv.appendChild(imagen);

        //Extrae nombre
        var nombre = document.createElement('p');
        nombre.textContent = perfil.nombre;
        perfilDiv.appendChild(nombre);

        //Extrae los detalles
        var detalle = document.createElement('p');
        detalle.textContent = perfil.detalle;
        perfilDiv.appendChild(detalle);

        //Crea el botón para modificar el perfil
        var botonModificar = document.createElement('a');
        botonModificar.className = 'botonModificar';
        botonModificar.textContent = 'Modificar';
        botonModificar.href = 'updateAccountUser?id=' + perfil.id;
        perfilDiv.appendChild(botonModificar);

        perfilesContainer.appendChild(perfilDiv);
    });
}

// Llama a la función para llenar los perfiles al cargar la página
window.onload = llenarPerfiles;