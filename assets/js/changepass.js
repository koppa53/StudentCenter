
//Retreive necessary id and tokens for API Requests
const token = sessionStorage.getItem('token');
const change_password_url = 'https://softeng.jbtabz.com/auth/update';
const logout_url = "https://softeng.jbtabz.com/auth/logout";
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');
let success = document.querySelector('#show-success');
let pass_al = document.querySelector('#show-passError');
let pass_al2 = document.querySelector('#show-passError2');
let cpass = document.querySelector('#cpass');
cpass.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"

//Enable or Disable submit button if the page has not detected any input in fields
function stoppedTyping(id){
    let inpt = document.getElementById(id).value
    if(inpt.value===""|| inpt.replace(/^\s+|\s+$/g, '').length == 0){ 
        if(document.getElementById("oldpass").value==""||
            document.getElementById("newpass").value==""||
            document.getElementById("cnewpass").value==""){
                document.getElementById('sbmt').disabled = true; 
        }
    } else { 
        if(document.getElementById("oldpass").value!=""&&
            document.getElementById("newpass").value!=""&&
            document.getElementById("cnewpass").value!=""){
                document.getElementById('sbmt').disabled = false; 
        }
    }       
}

async function updatePassword(update){
    try{
        notice.style.display='block';
        pass_al.style.display = 'none';
        al.style.display = 'none';
        //PASSWORD UPDATE
        var passwordCredentials = { 'currentPassword': "" , 'newPassword': "" }
        if(update.oldpass!=""){
            passwordCredentials.currentPassword = update.oldpass
        }
        if(update.newpass!=""){
            passwordCredentials.newPassword = update.newpass
        }
        const connect = await fetch(change_password_url ,{
            method: 'PUT',
            headers: {
                "X-Session-Token": token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(passwordCredentials)
        });
        const sts = await connect.json()
        //Logout the user if password sucessfully changed
        if (sts.code == 200){
            notice.style.display='none';
            const out = await fetch(logout_url,{
                headers: {
                    "X-Session-Token": token
                }
            });
            const status = await out.json();
            //Redirect user back to login page
            if(status.code==200){
                sessionStorage.removeItem('token')
	            sessionStorage.removeItem('id')
                success.style.display='block';
                setTimeout(function(){ window.location.href="index.html";}, 3000);
            }else{
                al.style.display = 'block';
            }
        }else{
            pass_al.style.display = 'block';
            notice.style.display = 'none';
        }
    }catch(e){
        console.log(e)
        al.style.display = 'block';
        notice.style.display = 'none';
    }
    
}

function readFields(){
    try{
        //Get data from the fields
        al.style.display = 'none';
        pass_al2.style.display = 'none'
        var data={};
        var cpass=""
        data["oldpass"] = document.getElementById("oldpass").value
        data["newpass"] = document.getElementById("newpass").value
        cpass= document.getElementById("cnewpass").value
        if(data["newpass"]==cpass) updatePassword(data);
        else{
            document.getElementById("newpass").value = ""
            document.getElementById("cnewpass").value = ""
            pass_al2.style.display = 'block'
        }
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
        notice.style.display = 'none';
    }   
}

