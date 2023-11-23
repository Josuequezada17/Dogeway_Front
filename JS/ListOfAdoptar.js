window.onload = function () {
    console.log
    userInformation(sessionStorage.user, sessionStorage.token);
    ListOfUsers(sessionStorage.token,sessionStorage.paginacion);
    
    
    
    
}

function userInformation(correo, token) {
    fetch(`http://localhost:8080/usuario/user?correo=${encodeURIComponent(correo)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {

            sessionStorage.setItem('AllDataUser',data);
            sessionStorage.setItem('paginacion',0);

        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error

        });
}




function ListOfUsers(token,page) {
    const apiUrl = `http://localhost:8080/pet/exploreAdopt?&utilidadDeMascota=ADOPCION&page=${page}`;


    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
            // Agrega cualquier otra cabecera si es necesario
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('adoptarPet',JSON.stringify(data.content[0]));
            console.log('Respuesta del servidor:exitosa',data.content[0]);
var contenedor = document.getElementById('others-adopt');
// Crear una tabla
var tabla = document.createElement('table');
tabla.border = '1';
tabla.classList.add('box-table');

// Crear una fila de encabezado
var encabezado = tabla.createTHead();
var filaEncabezado = encabezado.insertRow();
filaEncabezado.insertCell().textContent = 'Usuario';
filaEncabezado.insertCell().textContent = 'Mascota';

// Crear filas de datos
data.content.forEach(function (mascota) {
    // Crear una fila
    var fila = tabla.insertRow();

    // Acceder a userResponseDTO
    var userDTO = mascota.userResponseDTO;

    // Columna 1: Información del Usuario
    var celdaUsuario = fila.insertCell();
    celdaUsuario.style.width='200px'
    
    // Agregar la foto del usuario
    var imgUsuario = document.createElement('img');
    imgUsuario.classList='img-dueno';
    imgUsuario.src =userDTO.foto; // Ajusta esto según la estructura real de tu objeto
    imgUsuario.alt = 'Usuario Image';
    celdaUsuario.appendChild(imgUsuario);

    // Agregar nombre del usuario
    var nombreUsuario = document.createElement('p');
    nombreUsuario.textContent = `${userDTO.nombres} ${userDTO.apellidos}`;
    celdaUsuario.appendChild(nombreUsuario);

    // Agregar estado y ciudad del usuario
    var ubicacionUsuario = document.createElement('p');
    ubicacionUsuario.textContent = `${userDTO.estado}, ${userDTO.ciudad}`;
    celdaUsuario.appendChild(ubicacionUsuario);

    var GeneroUsuario = document.createElement('p');
    GeneroUsuario.textContent = `${userDTO.genero}`;
    celdaUsuario.appendChild(GeneroUsuario);


    // Columna 2: Información de la Mascota
    var celdaMascota = fila.insertCell();
    celdaMascota.style.width='200px'

    // Agregar la foto de la mascota
    var imgMascota = document.createElement('img');
    imgMascota.src = mascota.foto; // Ajusta esto según la estructura real de tu objeto
    imgMascota.classList='img-pet';
    imgMascota.alt = 'Mascota Image';
    celdaMascota.appendChild(imgMascota);

    // Agregar nombre de la mascota
    var nombreMascota = document.createElement('p');
    nombreMascota.textContent = mascota.nombre; // Ajusta esto según la estructura real de tu objeto
    celdaMascota.appendChild(nombreMascota);

    var descripcion = document.createElement('p');
    descripcion.textContent = mascota.descripcion; // Ajusta esto según la estructura real de tu objeto
    celdaMascota.appendChild(descripcion);


    var personalidad = document.createElement('p');
    personalidad.textContent = mascota.personalidad; // Ajusta esto según la estructura real de tu objeto
    celdaMascota.appendChild(personalidad);
});

// Agregar la tabla al contenedor
contenedor.appendChild(tabla);

           
            


            

        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error

        });




    }
