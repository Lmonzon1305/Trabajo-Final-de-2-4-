// Función botón modificar
function modificar( event ) {

    let row = event.target.closest("tr");
    let cells = row.cells;
    // Modificar el contenido de las celdas
    for (let i = 0; i < cells.length - 1; i++) {
        let nuevoValor = prompt( `Dato ${ cells[ i ].textContent } por`, cells[ i ].textContent );
        if ( nuevoValor !== null && nuevoValor !== "" ) {
            cells[ i ].textContent = nuevoValor;
        }
    }
}
  
// Función botón eliminar
function eliminar( event ) {

    // Obtener la fila a la que pertenece el botón
    let fila = event.target.closest("tr");
    fila.parentNode.removeChild(fila);
}

// Función para agregar una fila y contenido a una tabla
function agregarFila( idTabla, data ) {

    let tabla = document.querySelector( idTabla );

    // Iterar el objeto data
    for ( let key in data ) {

        let rowData = data[ key ];
        let row = tabla.insertRow();

        // Insertar info en las columnas
        for ( let i = 0; i < rowData.length; i++ ) {

            let cell = row.insertCell();
            cell.textContent = rowData[ i ];
        }
        
        //Insertar estado por defecto
        let estado = row.insertCell();
        estado.textContent = "A confirmar";

        let columnaAcciones = row.insertCell();
        //Boton modificar
        let botonModificar = document.createElement( "button" );
        let imgModificar = document.createElement( "img" );
        imgModificar.src = "../image/modificar.png";
        imgModificar.className = "imagenModificar";
        botonModificar.appendChild( imgModificar );
        columnaAcciones.appendChild( botonModificar );
        botonModificar.addEventListener("click", modificar );
        //Boton eliminar
        let botonEliminar = document.createElement( "button" );
        let imgEliminar = document.createElement( "img" );
        imgEliminar.src = "../image/eliminar.png";
        imgEliminar.className = "imagenEliminar";
        botonEliminar.appendChild( imgEliminar );
        columnaAcciones.appendChild( botonEliminar );
        botonEliminar.addEventListener( "click", eliminar );
    }
}

let contenido = {
    fila0: [ "47", "000340", "21/05/2023", "$ 1890,00", "Targeta" ],
    fila1: [ "48", "000341", "21/05/2023", "$ 2225,00", "Transferencia" ],
    fila2: [ "47", "000340", "21/05/2023", "$ 1890,00", "Targeta" ],
    fila3: [ "48", "000341", "21/05/2023", "$ 2225,00", "Transferencia" ],
};

agregarFila( "#dataTable", contenido );

// Para que se cargue despues de todo el buscador
window.addEventListener('DOMContentLoaded', function() {

    const buscador = document.querySelector('.buscador');

    // Agregar un evento de escucha al buscador
    buscador.addEventListener('input', function() {
        // Obtener el valor ingresado en el buscador
        const valorBuscador = this.value.toLowerCase();

        // Obtener todas las filas de la tabla
        const filas = document.querySelectorAll('#dataTable tr');

        // Recorrer todas las filas
        filas.forEach(function(fila) {
            // Obtener el texto de la fila
            const textoFila = fila.textContent.toLowerCase();

            // Verificar si el texto de la fila incluye el valor del buscador
            if (textoFila.includes(valorBuscador)) {
                // Si incluye el valor del buscador, mostrar la fila
                fila.style.display = '';
            } else {
                // Si no incluye el valor del buscador, ocultar la fila
                fila.style.display = 'none';
            }
        });
    });
});
