// Seleccionamos los elementos del HTML
const inputFecha = document.getElementById("fechaNacimiento");
const btnCalcular = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");
const textoEdad = document.getElementById("textoEdad");
const mensajeError = document.getElementById("mensajeError");

// 1. Inicializamos Flatpickr (Usando la variable global que cargó el HTML)
const datepicker = flatpickr(inputFecha, {
    locale: "es",              // Español
    dateFormat: "d/m/Y",       // Formato Día/Mes/Año
    maxDate: "today",          // No permite fechas futuras
    disableMobile: true,       // Fuerza el datepicker externo
    allowInput: false          // No permite escribir a mano
});

// 2. Función al dar clic en "Calcular"
btnCalcular.addEventListener("click", () => {
    mensajeError.textContent = "";
    
    const fechaSeleccionada = datepicker.selectedDates[0];

    if (!fechaSeleccionada) {
        mensajeError.textContent = "Por favor, selecciona una fecha válida.";
        resultado.style.display = "none";
        return;
    }

    // 3. Usamos Luxon (que ya está cargado globalmente)
    // Creamos la fecha a partir del input
    const fechaNacimientoLuxon = luxon.DateTime.fromJSDate(fechaSeleccionada);
    const hoy = luxon.DateTime.now();

    // Validación
    if (!fechaNacimientoLuxon.isValid) {
        mensajeError.textContent = "La fecha ingresada no es válida.";
        resultado.style.display = "none";
        return;
    }

    // 4. Cálculo exacto
    const diferencia = hoy.diff(fechaNacimientoLuxon, ["years", "months", "days"]).toObject();

    const anios = Math.floor(diferencia.years);
    const meses = Math.floor(diferencia.months);
    const dias = Math.floor(diferencia.days);

    // 5. Mostrar resultado
    if (anios === 0 && meses === 0) {
        textoEdad.textContent = `${dias} días`;
    } else if (anios === 0) {
        textoEdad.textContent = `${meses} meses y ${dias} días`;
    } else {
        textoEdad.textContent = `${anios} años y ${meses} meses`;
    }
    
    resultado.style.display = "block";
});