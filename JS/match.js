function match(CurrentUser,MatchUser,status){

    const apiUrl = `http://localhost:8080/match/IsAMatch`;


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





function NotMatch(){

 const apiUrl = `http://localhost:8080/match/NotMatch`;


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