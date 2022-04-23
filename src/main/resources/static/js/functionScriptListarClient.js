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
                    <td><button onclick="borrarRegistroClient(${items[i].id})">Borrar</button></td>
                </tr>`;
    }
    tabla+=`</table>`

    console.log(tabla);

    $("#listadoClient").html(tabla)
}