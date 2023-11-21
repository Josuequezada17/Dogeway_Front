function match(){

    

    var contador=localStorage.getItem('paginacion');
    contador++;
    localStorage.setItem('paginacion',contador);
    window.location.href = 'match.html';

    }





function NotMatch(){

 
    var contador=localStorage.getItem('paginacion');
    contador++;
    localStorage.setItem('paginacion',contador);
    window.location.href = 'match.html';
 


}