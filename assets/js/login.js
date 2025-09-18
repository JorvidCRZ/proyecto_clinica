//Obtener referencias a los elementos del DOM
const correo = document.getElementById('correo');
const clave = document.getElementById('clave');
//Mensajes de error para los campos de correo y clave
const correoMsg = document.getElementById('correoMsg');
const claveMsg = document.getElementById('claveMsg');

//validaciones visuales en tiempo real
if (correo && clave && correoMsg && claveMsg) {
    //(loguear) que se llama al hacer clic en el botón de login
    correo.addEventListener('input', e => {correoMsg.innerText = (!e.target.checkValidity()) ? 'Use formato de correo' : '';});
    clave.addEventListener('input', e => {claveMsg.innerText = (e.target.value.length < 6) ? 'La contraseña debe tener al menos 6 caracteres' : '';});
    // Agregar evento de envío al formulario
      window.loguear = async function () {
        const email = correo.value.trim().toLowerCase();
        const password = clave.value.trim();

        // Validar campos vacíos
        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Validar inicio de sesión de administrador
        if (email === "admin@mail.com" && password === "123456") {
            alert("Inicio de sesión exitoso (admin)");
            sessionStorage.setItem("usuarioActivo", JSON.stringify({ email, nombre: "Administrador", rol: "admin" }));
            window.location = 'intranet.html';
            return;
        }

        // Verificar si el usuario existe en localStorage
        const usuarioJSON = localStorage.getItem(`user_${email}`);
        // Si no existe, mostrar mensaje de error si el usuario no fue encontrado
        if (!usuarioJSON) {
            alert("Usuario no encontrado.");
            return;
        }
        //Convierte el texto JSON obtenido del localStorage a un objeto JavaScript
        const usuario = JSON.parse(usuarioJSON);
        // Genera el hash SHA-256 de la contraseña ingresada
        const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
        const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');

        // Compara el hash de la contraseña ingresada con el almacenado
        if (usuario.contrasena === hashHex || usuario.contrasena === password) {
            // Si coinciden, muestra mensaje de éxito y redirige a la intranet
            alert("Inicio de sesión exitoso");
            
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            window.location = 'intranet.html';
        } else {
            alert("Contraseña incorrecta.");
        }
    }
}


// Función para mostrar/ocultar la contraseña
function verClave(icon, inputId) {
  const input = document.getElementById(inputId);
  const isVisible = input.type === "text";
  // Cambia el icono entre ojo abierto y ojo cerrado
  input.type = isVisible ? "password" : "text";
  icon.classList.toggle("bi-eye-fill", !isVisible);
  icon.classList.toggle("bi-eye-slash-fill", isVisible);
}

// Función para salir de la sesión
window.salir = function () {
    // Confirmar si el usuario realmente quiere salir
    if (confirm("¿Está seguro que desea salir?")) {
        //Nos lleva a la página de inicio de sesión
        window.location = 'login.html';
    }
}



