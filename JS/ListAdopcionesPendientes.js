window.onload = function () {
    sessionStorage.setItem('paginacion',0);
    userInformation(sessionStorage.user, sessionStorage.token);

    if(sessionStorage.getItem('currentPet')){
    var currentPet = JSON.parse(sessionStorage.getItem('currentPet'));
    var currentUser =currentPet.userResponseDTO;
   console.log(currentUser.id);
    ListOfUsers(sessionStorage.token,currentUser.id);
    
    
    }

    
}

function userInformation(correo, token) {
    fetch(`http://localhost:8080/pet/listallpets?correo=${encodeURIComponent(correo)}&utilidadDeMascota=ADOPCION`, {
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
            console.log('Respuesta del servidor:exitosa',data);
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
                            sessionStorage.setItem('paginacion',0);
                            sessionStorage.setItem('currentPet', JSON.stringify(mascota));
                            sessionStorage.setItem('userPropietary',JSON.stringify(mascota.userResponseDTO));
                            var currentUser=JSON.parse(sessionStorage.getItem('userPropietary'));

                            ListOfUsers(sessionStorage.token,currentUser.id);
                            alert('La mascota ha sido cambiada por ' + mascota.nombre);
                            
                            window.location.href = 'adopcionesPendientes.html';
                        });
            
                        celda.appendChild(imgElement);
                        celda.style.width = '100px'; // Ancho de la columna 'foto'
                        
                        
                    }
                    if(index===2){
                        celda.style.width='145px';
                        var currentPet = JSON.parse(sessionStorage.getItem('currentPet'))
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




function ListOfUsers(token, Id) {
    const apiUrl = `http://localhost:8080/adopcion/solicitudes?id_user_propietario=${Id}&status=PENDIENTE`;


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
            console.log('Respuesta del servidor:exitosa',data);
var contenedor = document.getElementById('solicitudes');
// Crear una tabla
var tabla = document.createElement('table');
tabla.border = '1';
tabla.classList.add('box-table');

// Crear una fila de encabezado
var encabezado = tabla.createTHead();
var filaEncabezado = encabezado.insertRow();
filaEncabezado.insertCell().textContent = 'Usuario';

var   paginacion=sessionStorage.getItem('paginacion');


// Crear filas de datos
var userDTO = data[paginacion];
sessionStorage.setItem('CurrentAdoptarPet',JSON.stringify(userDTO));

    // Crear una fila
    var fila = tabla.insertRow();

    // Acceder a userResponseDTO

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



// Agregar la tabla al contenedor
contenedor.appendChild(tabla);

           
            


            

        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error

        });




    }
