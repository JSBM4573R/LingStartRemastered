function agregarClient() {
    var datos={
        id:$("#ClientID").val(),
        name:$("#Clientname").val(),
        lastname:$("#lastname").val(),
        tel:$("#tel").val(),
        age:$("#age").val(),
        email:$("#email").val(),
        password:$("#password").val(),
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cliente/cliente",
        data:datosPeticion,
        type:"POST",
        contentType:"application/JSON",
        success:function (respuesta){
            console.log("insertado exitosamente")
        },
        error:function(xhr, status){
            console.log(status);
        }
    });
}

function listarClient() {
    $("#btn-agregarClient").hide();
    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cliente/cliente",
        Type:"GET",
        dataType:"json",
        success:function (respuesta) {
            console.log(respuesta);
            listarRespuestaClient(respuesta.items);
        },
        error:function (xhr, status) {
            console.log(status);
        }
    });
}

function listarRespuestaClient(items) {
    var tabla=`<table border="2">
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>TELEFONO</th>
                    <th>EDAD</th>
                    <th>CORREO</th>
                    <th>CONTRASEÑA</th>
                    <th colspan="2">ACCIONES</th>
                </tr>`;
    for (let i = 0; i < items.length; i++) {
        tabla+=`<tr>
                    <td>${items[i].id} </td>
                    <td>${items[i].name} </td>
                    <td>${items[i].lastname} </td>
                    <td>${items[i].tel} </td>
                    <td>${items[i].age} </td>
                    <td>${items[i].email} </td>
                    <td>${items[i].password} </td>
                    <td><button onclick="editarRegistroClient(${items[i].id})">Editar</button></td>
                    <td><button onclick="borrarRegistroClient(${items[i].id})">Borrar</button></td>
                </tr>`;
    }
    tabla+=`</table>`
    console.log(tabla);
    $("#listadoClient").html(tabla)
}

function editarRegistroClient() {
    $("#btn-guardarEdicionClient").show();
    $("#btn-agregarClient").hide();
    $("#btn-listarClient").hide();
    $("#ClientID").prop('disabled', true);
    var datos={
        id:ClientID
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cliente/cliente/"+ClientID,
        data:datosPeticion,
        type:'GET',
        dataType:'json',
        success:function (respuesta) {
            var items=respuesta.items;
            $('#ClientID').val(items[0].id),
            $('#Clientname').val(items[0].name),
            $('#lastname').val(items[0].lastname),
            $('#tel').val(items[0].tel),
            $('#age').val(items[0].age);
            $('#email').val(items[0].email);
            $('#password').val(items[0].password);
            console.log(items);
        },
        error:function(xhr, status){
            console.log(status);
        }
    });
}

function actualizarRegistroClient() {
    var password = $("#password").val()
    var passwordConfirm = $("#passwordConfirm").val()
    if(password.length == 0 || passwordConfirm == 0) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Todos los campos son necesarios',
            showConfirmButton: false,
            timer: 1900
        })
    } else {
        if (password === passwordConfirm) {
            var datos={
                id:$("#ClientID").val(),
                name:$("#Clientname").val(),
                lastName:$("#lastname").val(),
                tel:$("#tel").val(),
                age:$("#age").val(),
                email:$("#email").val(),
                password:$("#password").val()
            }
            let datosPeticion=JSON.stringify(datos);
            $.ajax({
                url:`http://localhost:8081/api/user/update`,
                data:datosPeticion,
                type:'PUT',
                contentType:'application/JSON',
                success:function (respuesta) {
                    console.log("actualizado!");
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Actualizado correctamente',
                        showConfirmButton: false,
                        timer: 1800
                    });
                },
                error:function(xhr, status){
                    console.log(status);
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Tu contraseña no coincide!',
                showConfirmButton: false,
                timer: 1900
            })
            $("#passwordConfirm").val("").focus()
        }
    } 
}

function borrarRegistroClient(ClientID) {
    var datos={
        id:ClientID
    }
    let datosPeticion=JSON.stringify(datos);
    $.ajax({
        url:"https://g7f0671950df122-jsbm.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cliente/cliente",
        data:datosPeticion,
        type:"DELETE",
        contentType:"application/JSON",
        success:function (respuesta) {
            console.log("Borrado");
            listarClient();
        },
        error:function(xhr, status){
            console.log(status);
        }
    });
}

function autoInicioUser() {
    console.log("Se esta ejecutando user...")
    $.ajax({
        url:"http://localhost:8081/api/user/username",
        datatype:"JSON",
        Type:"GET",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-user");
            $select.append('<option value='+respuesta.id+'>'+respuesta.name+'</option>');
        },
        error:function(xhr, status){
            console.log(status);
            Swal.fire({
                icon: 'error',
                title: 'Error',
            });
        }
    });
}

