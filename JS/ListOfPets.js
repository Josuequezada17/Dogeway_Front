window.onload = function () {
    userInformation(localStorage.user, localStorage.token);

    if(localStorage.getItem('currentPet')){
    var currentPet = JSON.parse(localStorage.getItem('currentPet'));
    
    ListOfUsers(localStorage.token,currentPet.animal,!currentPet.genero,currentPet.tamano,localStorage.paginacion);
    }


function userInformation(correo, token) {
    fetch(`http://localhost:8080/pet/listallpets?correo=${encodeURIComponent(correo)}`, {
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
            console.log('Respuesta del servidor:exitosa');
            var contenedor = document.getElementById('Pets-Info'); // Asegúrate de reemplazar 'miContenedor' con el ID real
            // Agregar la tabla al contenedor en lugar del cuerpo del documento
        
            // Datos de ejemplo
            
            var mascotas=data;
         
            // Crear una tabla
            var tabla = document.createElement('table');
            tabla.border = '1';
            tabla.classList.add('box-table');

            // Crear una fila de encabezado
            var encabezado = tabla.createTHead();
            var filaEncabezado = encabezado.insertRow();
            ['ID','Foto', 'Nombre'].forEach(function (atributo) {
                var celdaEncabezado = filaEncabezado.insertCell();
                celdaEncabezado.textContent = atributo.toUpperCase();
            });

            // Crear filas de datos
            var cuerpoTabla = tabla.createTBody();

            mascotas.forEach(function (mascota) {
                var fila = cuerpoTabla.insertRow();
                ['id','foto', 'nombre'].forEach(function (atributo,index) {
                        var celda = fila.insertCell();
                        if(index!=1){
                            celda.textContent = mascota[atributo];
                        }
                    if (index === 0) {
                        celda.style.width = '50px';
                    }
                    if(index===1){
                        var imgElement = document.createElement('img');
                        imgElement.src =  mascota[atributo];
                        imgElement.alt = 'Pet Image';
            
                        // Agregar un evento de clic a la imagen
                        imgElement.addEventListener('click', function () {
                            localStorage.setItem('paginacion',0);
                            localStorage.setItem('currentPet', JSON.stringify(mascota));
                            
                            alert('La mascota ha sido cambiada por ' + mascota.nombre);
                            window.location.href = 'match.html';
                        });
            
                        celda.appendChild(imgElement);
                        celda.style.width = '100px'; // Ancho de la columna 'foto'
                        
                        
                    }
                    if(index===2){
                        celda.style.width='145px';
                        var currentPet = JSON.parse(localStorage.getItem('currentPet'))
                        if (currentPet && mascota['nombre'] === currentPet.nombre) {
                            celda.style.color = 'red';
                        }
                    }
                });
            });

            // Agregar la tabla al cuerpo del documento
            contenedor.appendChild(tabla);

        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error

        });
}




function ListOfUsers(token, Animal,Genero,Tamano, page) {
    const apiUrl = `http://localhost:8080/pet/explore-byanimal?animal=${Animal}&tamano=${Tamano}&genero=${Genero}&page=${page}`;


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
            console.log('Respuesta del servidor:exitosa');
var contenedor = document.getElementById('others-animals');
localStorage.getItem('matchPet',data);
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
}