const get_profile_url = 'https://softeng.jbtabz.com/search/students/Nolla';
const update_profile_url = 'https://softeng.jbtabz.com/student';
const update_guardian_profile_url = 'https://softeng.jbtabz.com/guardian';
const get_guardian_url = 'https://softeng.jbtabz.com/guardian/50782d26-4b44-4486-9a85-961ee20574ee'; 
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');
let success = document.querySelector('#show-success');
notice.style.display='none';
async function editProfile(update){
    //GUARDIAN PROFILE UPDATE
    try{
        notice.style.display='block';
        const res = await fetch (get_guardian_url);
        const d = await res.json(); 
        delete d.updated_at
        delete d.created_at
        if(update.guardian_firstname!=""){
            d.first_name = update.guardian_firstname
        }
        if(update.guardian_middlename!=""){
            d.middle_name = update.guardian_middlename
        }
        if(update.guardian_lastname!=""){
            d.last_name = update.guardian_lastname
        }
        if(update.guardian_firstname2!=""){
            d.first_name_2 = update.guardian_firstname2
        }
        if(update.guardian_middlename2!=""){
            d.middle_name_2 = update.guardian_middlename2
        }
        if(update.guardian_lastname2!=""){
            d.last_name_2 = update.guardian_lastname2
        }
        if(update.guardian_phone_number!=""){
            d.phone_number = update.guardian_phone_number
        }
        if(update.guardian_phone_number2!=""){
            d.phone_number_2 = update.guardian_phone_number2
        }
        if(update.guardian_address!=""){
            d.address = update.guardian_address
        }
        if(update.guardian_address2!=""){
            d.address_2 = update.guardian_address2
        }
        const update_guardian_info = await fetch(update_guardian_profile_url,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(d)
        });
        const stat = await update_guardian_info.json();
        console.log(stat)
        //STUDENT PROFILE UPDATE
        const response = await fetch (get_profile_url);
        const data = await response.json(); 
        delete data[0].is_currently_enrolled
        delete data[0].created_at
        delete data[0].updated_at
        if(update.phone_number!=""){
            data[0].phone_number = update.phone_number
        }
        if(update.email_address!=""){
            data[0].email_address =update.email_address
        }
        if(update.address!=""){
            data[0].address =update.address
        }
        const update_info = await fetch(update_profile_url,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data[0])
        });
        const status = await update_info.json();
        if (status.code == 200 && stat.code == 200){
            notice.style.display='none';
            success.style.display='block';
            setInterval(function(){ window.location.href="aboutprofile.html";}, 3000);
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
        notice.style.display = 'none';
        var data={};
        var result = true;
        //GUARDIAN PROFILE 
        data["guardian_firstname"] = document.getElementById("guardian_firstname").value
        data["guardian_middlename"] = document.getElementById("guardian_middlename").value
        data["guardian_lastname"] = document.getElementById("guardian_lastname").value
        data["guardian_firstname2"] = document.getElementById("guardian_firstname2").value
        data["guardian_middlename2"] = document.getElementById("guardian_middlename2").value
        data["guardian_lastname2"] = document.getElementById("guardian_lastname2").value
        data["guardian_phone_number"] = document.getElementById("new_guardian_mobilenum").value
        result = checkMobileNumber(data["guardian_phone_number"])
        if(result==false){
            data["guardian_phone_number"]=""
        }
        data["guardian_phone_number2"] = document.getElementById("new_guardian_mobilenum2").value
        result = checkMobileNumber(data["guardian_phone_number2"])
        if(result==false){
            data["guardian_phone_number2"]=""
        }
        data["guardian_address"] = document.getElementById("new_guardian_address").value
        data["guardian_address2"] = document.getElementById("new_guardian_address2").value

        //STUDENT PROFILE
        //var oldpass = document.getElementById("oldpass").value
        /*data["newpass"] = document.getElementById("newpass").value
        if(oldpass.length !=0 && data["newpass"].length == 0){
            alert("Enter new password!");
            return false;
        }
        if(oldpass.length ==0 && data["newpass"].length !=0 ){
            alert("Enter old password!");
            return false;
        }*/
        data["phone_number"] = document.getElementById("newmobilenum").value
        result = checkMobileNumber(data["phone_number"])
        if(result==false){
            data["phone_number"]=""
        }
        data["email_address"] = document.getElementById("newemail").value
        data["address"] = document.getElementById("newaddress").value
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(data["phone_number"]=="" && data["email_address"]=="" && data["address"]=="" && 
            data["guardian_firstname"] == "" && data["guardian_middlename"] == "" && data["guardian_lastname"] == "" && 
            data["guardian_firstname2"] == "" && data["guardian_middlename2"] == "" && data["guardian_lastname2"] == "" &&
            data["guardian_phone_number"] == "" && data["guardian_phone_number2"] == "" && data["guardian_address"] == "" && 
            data["guardian_address2"] == ""){
            alert("Field is Empty!")
        }else{
            if(data["email_address"]!=""){
                if(data["email_address"].match(mailformat)){
                    editProfile(data);
                }else{
                    alert("You have entered an invalid email address!");
                    data["address"] =""
                }
            }
            editProfile(data);
        }
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
        notice.style.display = 'none';
    }
        
}

function checkMobileNumber(data){
    if(data.length!=0 ){
        if(data.length > 10){
            let isnum = /^\d+$/.test(data);
            if(isnum==false){
                alert("Invalid mobile phone number!")
                return false;
            }else{
                return true;
            }
        }else{
            alert("Invalid mobile phone number!")
            return false
        }
    }
}
