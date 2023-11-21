function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = {
        nombres: data.get('nombres'),
        apellidos: data.get('apellidos'),
        correo: data.get('correo'),
        telefono: data.get('telefono'),
        password: data.get('password'),
        confirm_password: data.get('confirm_password')
    };

    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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

const form = document.querySelector('#form');
form.addEventListener('submit', handleFormSubmit);

