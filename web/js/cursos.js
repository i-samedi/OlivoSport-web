$(document).ready(function() {
  // Inicializar DataTable
  var table = $('#example').DataTable();

  // Mostrar formulario para añadir curso
  $('#showFormButton').on('click', function() {
    $('#courseForm').toggle();
    $('#formCurso')[0].reset();
    $('#cursoId').val('');
  });

  // Manejar el formulario de añadir/editar curso
  $('#formCurso').on('submit', function(e) {
    e.preventDefault();
    var cursoData = {
      curso: $('#curso').val(),
      profesor: $('#profesor').val(),
      horario: $('#horario').val(),
      estado: $('#estado').val(),
      especialidad: $('#especialidad').val(),
      cursoId: $('#cursoId').val()
    };

    if (cursoData.cursoId) {
      // Editar curso
      table.row(currentEditRow).data([
        cursoData.curso,
        cursoData.profesor,
        cursoData.horario,
        cursoData.estado,
        cursoData.especialidad,
        '<button class="editar-btn">Editar</button>',
        '<button class="borrar-btn">Borrar</button>'
      ]).draw();
    } else {
      // Añadir nuevo curso
      table.row.add([
        cursoData.curso,
        cursoData.profesor,
        cursoData.horario,
        cursoData.estado,
        cursoData.especialidad,
        '<button class="editar-btn">Editar</button>',
        '<button class="borrar-btn">Borrar</button>'
      ]).draw();
    }
    $('#courseForm').hide();
    $('#formCurso')[0].reset();
  });

  // Variable para almacenar la fila en edición
  var currentEditRow;

  // Manejar el botón de editar
  $('#example tbody').on('click', '.editar-btn', function() {
    currentEditRow = table.row($(this).parents('tr')).index();
    var data = table.row(currentEditRow).data();
    $('#curso').val(data[0]);
    $('#profesor').val(data[1]);
    $('#horario').val(data[2]);
    $('#estado').val(data[3]);
    $('#especialidad').val(data[4]);
    $('#cursoId').val(currentEditRow);
    $('#courseForm').show();
  });

  // Manejar el botón de eliminar
  $('#example tbody').on('click', '.borrar-btn', function() {
    if (confirm("¿Estás seguro de que deseas eliminar esta fila?")) {
      table.row($(this).parents('tr')).remove().draw();
    }
  });
});