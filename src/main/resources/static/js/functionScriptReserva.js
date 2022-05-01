function agregarReserva() {
    var incio = $("#startdate").val()
    var fin = $("#enddate").val()
    if(incio.length==0 || fin.length==0){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Elige un rango de Fecha',
            showConfirmButton: true,
        });
    } else {
        var datos={
            room:$("#room").val(),
            dateGetInto:$("#startdate").val(),
            dateGetOut:$("#enddate").val(),
            user:{id: +$("#select-user").val()}
        }
        let datosPeticion=JSON.stringify(datos);
        $.ajax({
            url:`http://158.101.30.210:8081/api/reservation/new`,
            data:datosPeticion,
            type:"POST",
            contentType:"application/JSON",
            success:function (){
                console.log("insertado exitosamente")
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Reservado exitosamente',
                    showConfirmButton: false,
                    timer: 1800
                });
                $("#startdate").val("");
                $("#enddate").val("");
            },
            error:function(xhr, status){
                console.log(status);
            }
        });
    }
}

function validateReservation() {
    var room = $('#room').val()
    var dateGetInto = $('#startdate').val()
    var dateGetOut = $('#enddate').val()
    if (room.length==0 || dateGetInto.length==0 || dateGetOut.length==0) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Todos los campos son necesarios!',
                showConfirmButton: false,
                timer: 1900
            })
    } else {
        document.formSaveReservation.submit();
    }
}

function MisReservas() {
    $.ajax({
        url:`http://158.101.30.210:8081/api/user/username`,
        Type:'GET',
        dataType:'JSON',
        success:function(request) {
            console.log(request)
            listarRespuestaReserva(request.reservations);
            // listarRespuestaReserva(respuesta);
        },
        error:function() {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Todavia no tienes ninguna Reserva activa',
                showConfirmButton: true,
            })
        }
    }) 
}

// function listarReservas(id) {
//     // $("#btn-agregarReserva").hide();
//     $.ajax({
//         url:`http://158.101.30.210:8081/api/user/reservations/${id}`,
//         Type:"GET",
//         dataType:"json",
//         success:function (respuesta) {
//             console.log(respuesta);
//             listarRespuestaReserva(respuesta);
//         },
//         error:function (xhr, status) {
//             console.log(status);
//         }
//     });
// }

function listarRespuestaReserva(items) {
    var tabla=`<table border="2">
                <tr>
                    <th>HABITACION</th>
                    <th>LLEGADA</th>
                    <th>SALIDA</th>
                </tr>`;
                // <th colspan="2">ACCIONES</th>
    for (let i = 0; i < items.length; i++) {
        tabla+=`<tr>
                    <td>${items[i].room} </td>
                    <td>${items[i].dateGetInto} </td>
                    <td>${items[i].dateGetOut} </td>
                    <td><button class="btn-borrarRegistroReserva" onclick="borrarRegistroReserva(${items[i].id})">Cancelar</button></td>
                </tr>`;
    }
    tabla+=`</table>`
    console.log(tabla);
    $("#listadoReserva").html(tabla)
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
        url:`http://158.101.30.210:8081/api/reservation/${ReservaID}`,
        data:datosPeticion,
        type:'GET',
        dataType:'json',
        success:function (respuesta) {
            var items=respuesta.items;
            $('#ReservaID').val(items.id),
            $('#room').val(items.room),
            $('#startdate').val(items.dateGetInto),
            $('#enddate').val(items.dateGetOut),
            console.log(items);
        },
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
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:`http://158.101.30.210:8081/api/reservation/update`,
        data:datosPeticion,
        type:'PUT',
        contentType:'application/JSON',
        success:function (respuesta) {
            console.log("actualizado!");
            listarReserva();
        },
        error:function(xhr, status){
            console.log(status);

        }
    });
}

function borrarRegistroReserva(ReservaID) {
    Swal.fire({
        title: '¿Estas seguro de cancelar esta reserva?',
        text: "Otra persona puede reservar esta habitacion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008F39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancelar de todos modos',
        cancelButtonText: 'No Cancelar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Reserva Cancelada Correctamente',
            icon: 'success',
            showConfirmButton: false
          })
          $.ajax({
                url:`http://158.101.30.210:8081/api/reservation/delete/${ReservaID}`,
                type:"DELETE",
                contentType:"application/JSON",
                success:function () {
                    console.log("Borrado");
                    setTimeout(() => {
                        document.location.reload();
                    }, 1800);
                },
                error:function(xhr, status){
                    console.log(status);
                }
            });
        }
    })
}

