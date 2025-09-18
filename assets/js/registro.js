//esta función se ejecuta cuando se envía el formulario de registro
async function registrarUsuario(event) {
  // Prevenir recarga de la pagina
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const telefono = document.getElementById("telefono").value.trim();
  const genero = document.getElementById("genero").value;
  const fecha = document.getElementById("fechaNacimiento").value;
  const contrasena = document.getElementById("contrasena").value;
  const mensaje = document.getElementById("mensaje");

  // Verificar si ya existe un usuario registrado con ese correo electrónico en localStorage
  if (localStorage.getItem(`user_${email}`)) {
    mensaje.innerHTML = "<p style='color:red'>Este correo ya está registrado</p>";
    return;
  }
  //Encriptar contraseña
  //Convierte la contraseña (string) a un array de bytes (Uint8Array). 
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(contrasena));
  //Convierte el array de bytes a un string hexadecimal.
  const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  //Crea un objeto usuario con los datos del formulario
  const usuario = {
    nombre,
    email,
    telefono,
    genero,
    fechaNacimiento: fecha,
    contrasena: hashHex
  };

  // Almacenar el usuario en localStorage
  // Utiliza el email como clave para almacenar el usuario y convierte el objeto usuario a una cadena JSON
  localStorage.setItem(`user_${email}`, JSON.stringify(usuario));
  // Mostrar mensaje de éxito
  mensaje.innerHTML = "<p style='color:green'>¡Registro exitoso! <a href='login.html'>Iniciar sesión</a></p>";
  // Desaparecer el mensaje después de 2 segundos
  setTimeout(() => {mensaje.innerHTML = "";}, 2000);
  // Limpiar el formulario después de registrar al usuario
  document.getElementById("formRegistro").reset();
}