$(document).ready(function() {
    // Verifica si el DataTable ya ha sido inicializado
    if ($.fn.DataTable.isDataTable('#example')) {
        // Destruye el DataTable existente
        $('#example').DataTable().destroy();
    }

    // Inicializa el DataTable
    $('#example').DataTable();
    
    // Después de inicializar el DataTable, ejecuta la lógica para mostrar los profesores no disponibles
    actualizarListaNoDisponibles();

    // Añade funcionalidad a los botones de editar
    $('#example').on('click', '.editar-btn', function() {
        var fila = $(this).closest('tr');
        var nombre = fila.find('td:eq(0)').text();
        var especialidad = fila.find('td:eq(1)').text();
        var cursos = fila.find('td:eq(2)').text();
        var horarios = fila.find('td:eq(3)').text();
        var disponibilidad = fila.find('td:eq(4)').text().trim();

        var nuevoNombre = prompt("Editar Nombre:", nombre);
        var nuevaEspecialidad = prompt("Editar Especialidad:", especialidad);
        var nuevosCursos = prompt("Editar Cursos:", cursos);
        var nuevosHorarios = prompt("Editar Horarios:", horarios);
        var nuevaDisponibilidad = prompt("Editar Disponibilidad:", disponibilidad);

        if (nuevoNombre) fila.find('td:eq(0)').text(nuevoNombre);
        if (nuevaEspecialidad) fila.find('td:eq(1)').text(nuevaEspecialidad);
        if (nuevosCursos) fila.find('td:eq(2)').text(nuevosCursos);
        if (nuevosHorarios) fila.find('td:eq(3)').text(nuevosHorarios);
        if (nuevaDisponibilidad) fila.find('td:eq(4)').text(nuevaDisponibilidad);

        actualizarListaNoDisponibles();
    });

    // Añade funcionalidad a los botones de borrar
    $('#example').on('click', '.borrar-btn', function() {
        var fila = $(this).closest('tr');
        if (confirm("¿Estás seguro de que deseas eliminar esta fila?")) {
            fila.remove();
            actualizarListaNoDisponibles();
        }
    });
});

function actualizarListaNoDisponibles() {
    var profesoresNoDisponibles = [];

    $('#example tbody tr').each(function() {
        var disponibilidad = $(this).find('td:eq(4)').text().trim();
        if (disponibilidad === 'No disponible') {
            var nombre = $(this).find('td:eq(0)').text();
            var especialidad = $(this).find('td:eq(1)').text();
            profesoresNoDisponibles.push({ nombre: nombre, especialidad: especialidad });
        }
    });

    var motivoList = $('#motivo');
    var alerta = $('#alerta');
    motivoList.empty(); // Vaciar la lista antes de actualizarla

    if (profesoresNoDisponibles.length === 0) {
        alerta.hide();
    } else {
        alerta.show();
        profesoresNoDisponibles.forEach(function(profesor) {
            motivoList.append('<li>' + profesor.nombre + ' - Motivo: ' + profesor.especialidad + '</li>');
        });
    }
}
