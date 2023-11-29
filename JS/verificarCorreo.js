// Función para enviar el código de verificación
const enviarCodigoVerificacion = async (correo) => {
    try {
        const response = await fetch(`http://localhost:8080/usuario/user?correo=${encodeURIComponent(correo)}/verifier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Código de verificación enviado exitosamente');
        } else {
            console.error('Error al enviar el código de verificación');
        }
    } catch (error) {
        console.error('Error de red', error);
    }
};

// ...

// Después de que el usuario se ha registrado correctamente
.then(message => {
    console.log('Respuesta del servidor:', message);

    // Enviar código de verificación al correo del usuario
    enviarCodigoVerificacion(correo);

    // Redireccionar a la página de inicio de sesión
    window.location.href = 'loginDogeway.html';
})
.catch(error => {
    console.error('Error al enviar la solicitud:', error);
    alert("Uno de los campos es incorrecto, Verifícalo");
});
