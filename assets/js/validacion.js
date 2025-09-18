  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("telefono");
  const contrasenaInput = document.getElementById("contrasena");
  const confirmarInput = document.getElementById("confirmar");

  // Spans de mensajes
  const nombreMsg = document.getElementById("nombreMsg");
  const emailMsg = document.getElementById("emailMsg");
  const telefonoMsg = document.getElementById("telefonoMsg");
  const contrasenaMsg = document.getElementById("contrasenaMsg");
  const confirmarMsg = document.getElementById("confirmarMsg");

  // Validaciones en tiempo real
  nombreInput.addEventListener("input", e => {nombreMsg.innerText = e.target.value.trim().length < 3 ? "Debe escribir al menos 3 caracteres": "";});
  emailInput.addEventListener("input", e => {emailMsg.innerText = !e.target.validity.valid? "Ingrese un correo válido": "";});
  telefonoInput.addEventListener("input", e => {const valor = e.target.value.trim();telefonoMsg.innerText =!/^\d{9}$/.test(valor) ? "El teléfono debe tener 9 dígitos" : "";});
  contrasenaInput.addEventListener("input", e => {contrasenaMsg.innerText =e.target.value.length < 6 ? "Mínimo 6 caracteres" : "";});
  confirmarInput.addEventListener("input", e => {confirmarMsg.innerText =e.target.value !== contrasenaInput.value? "Las contraseñas no coinciden": "";});

