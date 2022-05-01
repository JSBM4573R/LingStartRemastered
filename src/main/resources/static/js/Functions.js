$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 0){
            $('#header').addClass('#header2');
        }else{
            $('#header').removeClass('#header2')
        }
    });
});

function openSidebar() {
    document.getElementById("sidebar").style.width="300px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width="0";
}

function username() {
    $.ajax({
        url:`http://158.101.30.210:8081/api/user/username`,
        Type:'GET',
        dataType:'JSON',
        success:function(request) {
            console.log(request)
            var name = request.name
            var lastName = request.lastName
            $("#name").html(name + " " + lastName)
        },
        error:function(xhr, status) {
            console.log(status)
        }
    }) 
}

function myAccount() {
    $.ajax({
        url:`http://158.101.30.210:8081/api/user/username`,
        Type:'GET',
        dataType:'JSON',
        success:function(request) {
            console.log(request)
            $('#ClientID').val(request.id),
            $('#Clientname').val(request.name),
            $('#lastname').val(request.lastName),
            $('#tel').val(request.tel),
            $('#age').val(request.age),
            $('#email').val(request.email);
        },
        error:function(xhr, status) {
            console.log(status)
        }
    }) 
}

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
            Swal.fire({
                title: 'Registrado Correctamente',
                icon: 'success',
            })
            setTimeout(() => {
                document.formRegister.submit();
            }, 1900);
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