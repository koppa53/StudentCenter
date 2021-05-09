
const student_id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const change_password_url = 'https://softeng.jbtabz.com/auth/update';
const logout_url = "https://softeng.jbtabz.com/auth/logout";
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');
let success = document.querySelector('#show-success');
let pass_al = document.querySelector('#show-passError');
let element = document.getElementById("t1");

function stoppedTyping(id){
    let inpt = document.getElementById(id).value
    if(inpt.value===""|| inpt.replace(/^\s+|\s+$/g, '').length == 0){ 
        if(document.getElementById("oldpass").value===""||
            document.getElementById("newpass").value===""){
                document.getElementById('sbmt').disabled = true; 
        }
    } else { 
        if(document.getElementById("oldpass").value!==""&&
            document.getElementById("newpass").value!==""){
                document.getElementById('sbmt').disabled = false; 
        }
    }       
}


async function editProfile(update){
    
    try{
        notice.style.display='block';
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
        if (sts.code == 200){
            notice.style.display='none';
            const out = await fetch(logout_url,{
                headers: {
                    "X-Session-Token": token
                }
            });
            const status = await out.json();
            if(status.code==200){
                sessionStorage.removeItem('token')
	            sessionStorage.removeItem('id')
                success.style.display='block';
                setInterval(function(){ window.location.href="index.html";}, 3000);
            }else{
                al.style.display = 'block';
            }
        }else{
            al.style.display = 'block';
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
        var data={};
        //STUDENT PROFILE
        data["oldpass"] = document.getElementById("oldpass").value
        data["newpass"] = document.getElementById("newpass").value
        editProfile(data);
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
        notice.style.display = 'none';
    }   
}

