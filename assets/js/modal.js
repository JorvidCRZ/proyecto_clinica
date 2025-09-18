
    const form = document.getElementById('formContacto');
    const dialog = document.getElementById('dialogModal');

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');;

  // Spans de mensajes
    const nombreMsg = document.getElementById('nombreMsg');
    const emailMsg = document.getElementById('emailMsg');
    const mensajeMsg = document.getElementById('mensajeMsg');

    //validacione en tiempo real
    nombre.addEventListener('input', e => {nombreMsg.innerText = (e.target.value.length < 2) ? 'Debe de escribir el nombre completo' : '';});
    correo.addEventListener('input', e => {emailMsg.innerText = (!e.target.checkValidity()) ? 'Use formato de correo' : '';});
    mensaje.addEventListener('input', e => {mensajeMsg.innerText = (e.target.value.length < 8) ? 'Debe de contener un mensaje minimo de 8 caracteres' : '';});

    //muestra el modal una vez que se envía el formulario 
    form.addEventListener("submit", function (e) {
      e.preventDefault(); 
      // Obtener los valores de los campos
      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("email").value;
      const mensaje = document.getElementById("mensaje").value;
      // Obtener los elementos del modal
      modalNombre.textContent = nombre;
      modalCorreo.textContent = correo;
      modalMensaje.textContent = mensaje;
      // Mostrar el modal
      dialog.showModal();
      // Limpiar los campos del formulario
      form.reset();
    });
