
    //Disable Right Click
    document.addEventListener('contextmenu', event => event.preventDefault());

    //Set Current School Year
    var year = new Date();
    var startyear = year.getFullYear();
    var endyear = startyear+1
    var schoolyear = startyear + " - " + endyear
    document.getElementById("sy").innerHTML = "<i><br>Bicol University Student Center Login<br>S.Y "+schoolyear+"</i>"

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
        //Check User Credentials
        (async () => {
            status = await verifyID_Password();
            if (status > 0){
                showValidate(input[0]);
                showValidate(input[1]);
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
    try{
    document.getElementById("login-button").innerHTML = "Logging in...";
    const login_endpoint = "https://softeng.jbtabz.com/auth/login";
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
    const status = await verify_login.json();
    //Direct user to Homepage if the server responds code "200"
    if (verify_login["status"] == 200){
        sessionStorage.setItem('token', status["session-token"])
        sessionStorage.setItem('id', status["id"])
        window.location.href="home.html";
    }else{  //Prompt Incorrect Credentials to the webpage
        document.getElementById("login-button").innerHTML = "Log in";
        document.getElementById("user_pass").value ="";
        return 1;
    }
    }catch(e){
        if(e=='TypeError: Failed to fetch') document.querySelector('#show-err').style.display = "block"
        document.getElementById("login-button").innerHTML = "Log in";
    }
}
