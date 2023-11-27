window.onload = function () {
    userInformation(sessionStorage.user,sessionStorage.token);
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
            sessionStorage.setItem('allDataUserUpdate',JSON.stringify(data));
        
        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
        });

        var allDataUserUpdate = JSON.parse(sessionStorage.getItem('allDataUserUpdate'));
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
                            sessionStorage.setItem('paginacion',0);
                            sessionStorage.setItem('currentPet', JSON.stringify(mascota));
                            var currentPet = JSON.parse(sessionStorage.getItem('currentPet'));
                            ListOfUsers(sessionStorage.token,currentPet.animal,!currentPet.genero,currentPet.tamano,sessionStorage.paginacion);
                            alert('La mascota ha sido cambiada por ' + mascota.nombre);
                            
                            window.location.href = 'match.html';
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