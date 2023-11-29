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

       
}

