
function adoptar(Id_pet, Id_pet_match,Message,token) {
    var modalMatch = document.querySelector('.modalMatch');
    var closeModalMatch = document.querySelector('.closeMatchFoto');
    var match;
  
    verifyAdoptar(Id_pet, Id_pet_match, token)
        .then(data => {
            // Guardar el JSON en la variable match
            match = data;
            console.log('Variable match:', match);

            if (match.iduser!=-1 && match.iduserpropietario!=-1){
                if (match.status === "PENDIENTE") {
                   if(match.iduser != Id_pet && match.iduserpropietario != Id_pet_match ){
                    alert("la solicitud de adopcion ya fue enviada espere la respuesta del otro usuario");
                   }
                   else{
                    
                    const apiUrl = `http://localhost:8080/adopcion/aceptar?id_user=${match.iduser}&id_user_propietario=${match.iduserpropietario}&message=${Message}&newStatus=ACEPTADA`;

                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Respuesta del servidor: exitosa', data);
                            var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            modalMatch.classList.add('modalMatch--show');
                           setTimeout(function() {
                            window.location.href = 'adoptar.html';
                        }, 3000);
                        })
                        .catch(error => {
                            console.error('Error al recuperar información:', error);
                        });}

                } else if (match.status === "ACEPTADA") {
                    console.log("El match ha sido aceptado");
                    
                    
                            var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            modalMatch.classList.add('modalMatch--show');
                           
                            setTimeout(function() {
                            window.location.href = 'adoptar.html';
                        }, 3000);
                        
                } else if (match.status === "RECHAZADA") {
                    console.log("No se puede concretar el match");
                    var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            window.location.href = 'adoptar.html';
                }
            } else {
                const apiUrl = `http://localhost:8080/adopcion/NewAdopcion`;

                var newStatus = 'PENDIENTE';
                const match2 = {
                    iduser: Id_pet,
                    iduserpropietario: Id_pet_match,
                    status: newStatus,
                    message:Message
                };


                return fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(match2)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Respuesta del servidor: exitosa', data);

                        var contador = sessionStorage.getItem('paginacion');
                        contador++;
                        sessionStorage.setItem('paginacion', contador);
                       window.location.href = 'adoptar.html';
                    })
                    .catch(error => {
                        console.error('Error al recuperar información:', error);
                    });
            }
        })
        .catch(error => {
            // Manejar errores aquí
            console.error('Error en la solicitud:', error);
        });
}

function NotAdoptar(Id_pet, Id_pet_match, token) {

    var match;
 
    verifyAdoptar(Id_pet, Id_pet_match, token)
        .then(data => {
            // Guardar el JSON en la variable match
            match = data;
            console.log('Variable match:', match);

            if (match.iduser!=-1 && match.iduserpropietario!=-1){
                if (match.status === "PENDIENTE") {
                   
                    const apiUrl = `http://localhost:8080/adopcion/aceptar?id_user=${match.iduser}&id_user_propietario=${match.iduserpropietario}&message=${Message1}&newStatus=RECHAZADA`;

                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Respuesta del servidor: exitosa', data);
                            var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            window.location.href = 'adoptar.html';
                        })
                        .catch(error => {
                            console.error('Error al recuperar información:', error);
                        });
                } else if (match.status === "RECHAZADA") {
                    console.log("No se puede concretar el match");
                    var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            window.location.href = 'adoptar.html';
                }else if (match.status === "ACEPATADA") {

                    var contador = sessionStorage.getItem('paginacion');
                    contador++;
                    sessionStorage.setItem('paginacion', contador);
                    window.location.href = 'adoptar.html';
                }
            } else {
                const apiUrl = `http://localhost:8080/adopcion/NewAdopcion`;

                var newStatus = 'RECHAZADA';
                var Message1="NOT ADOPT"
                const match2 = {
                    iduser: Id_pet,
                    iduserpropietario: Id_pet_match,
                    status: newStatus,
                    message:Message1
                };


                return fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(match2)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Respuesta del servidor: exitosa', data);

                        var contador = sessionStorage.getItem('paginacion');
                        contador++;
                        sessionStorage.setItem('paginacion', contador);
                        window.location.href = 'adoptar.html';
                    })
                    .catch(error => {
                        console.error('Error al recuperar información:', error);
                    });
            }
        })
        .catch(error => {
            // Manejar errores aquí
            console.error('Error en la solicitud:', error);
        });
}

function verifyAdoptar(Id_pet, Id_pet_match, token) {

  
    const apiUrl = `http://localhost:8080/adopcion/status?id_user=${Id_pet}&id_user_propietario=${Id_pet_match}`;
    
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        }
    
        // Verificar si la respuesta tiene contenido
        if (response.headers.get('content-length') === '0') {
            // No hay contenido, devuelve una promesa rechazada con un mensaje informativo
            return null;
        }
    
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor: exitosa');
        return data;
    })
    .catch(error => {
        console.error('Error al recuperar información:', error);
        throw error;
    });
}

