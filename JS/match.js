function match(CurrentUser,MatchUser){


    var match=verifyMatch(CurrentUser,MatchUser)

    if(match.status==="PENDIENTE"){


        const apiUrl = `http://localhost:8080/match/acceptar`;
        const status= {
        id_user: match.id_user,
        id_user_match: match.id_user_match,
        Status:'ACEPTADA'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
           
        },
        body: JSON.stringify(status)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:exitosa',data);
          
   
        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
   
        });
   


    }else if(match.status==="ACEPTADA"){

     console.log("El match ha sido aceptado");

    }
    else if(status==="RECHAZADA"){

     console.log("No se puede concretar el match")

    }else{


        const apiUrl = `http://localhost:8080/match/pendiente`;
        const status= {
        id_user: Id_user,
        id_user_match:Id_user_match,
        Status:'PENDIENTE'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
           
        },
        body: JSON.stringify(status)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:exitosa',data);
          
   
        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
   
        });
   

    }



    }





function NotMatch(){

         var contador=localStorage.getItem('paginacion');
         contador++;
         localStorage.setItem('paginacion',contador);
         window.location.href = 'match.html';
         
}




function verifyMatch(Id_pet,Id_pet_match){

    const apiUrl = `http://localhost:8080/match/status?id_pet=${Id_pet}&id_pet_match=${Id_pet_match}`;
    
    fetch(apiUrl, {
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
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:exitosa',data);
           return data;
   
        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
   
        });
   




}