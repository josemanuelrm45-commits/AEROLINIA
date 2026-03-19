function reservar() {
    // Obtener valores de los campos
    let nombre = document.getElementById("nombre").value.trim();
    let origen = document.getElementById("origen").value;
    let destino = document.getElementById("destino").value;
    let fecha = document.getElementById("fecha").value;
    let clase = document.getElementById("clase").value;
    let resultado = document.getElementById("resultado");

    if (nombre === "" || origen === "" || destino === "" || fecha === "" || clase === "") {
        mostrarError("❌ Por favor, completa todos los campos");
        return;
    }

    if (origen === destino) {
        mostrarError("❌ El origen y destino no pueden ser iguales");
        return;
    }

    let fechaSeleccionada = new Date(fecha);
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < fechaActual) {
        mostrarError("❌ La fecha no puede ser anterior a hoy");
        return;
    }

    let nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombreRegex.test(nombre)) {
        mostrarError("❌ El nombre solo debe contener letras");
        return;
    }

    let precio = clase === "economica" ? 5000 : 12000;
    let claseFormateada = clase === "economica" ? "Económica" : "Ejecutiva";
 
    let impuestos = precio * 0.16;
    let total = precio + impuestos;

    let fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    resultado.innerHTML = `
        <div style="text-align: center">
            ✅ ¡Reserva confirmada exitosamente!<br><br>
        </div>
        <strong>Pasajero:</strong> ${nombre}<br>
        <strong>Ruta:</strong> ${origen} ✈️ ${destino}<br>
        <strong>Fecha:</strong> ${fechaFormateada}<br>
        <strong>Clase:</strong> ${claseFormateada}<br>
        <strong>Precio base:</strong> $${precio.toLocaleString('es-MX')} MXN<br>
        <strong>IVA (16%):</strong> $${impuestos.toLocaleString('es-MX')} MXN<br>
        <strong style="color: #ff6b6b">Total:</strong> $${total.toLocaleString('es-MX')} MXN<br><br>
        <small style="color: #666">Te enviaremos la confirmación a tu correo</small>
    `;
    resultado.style.color = "#333";
    resultado.style.backgroundColor = "rgba(240, 249, 240, 0.95)";
    resultado.style.borderLeftColor = "#00C851";

    resultado.style.animation = "none";
    resultado.offsetHeight;
    resultado.style.animation = "slideIn 0.5s ease";

    setTimeout(() => {
        if (confirm("¿Deseas realizar otra reserva?")) {
            limpiarFormulario();
        }
    }, 3000);
}

function mostrarError(mensaje) {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = mensaje;
    resultado.style.color = "#ff4444";
    resultado.style.backgroundColor = "rgba(255, 240, 240, 0.95)";
    resultado.style.borderLeftColor = "#ff4444";
    
    resultado.style.animation = "none";
    resultado.offsetHeight;
    resultado.style.animation = "slideIn 0.5s ease";
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("origen").value = "";
    document.getElementById("destino").value = "";
    document.getElementById("fecha").value = new Date().toISOString().split('T')[0];
    document.getElementById("clase").value = "";
    document.getElementById("resultado").innerHTML = "";
}

function scrollToReservas() {
    document.getElementById("reservas").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener('DOMContentLoaded', function() {
    // Establecer fecha mínima como hoy
    let today = new Date().toISOString().split('T')[0];
    let fechaInput = document.getElementById('fecha');
    fechaInput.min = today;
    fechaInput.value = today;
    
    fechaInput.addEventListener('change', function() {
        let fechaSeleccionada = new Date(this.value);
        let fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        
        if (fechaSeleccionada < fechaActual) {
            this.value = today;
            mostrarError("❌ La fecha se ha ajustado a hoy");
            
            setTimeout(() => {
                document.getElementById("resultado").innerHTML = "";
            }, 3000);
        }
    });

    let origenSelect = document.getElementById('origen');
    let destinoSelect = document.getElementById('destino');

    function validarDestinos() {
        if (origenSelect.value && destinoSelect.value && origenSelect.value === destinoSelect.value) {
            mostrarError("⚠️ El origen y destino no pueden ser iguales");
            destinoSelect.value = "";
        }
    }

    origenSelect.addEventListener('change', validarDestinos);
    destinoSelect.addEventListener('change', validarDestinos);

    // Capitalizar nombre mientras se escribe
    document.getElementById('nombre').addEventListener('input', function(e) {
        let palabras = this.value.split(' ');
        for (let i = 0; i < palabras.length; i++) {
            if (palabras[i].length > 0) {
                palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1).toLowerCase();
            }
        }
        this.value = palabras.join(' ');
    });

    console.log("✈️ SkyFly - Sistema de reservas listo con fondo profesional");
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        reservar();
    }
});