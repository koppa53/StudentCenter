
    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    $('.validate-form').on('submit',function(){
        (async () => {
            status = await verifyID_Password();
            if (status > 0){
                showValidate(input[0]);
                showValidate(input[1]);
                check = false;
            }
        })()  
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


async function verifyID_Password(){
    const login_endpoint = "https://softeng.jbtabz.com/login/s";
    var data={};
    data["username"] = document.getElementById("user_ID").value;
    data["password"] = document.getElementById("user_pass").value;
    const verify_login = await fetch(login_endpoint, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const token = '12312312312313131313';
    localStorage.setItem('token', token)
    const status = await verify_login.json();
    if (1){
        console.log(1)
        window.location.href="index.html";
    }else{
        return status.code;
    }
}