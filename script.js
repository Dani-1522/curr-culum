$(document).ready(function() {
    // Validación del formulario de contacto
    $('#contactForm').submit(function(event) {
        event.preventDefault();
        let isValid = true;

        // Validar el campo Nombre
        const nameInput = $('#name');
        if (nameInput.val().trim() === '') {
            nameInput.addClass('is-invalid');
            isValid = false;
        } else {
            nameInput.removeClass('is-invalid');
        }

        // Validar el campo Correo Electrónico
        const emailInput = $('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.val())) {
            emailInput.addClass('is-invalid');
            isValid = false;
        } else {
            emailInput.removeClass('is-invalid');
        }

        // Validar el campo Mensaje
        const messageInput = $('#message');
        if (messageInput.val().trim() === '') {
            messageInput.addClass('is-invalid');
            isValid = false;
        } else {
            messageInput.removeClass('is-invalid');
        }

        if (isValid) {
            // Datos del formulario para EmailJS
            const formData = {
                name: nameInput.val(),
                email: emailInput.val(),
                message: messageInput.val()
            };

            // Envío del correo electrónico con EmailJS
            emailjs.send("service_nr9q30i", "template_pve1sj5", formData) // Reemplaza con tus IDs
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                // Mostrar mensaje de éxito
                $('#successMessage').show();
                // Ocultar mensaje de error (en caso de que estuviera visible)
                $('#errorMessage').fadeOut();
                // Limpiar el formulario
                $('#contactForm')[0].reset();
            }, function(error) {
                console.log('FAILED...', error);
                // Ocultar mensaje de éxito (en caso de que estuviera visible)
                $('#successMessage').fadeOut();
                // Mostrar mensaje de error
                $('#errorMessage').text('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo más tarde.');
                $('#errorMessage').fadeIn();
            });
        }
    });

    // Remover la clase 'is-invalid' al cambiar el valor de los campos
    $('#name, #email, #message').on('input', function() {
        $(this).removeClass('is-invalid');
        $('#successMessage').fadeOut();
        $('#errorMessage').fadeOut();
    });

    // Ejemplo de animación con jQuery (al hacer scroll, la sección "Acerca de Mí" hace un fadeIn)
    $(window).scroll(function() {
        if ($('#acerca').length) {
            const topOfAboutMe = $('#acerca').offset().top;
            const bottomOfAboutMe = topOfAboutMe + $('#acerca').outerHeight();
            const scrollPosition = $(window).scrollTop() + $(window).height();

            if (scrollPosition > topOfAboutMe && $(window).scrollTop() < bottomOfAboutMe) {
                $('#acerca').fadeIn(1000);
            } else {
                $('#acerca').fadeOut(1000);
            }
        }
    }).scroll();

    // Otro ejemplo: Hacer que el encabezado tenga una ligera animación al cargar
    $('header').hide().slideDown(1000);
});