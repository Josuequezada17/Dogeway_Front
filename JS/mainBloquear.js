const openModalBloquear = document.querySelector(' .BtnGrlBloqueo');
const modalBloquear = document.querySelector(' .modalBloquear');
const closeModalBloquear = document.querySelector(' .fotoCloseBloquear');

openModalBloquear.addEventListener('click', (e) => {
    e.preventDefault();
    modalBloquear.classList.add('modalBloquear--show');
  });

  closeModalBloquear.addEventListener('click', (e) => {
    e.preventDefault();
    modalBloquear.classList.remove('modalBloquear--show');
  })

$(document).ready(function () {
    // Al cargar el documento, oculta y deshabilita la caja de texto
    $("#motivoTextoBloquear").prop("disabled", true).hide();

    // Asigna un evento de cambio a los radio buttons
    $("input[name='opcionesBloquear']").change(function () {
        // Verifica si la opción seleccionada es "Otros"
        if ($(this).val() === "otrosBloquear") {
            // Si es "Otros", habilita y muestra la caja de texto
            $("#motivoTextoBloquear").prop("disabled", false).show();
        } else {
            // Si no es "Otros", deshabilita y oculta la caja de texto
            $("#motivoTextoBloquear").prop("disabled", true).hide();
        }
    });
});