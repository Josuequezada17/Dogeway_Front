  window.onload = function () {
    
    userInformation(sessionStorage.user,sessionStorage.token);
    ListAllPets(sessionStorage.user,sessionStorage.token);
    loadMatchs();
   
    

    
    
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
            
            sessionStorage.setItem('AllDataUser',JSON.stringify(data));
            sessionStorage.setItem('paginacion',0);
            console.log(data);

        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error

        });
}



function ListAllPets(correo, token) {
    fetch(`http://localhost:8080/pet/listallpets?correo=${encodeURIComponent(correo)}&utilidadDeMascota=MATCH`, {
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
                           
                            
                            alert('La mascota ha sido cambiada por'  + mascota.nombre);
                        
                           loadMatchs();
                           window.location.href = 'chat.html';

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


function loadMatchs() {
    

    // Obtener el token de autenticación de donde lo tengas almacenado en tu aplicación 
    var user=JSON.parse(sessionStorage.getItem('currentPet'));
    const userId=user.id;
    const token = sessionStorage.token;
 
    // Hacer una solicitud al servidor para obtener la lista de matchs
    fetch(`http://localhost:8080/match/ListOfMatchForUser?id_pet=${userId}&status=ACEPTADA`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token 
        }

        
    })
        .then(response => response.json())
        .then(data => {
            console.log("respuesta del servidor:",data);
            console.log('Respuesta del servidor:exitosa');
            var contenedor = document.getElementById('chats-matchs'); // Asegúrate de reemplazar 'miContenedor' con el ID real
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
                            
                            sessionStorage.setItem('ChatPet', JSON.stringify(mascota));
                           
                            
                            alert('La mascota ha sido cambiada por frweferfer' + mascota.nombre);
                            
                            window.location.href = 'chat.html';
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
        .catch(error => console.error('Error fetching friends:', error));
}



// Cargar mensajes en el chat
// Cargar mensajes en el chat
/*function loadMessages() {

    var MascotaActal = JSON.parse(sessionStorage.getItem('currentPet'));
    var MascotaDestino = JSON.parse(sessionStorage.getItem('ChatPet'));

    fetch(`http://localhost:8080/chat/getmessage?usuarioActual=${MascotaActal.id}&usuarioDestino=${MascotaDestino.idMascota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:mensaje', data);
        var contenedor = document.getElementById('Chat-message');

        // Limpiar el contenido actual del contenedor
        contenedor.innerHTML = '';

        // Establecer el estilo del contenedor para mostrar mensajes en disposición vertical
        contenedor.style.flexDirection = 'column';

        // Recorrer los mensajes y agregarlos al contenedor
        data.forEach(mensaje => {
            var mensajeElement = document.createElement('div');
            mensajeElement.className = 'mensaje';

            // Puedes personalizar la presentación de cada mensaje según tus necesidades
            mensajeElement.innerHTML = `
                <div>Sender: ${mensaje.sender}</div>
                <div>Message: ${mensaje.message}</div>
                <div>DateTime: ${mensaje.localDateTime}</div>
            `;

            // Agregar el mensaje al contenedor
            contenedor.appendChild(mensajeElement);
        });

        // Desplazarse hacia abajo para mostrar el mensaje más reciente
        contenedor.scrollTop = contenedor.scrollHeight;
    })
    .catch(error => {
        console.error('Error al recuperar información:', error);
        // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
    });
}
*/


/*
function loadMessages() {
    var MascotaActal = JSON.parse(sessionStorage.getItem('currentPet'));
    var MascotaDestino = JSON.parse(sessionStorage.getItem('ChatPet'));

    fetch(`http://localhost:8080/chat/getmessage?usuarioActual=${MascotaActal.id}&usuarioDestino=${MascotaDestino.idMascota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:mensaje', data);
        var contenedor = document.getElementById('Chat-message');

        // Limpiar el contenido actual del contenedor
        contenedor.innerHTML = '';

        // Establecer el estilo del contenedor para mostrar mensajes en disposición vertical
        contenedor.style.flexDirection = 'column';

        // Recorrer los mensajes y agregarlos al contenedor
        data.forEach(mensaje => {
            var mensajeElement = document.createElement('div');
                mensajeElement.className = mensaje.sender === MascotaActal.id ? 'mensaje sender' : 'mensaje recipient';
                var userChat=JSON.parse(sessionStorage.getItem('ChatPet'));
               if(mensaje.sender == MascotaActal.id){
                name=MascotaActal.nombre;
               }
               else if(mensaje.sender== userChat.id){

                name=userChat.nombre;
                
               }
              
            // Puedes personalizar la presentación de cada mensaje según tus necesidades
            mensajeElement.innerHTML = `
                <div class="message-user">${name}</div>
                <div class="message-content">${mensaje.message}</div>
                <div class="timestamp">${mensaje.localDateTime}</div>
            `;

            // Agregar el mensaje al contenedor
            contenedor.appendChild(mensajeElement);
        });

        // Desplazarse hacia abajo para mostrar el mensaje más reciente
        contenedor.scrollTop = contenedor.scrollHeight;
    })
    .catch(error => {
        console.error('Error al recuperar información:', error);
        // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
    });
}*/

function loadMessages() {
    var MascotaActal = JSON.parse(sessionStorage.getItem('currentPet'));
    var MascotaDestino = JSON.parse(sessionStorage.getItem('ChatPet'));

    fetch(`http://localhost:8080/chat/getmessage?usuarioActual=${MascotaActal.id}&usuarioDestino=${MascotaDestino.idMascota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:mensaje', data);
        var contenedor = document.getElementById('Chat-message');

        // Limpiar el contenido actual del contenedor
        contenedor.innerHTML = '';

        // Establecer el estilo del contenedor para mostrar mensajes en disposición vertical
        contenedor.style.flexDirection = 'column';

        // Recorrer los mensajes y agregarlos al contenedor
        data.forEach(mensaje => {
            var mensajeElement = document.createElement('div');
            mensajeElement.className = mensaje.sender === MascotaActal.id ? 'mensaje sender' : 'mensaje recipient';

            // Puedes personalizar la presentación de cada mensaje según tus necesidades
            mensajeElement.innerHTML = `
                <div class="message-header">${mensaje.sender === MascotaActal.id ? 'Tú' : 'Usuario'}:</div>
                <div class="message-content">${mensaje.message}</div>
                
            `;

            // Agregar el mensaje al contenedor
            contenedor.appendChild(mensajeElement);
        });

        // Desplazarse hacia abajo para mostrar el mensaje más reciente
        contenedor.scrollTop = contenedor.scrollHeight;
    })
    .catch(error => {
        console.error('Error al recuperar información:', error);
        // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
    });
}





// Función para enviar mensajes
function sendMessage(Sender,SendTo,Message,token) {
   console.log(SendTo);
    const newMessage = {
        sender: Sender,
        sendto :SendTo,
        message:Message
    };

    fetch(`http://localhost:8080/chat/createmessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }, 
        body: JSON.stringify(newMessage)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:exitosa');
            
         
         

        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error

        });
}




