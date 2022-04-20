function username() {
    $.ajax({
        url:`http://localhost:8080/api/user/username`,
        Type:'GET',
        dataType:'JSON',
        success:function(request) {
            console.log(request)
            var name = request.name
            $("#name").html(name)
        },
        error:function(xhr, status) {
            console.log(status)
        }
    }) 
}

// function onloadUsername(request) {
//     var name = request.name
//     $("#name").html(name)
// }

// $(document).ready(function(){
//     username();
// })

function validateLogin() {
    var username = $('#user_email').val()
    var password = $('#user_password').val()
    if (username.length == 0 || password.length == 0) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Todos los campos son necesarios!',
            showConfirmButton: false,
            timer: 1900
        })
    } else {
        document.formLogin.submit();
    }
}

function validateRegister() {
    var username = $('#user_name_register').val()
    var userLastname = $('#user_lastName_register').val()
    var userTel = $('#user_tel_register').val()
    var userAge = $('#user_age_register').val()
    var userEmail = $('#user_email_register').val()
    var userPassword = $('#user_password_register').val()
    var userConfirmPassword = $('#user_confirmPassword_register').val()
    if (username.length==0 || userLastname.length==0 || 
        userEmail.length==0 || userPassword.length==0 || userConfirmPassword==0 ||
        userTel.length==0 || userAge.length==0) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Todos los campos son necesarios!',
                showConfirmButton: false,
                timer: 1900
            })
    } else {
        if(userPassword === userConfirmPassword) {
            document.formRegister.submit();
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Tu contraseña no coincide!',
                showConfirmButton: false,
                timer: 1900
            })
            $("#user_confirmPassword_register").val("").focus()
        }
    }
}