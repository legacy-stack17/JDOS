
const WHATSAPP = '50584950711';
const form = document.getElementById('form-contacto');
const estado = document.getElementById('form-estado');

form.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const mensaje = form.mensaje.value.trim();
  const errores = [];

  if (nombre.length < 3) errores.push('Escribe tu nombre (mínimo 3 letras).');
  if (telefono && !/^[0-9+\s-]{8,15}$/.test(telefono)) errores.push('El teléfono debe tener entre 8 y 15 números.');
  if (mensaje.length < 10) errores.push('El mensaje debe tener al menos 10 caracteres.');

  if (errores.length) {
    estado.textContent = errores.join(' ');
    estado.className = 'estado error';
    return;
  }

  const texto = 'Hola, soy ' + nombre + '.' + (telefono ? ' Mi teléfono: ' + telefono + '.' : '') + '\n' + mensaje;
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  estado.textContent = 'Se abrió WhatsApp con tu mensaje. Solo falta presionar enviar.';
  estado.className = 'estado ok';
  form.reset();
});
