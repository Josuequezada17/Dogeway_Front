const openModalReportar = document.querySelector(' .BtnGrlReportar');
const modalReportar = document.querySelector(' .modalReportar');
const closeModalReportar = document.querySelector(' .fotoCloseReportar');

openModalReportar.addEventListener('click', (e) => {
    e.preventDefault();
    modalReportar.classList.add('modalReportar--show');
  });

  closeModalReportar.addEventListener('click', (e) => {
    e.preventDefault();
    modalReportar.classList.remove('modalReportar--show');
  });

$(document).ready(function () {
    // Al cargar el documento, oculta y deshabilita la caja de texto
    $("#motivoTextoReportar").prop("disabled", true).hide();

    // Asigna un evento de cambio a los radio buttons
    $("input[name='opcionesReportar']").change(function () {
        // Verifica si la opción seleccionada es "Otros"
        if ($(this).val() === "otrosReportar") {
            // Si es "Otros", habilita y muestra la caja de texto
            $("#motivoTextoReportar").prop("disabled", false).show();
        } else {
            // Si no es "Otros", deshabilita y oculta la caja de texto
            $("#motivoTextoReportar").prop("disabled", true).hide();
        }
    });
});