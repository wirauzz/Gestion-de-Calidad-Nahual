const servicioNotificacion = {
  mostrarMensajeExito: function (titulo, descripcion) {
    document.getElementById("mensaje-exito").style.display = "block";
    document.getElementById("titulo-mensaje-exito").innerHTML = titulo;
    document.getElementById(
      "mensaje-exito-description"
    ).innerHTML = descripcion;
    setTimeout(function () {
      document.getElementById("mensaje-exito").style.display = "none";
    }, 5000);
  },
  mostrarMensajeError: function (titulo, descripcion) {
    document.getElementById("mensaje-error").style.display = "block";
    document.getElementById("titulo-mensaje-error").innerHTML = titulo;
    document.getElementById(
      "mensaje-error-description"
    ).innerHTML = descripcion;
    setTimeout(function () {
      document.getElementById("mensaje-error").style.display = "none";
    }, 5000);
  },
  mostrarMensajeAdvertencia: function (titulo, descripcion) {
    document.getElementById("mensaje-advertencia").style.display = "block";
    document.getElementById("titulo-mensaje-advertencia").innerHTML = titulo;
    document.getElementById(
      "mensaje-advertencia-description"
    ).innerHTML = descripcion;
    setTimeout(function () {
      document.getElementById("mensaje-advertencia").style.display = "none";
    }, 5000);
  },
};

export default servicioNotificacion;
