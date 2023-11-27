//Notificación para activar ubicación

// Verificar el soporte de geolocalización
if (navigator.geolocation) {
    // Verificar si ya se otorgó permiso
    var permisoOtorgado = sessionStorage.getItem('permisoUbicacion');

    if (!permisoOtorgado) {
        // Solicitar permiso explícitamente
        if (confirm("Esta página web desea acceder a tu ubicación. ¿Permitir?")) {
            // Obtener la ubicación
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // Ubicación obtenida con éxito
                    var latitud = position.coords.latitude;
                    var longitud = position.coords.longitude;
                    alert("Ubicación obtenida con éxito. Latitud: " + latitud + ", Longitud: " + longitud);

                    // Marcar el permiso como otorgado
                    sessionStorage.setItem('permisoUbicacion', 'otorgado');
                },
                function(error) {
                    // En caso de error al obtener la ubicación
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("Permiso denegado para acceder a la ubicación.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Información de ubicación no disponible.");
                            break;
                        case error.TIMEOUT:
                            alert("Tiempo de espera agotado al obtener la ubicación.");
                            break;
                        case error.UNKNOWN_ERROR:
                            alert("Error desconocido al obtener la ubicación.");
                            break;
                    }
                }
            );
        } else {
            // El usuario ha denegado el permiso
            alert("Permiso denegado para acceder a la ubicación.");
        }
    }
} else {
    // El navegador no soporta geolocalización
    alert("Tu navegador no soporta geolocalización.");
}