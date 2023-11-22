function match(Id_pet,Id_pet_match,token){


    var match=verifyMatch(Id_pet,Id_pet_match,token);
 
    if(match){

    if(match.status==="PENDIENTE"){


        const apiUrl = `http://localhost:8080/match/aceptar?id_pet=${id_pet}&id_pet_match=${id_pet_match}&newStatus=ACEPTADA`;
       

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
            console.log('Respuesta del servidor:exitosa',data);
            var contador=localStorage.getItem('paginacion');
         contador++;
         localStorage.setItem('paginacion',contador);
         window.location.href = 'match.html';
          
   
        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
   
        });
   


    }else if(match.status==="ACEPTADA"){

     console.log("El match ha sido aceptado");

    }
    else if(match.status==="RECHAZADA"){

     console.log("No se puede concretar el match")

    }

    }else if(match.status===undefined){

    const apiUrl = `http://localhost:8080/match/NewMatch`;

    var newStatus='PENDIENTE';
    const match2={
        idpet:Id_pet,
        idpetmatch:Id_pet_match,
        status: newStatus
    }
    console.log(match2);

    fetch(apiUrl, {
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
            console.log('Respuesta del servidor:exitosa',data);

            var contador=localStorage.getItem('paginacion');
         contador++;
         localStorage.setItem('paginacion',contador);
        
          
   
        })
        .catch(error => {
            console.error('Error al recuperar información:', error);
            
   
        });
   

    }



    }





function NotMatch(id_pet,id_pet_match){

    const apiUrl = `http://localhost:8080/match/aceptar?id_pet=${id_pet}&id_pet_match=${id_pet_match}&newStatus=RECHAZADA`;
    

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
        console.log('Respuesta del servidor:exitos',data);
        var contador=localStorage.getItem('paginacion');
     contador++;
     localStorage.setItem('paginacion',contador);
     window.location.href = 'match.html';
      

    })
    .catch(error => {
        console.error('Error al recuperar información:', error);
        // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error

    });


        
         
}




function verifyMatch(Id_pet,Id_pet_match,token){

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
            throw error
   
        });
   


}