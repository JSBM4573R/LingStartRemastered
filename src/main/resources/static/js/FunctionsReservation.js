function agregarReserva() {
    //capturar los valores contenidos en las cajas de los input del formualrio index.html
    var datos={
        id:$("#ReservaID").val(),
        room:$("#room").val(),
        startdate:$("#startdate").val(),
        enddate:$("#enddate").val(),
    }
    //convertir a JSON
    let datosPeticion=JSON.stringify(datos);

    //Realizamos la peticion AJAX
    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/reserva/reserva",
        data:datosPeticion,
        type:"POST",
        contentType:"application/JSON",
        //si es correcto muestreme mensaje        
        success:function (respuesta){
            console.log("insertado exitosamente")
        },
        //si es incorrecto muestreme error = xhr
        error:function(xhr, status){
            console.log(status);
        }
    });
}

function listarReserva() {
    $("#btn-agregarReserva").hide();

    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/reserva/reserva",
        Type:"GET",
        dataType:"json",

        success:function (respuesta) {
            console.log(respuesta);
            listarRespuestaReserva(respuesta.items);
        },

        error:function (xhr, status) {
            console.log(status);
        }
        
    });
}

function listarRespuestaReserva(items) {
    var tabla=`<table border="2">
                <tr>
                    <th>CODIGO</th>
                    <th>HABITACION</th>
                    <th>LLEGADA</th>
                    <th>SALIDA</th>
                </tr>`;
                // <th colspan="2">ACCIONES</th>
    for (let i = 0; i < items.length; i++) {
        tabla+=`<tr>
                    <td>${items[i].id} </td>
                    <td>${items[i].room} </td>
                    <td>${items[i].startdate} </td>
                    <td>${items[i].enddate} </td>
                    <td><button onclick="borrarRegistroReserva(${items[i].id})">Cancelar</button></td>
                </tr>`;
    }
    tabla+=`</table>`

    console.log(tabla);

    $("#listadoReserva").html(tabla)
    // <td><button onclick="editarRegistroReserva(${items[i].id})">Editar</button></td>
    // <td><button onclick="borrarRegistroReserva(${items[i].id})">Borrar</button></td>
}

function editarRegistroReserva(ReservaID) {
    $("#btn-guardarEdicionReserva").show();
    $("#btn-agregarReserva").hide();
    $("#btn-listarReserva").hide();
    $("#ReservaID").prop('disabled', true);

    var datos={
        id:ReservaID
    }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/reserva/reserva/"+ReservaID,
        data:datosPeticion,
        type:'GET',
        dataType:'json',
    
        success:function (respuesta) {
            var items=respuesta.items;

            $('#ReservaID').val(items[0].id),
            $('#room').val(items[0].room),
            $('#startdate').val(items[0].startdate),
            $('#enddate').val(items[0].enddate),
            console.log(items);
        },

        //xhr = codigo del error
        error:function(xhr, status){
            console.log(status);
    
        }
    });
}

function actualizarRegistroReserva() {
    var datos={
        id:$("#ReservaID").val(),
        room:$("#room").val(),
        startdate:$("#startdate").val(),
        enddate:$("#enddate").val(),
    }

    

    //conversion a JSON
    let datosPeticion=JSON.stringify(datos);

    //Hacemos peticion Ajax
    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/reserva/reserva",
        data:datosPeticion,
        type:'PUT',
        contentType:'application/JSON',

        success:function (respuesta) {
            console.log("actualizado!");
            listarReserva();
        },

        //xhr = codigo del error
        error:function(xhr, status){
            console.log(status);

        }
    });
}

function borrarRegistroReserva(ReservaID) {
    var datos={
        id:ReservaID
    }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/reserva/reserva",
        data:datosPeticion,
        type:"DELETE",
        contentType:"application/JSON",

        success:function (respuesta) {
            console.log("Borrado");
            listarReserva();
        },
    
        //xhr = codigo del error
        error:function(xhr, status){
            console.log(status);
        }
    });
}