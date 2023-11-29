function registrarMascotass(){
    var data={
        nombre: $('#nombre').val(),
        animal: $('#mascota').val(),
        utilidadDeMascota: $('#funcion').val(),
        raza: $('#raza').val(),
        tamano: $('#tamanio').val(),
        genero: $('#genero').val(),
        descripcion: $('#descripcion').val()
    };

    fetch('http://localhost:8080/pet/create', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok');
    }
})
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.error(error);
});
}