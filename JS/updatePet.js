window.onload=function(){

    ListPets(sessionStorage.user,sessionStorage.token);
}

function ListPets(correo, token) {
    fetch(`http://localhost:8080/pet/listallpetuser?correo=${encodeURIComponent(correo)}&utilidadDeMascota=ADOPCION`, {
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
                        celda.style.width = '120px';
                    }
                    if(index===1){
                        var imgElement = document.createElement('img');
                        imgElement.src =  mascota[atributo];
                        imgElement.alt = 'Pet Image';
            
                        imgElement.addEventListener('click', function () {
                            sessionStorage.setItem('paginacion',0);
                            sessionStorage.setItem('currentPet', JSON.stringify(mascota));
                            sessionStorage.setItem('userPropietary',JSON.stringify(mascota.userResponseDTO));
                            var currentUser=JSON.parse(sessionStorage.getItem('userPropietary'));

                            
                            alert('La mascota ha sido cambiada por ' + mascota.nombre);
                            
                            window.location.href = 'updateAccountPet.html';
                        });
            
                        celda.appendChild(imgElement);
                        celda.style.width = '220px'; // Ancho de la columna 'foto'
                        
                        
                    }
                    if(index===2){
                        celda.style.width='200px';
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
