
function match(Id_pet, Id_pet_match, token) {
    var modalMatch = document.querySelector('.modalMatch');
    var closeModalMatch = document.querySelector('.closeMatchFoto');
    var match;
    verifyMatch(Id_pet, Id_pet_match, token)
        .then(data => {
            // Guardar el JSON en la variable match
            match = data;
            console.log('Variable match:', match.idpetmatch);

            if (match.idpet!=-1 && match.idpetmatch!=-1){
                if (match.status === "PENDIENTE") {
                   if(match.idpet == Id_pet && match.idpetmatch == Id_pet_match){
                    alert("match ya fue hecho a este usuario");
                    var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            window.location.href = 'match.html';
                   }
                   else{
                    const apiUrl = `http://localhost:8080/match/aceptar?id_pet=${match.idpet}&id_pet_match=${match.idpetmatch}&newStatus=ACEPTADA`;

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
                            window.location.href = 'match.html';
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
                            window.location.href = 'match.html';
                        }, 3000);
                        
                } else if (match.status === "RECHAZADA") {
                    console.log("No se puede concretar el match");
                    var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            window.location.href = 'match.html';
                }
            } else {
                const apiUrl = `http://localhost:8080/match/NewMatch`;

                var newStatus = 'PENDIENTE';
                const match2 = {
                    idpet: Id_pet,
                    idpetmatch: Id_pet_match,
                    status: newStatus
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
                       window.location.href = 'match.html';
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

function NotMatch(Id_pet, Id_pet_match, token) {


   

    var match;
 
    verifyMatch(Id_pet, Id_pet_match, token)
        .then(data => {
            // Guardar el JSON en la variable match
            match = data;
            console.log('Variable match:', match.idpetmatch);

            if (match.idpet!=-1 && match.idpetmatch!=-1){
                if (match.status === "PENDIENTE") {
                   
                    const apiUrl = `http://localhost:8080/match/aceptar?id_pet=${match.idpet}&id_pet_match=${match.idpetmatch}&newStatus=RECHAZADA`;

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
                            window.location.href = 'match.html';
                        })
                        .catch(error => {
                            console.error('Error al recuperar información:', error);
                        });
                } else if (match.status === "RECHAZADA") {
                    console.log("No se puede concretar el match");
                    var contador = sessionStorage.getItem('paginacion');
                            contador++;
                            sessionStorage.setItem('paginacion', contador);
                            window.location.href = 'match.html';
                }else if (match.status === "ACEPTADA") {

                    var contador = sessionStorage.getItem('paginacion');
                    contador++;
                    sessionStorage.setItem('paginacion', contador);
                    window.location.href = 'match.html';
                }
            } else {
                const apiUrl = `http://localhost:8080/match/NewMatch`;

                var newStatus = 'RECHAZADA';
                const match2 = {
                    idpet: Id_pet,
                    idpetmatch: Id_pet_match,
                    status: newStatus
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
                        window.location.href = 'match.html';
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

function verifyMatch(Id_pet, Id_pet_match, token) {

  
    const apiUrl = `http://localhost:8080/match/status?id_pet=${Id_pet}&id_pet_match=${Id_pet_match}`;
    
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

