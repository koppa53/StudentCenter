
//Retreive necessary id and tokens for API Requests
const student_id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const get_profile_url = 'https://softeng.jbtabz.com/student/'+student_id;
const get_guardian_url = 'https://softeng.jbtabz.com/guardian/'+student_id; 
const update_profile_url = 'https://softeng.jbtabz.com/student';
const update_guardian_profile_url = 'https://softeng.jbtabz.com/guardian';
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');
let success = document.querySelector('#show-success');
let element = document.getElementById("t1");
let box1 = document.querySelector('#box1');
let box2 = document.querySelector('#box2');
let box3 = document.querySelector('#box3');

window.onload = function() {
    fillplaceholder();
    box1.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
    box2.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
    box3.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
};

async function fillplaceholder() {
    const res = await fetch (get_guardian_url,{
        headers: {
            "X-Session-Token": token,
        }
    });
    const d = await res.json(); 
    const response = await fetch (get_profile_url,{
        headers:{
            "X-Session-Token": token,
        }
    });
    const data = await response.json();
    if(data.phone_number==null) data.phone_number="" 
    document.getElementById("newmobilenum").placeholder = data.phone_number
    if(data.email_address==null) data.email_address=""
    document.getElementById("newemail").placeholder = data.email_address
    if(data.a_street=="N/A" || data.a_street==null) data.a_street =""
    if(data.a_barangay=="N/A" || data.a_barangay==null) data.a_barangay =""
    if(data.a_city=="N/A" || data.a_city==null) data.a_city =""
    if(data.a_province=="N/A" || data.a_province==null) data.a_province =""
    if(data.a_zip_code=="N/A" || data.a_zip_code==null) data.a_zip_code =""
    document.getElementById("newstreet").placeholder = data.a_street
    document.getElementById("newbarangay").placeholder = data.a_barangay
    document.getElementById("newcity").placeholder = data.a_city
    document.getElementById("newprovince").placeholder = data.a_province
    document.getElementById("newzipcode").placeholder = data.a_zip_code
    //avoid null from being displayed in webpage
    if(d.first_name==null) d.first_name=""
    if(d.middle_name==null) d.middle_name=""
    if(d.last_name==null) d.last_name=""
    if(d.phone_number==null) d.phone_number=""
    if(d.address==null) d.address=""
    if(d.first_name_2==null) d.first_name_2=""
    if(d.middle_name_2==null) d.middle_name_2=""
    if(d.last_name_2==null) d.last_name_2=""
    if(d.phone_number_2==null) d.phone_number_2=""
    if(d.address_2==null) d.address_2=""
    document.getElementById("guardian_firstname").placeholder = d.first_name
    document.getElementById("guardian_middlename").placeholder = d.middle_name
    document.getElementById("guardian_lastname").placeholder = d.last_name
    document.getElementById("new_guardian_mobilenum").placeholder = d.phone_number
    document.getElementById("new_guardian_address").placeholder = d.address
    document.getElementById("guardian_firstname2").placeholder = d.first_name_2
    document.getElementById("guardian_middlename2").placeholder = d.middle_name_2
    document.getElementById("guardian_lastname2").placeholder = d.last_name_2
    document.getElementById("new_guardian_mobilenum2").placeholder = d.phone_number_2
    document.getElementById("new_guardian_address2").placeholder = d.address_2

}

function confirm_reset() {
    //Confirm reset all fields
    var result = confirm("Are you sure you want to reset all text?");
    document.getElementById("t1").scrollIntoView({behavior:'smooth',block:'start'})
    
    if(result == true){
        //Disable submit button if user has confirmed to reset the all fields
        document.getElementById('sbmt').disabled = true; 
    }else{
        //Enable or Disable submit button if the page has not detected any input in fields
        if(document.getElementById("newmobilenum").value===""&&document.getElementById("newemail").value===""&&
        document.getElementById("newstreet").value===""&&document.getElementById("guardian_firstname").value===""&&
        document.getElementById("newbarangay").value===""&&document.getElementById("newcity").value===""&&
        document.getElementById("newprovince").value===""&& document.getElementById("newzipcode").value===""&&
        document.getElementById("guardian_middlename").value===""&&document.getElementById("guardian_lastname").value===""&& 
        document.getElementById("new_guardian_mobilenum").value===""&&document.getElementById("new_guardian_address").value===""&&
        document.getElementById("guardian_firstname2").value===""&&document.getElementById("guardian_middlename2").value===""&&
        document.getElementById("guardian_lastname2").value===""&& document.getElementById("new_guardian_mobilenum2").value===""&&
        document.getElementById("new_guardian_address2").value===""){
            document.getElementById('sbmt').disabled = true; 
        }else{
            document.getElementById('sbmt').disabled = false;
        }
    }
    return result;
}

function stoppedTyping(id){
    //Enable or Disable submit button if the page has not detected any input in fields
    let inpt = document.getElementById(id).value
    if(inpt.value===""|| inpt.replace(/^\s+|\s+$/g, '').length == 0){ 
        if(document.getElementById("newmobilenum").value===""&&document.getElementById("newemail").value===""&&
        document.getElementById("newstreet").value===""&&document.getElementById("guardian_firstname").value===""&&
        document.getElementById("newbarangay").value===""&&document.getElementById("newcity").value===""&&
        document.getElementById("newprovince").value===""&& document.getElementById("newzipcode").value===""&&
        document.getElementById("guardian_middlename").value===""&&document.getElementById("guardian_lastname").value===""&& 
        document.getElementById("new_guardian_mobilenum").value===""&&document.getElementById("new_guardian_address").value===""&&
        document.getElementById("guardian_firstname2").value===""&&document.getElementById("guardian_middlename2").value===""&&
        document.getElementById("guardian_lastname2").value===""&& document.getElementById("new_guardian_mobilenum2").value===""&&
        document.getElementById("new_guardian_address2").value===""){
                document.getElementById('sbmt').disabled = true; 
            }
        } 
    else { 
        document.getElementById('sbmt').disabled = false;
    }       
}


async function editProfile(update){
    
    try{
        notice.style.display='block';
        al.style.display = 'none';
        //GUARDIAN PROFILE UPDATE
        const res = await fetch (get_guardian_url,{
            headers: {
                "X-Session-Token": token,
            }
        });
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
                "X-Session-Token": token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(d)
        });
        const stat = await update_guardian_info.json();
        //STUDENT PROFILE UPDATE
        const response = await fetch (get_profile_url,{
            headers:{
                "X-Session-Token": token,
            }
        });
        const data = await response.json(); 
        delete data.is_hidden
        delete data.address
        delete data.is_currently_enrolled
        delete data.created_at
        delete data.updated_at
        if(update.phone_number!=""){
            data.phone_number = update.phone_number
        }
        if(update.email_address!=""){
            data.email_address =update.email_address
        }
        if(update.a_street!=""){
            data.a_street =update.a_street
        }   
        if(update.a_barangay!=""){
            data.a_barangay =update.a_barangay
        }
        if(update.a_city!=""){
            data.a_city =update.a_city
        }
        if(update.a_zip_code!=""){
            data.a_zip_code =update.a_zip_code
        }
        if(update.a_province!=""){
            data.a_province =update.a_province
        }
        const update_info = await fetch(update_profile_url,{
            method: 'PUT',
            headers: {
                "X-Session-Token": token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const status = await update_info.json();
        //RETURN user to profile page once system has successfully updated the profile
        if (status.code == 200 && stat.code == 200 ){
            notice.style.display='none';
            success.style.display='block';
            setTimeout(function(){ window.location.href="aboutprofile.html";}, 3000);
        }else{
            if(status.code != 200)al.innerHTML = "ERROR: "+ status.message;
            else{
                al.innerHTML = "ERROR: "+ stat.message;
            }
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
        document.querySelector("#header").scrollIntoView({behavior:'smooth'});
        var data={};
        //GUARDIAN PROFILE 
        data["guardian_firstname"] = document.getElementById("guardian_firstname").value
        data["guardian_middlename"] = document.getElementById("guardian_middlename").value
        data["guardian_lastname"] = document.getElementById("guardian_lastname").value
        data["guardian_firstname2"] = document.getElementById("guardian_firstname2").value
        data["guardian_middlename2"] = document.getElementById("guardian_middlename2").value
        data["guardian_lastname2"] = document.getElementById("guardian_lastname2").value
        data["guardian_phone_number"] = document.getElementById("new_guardian_mobilenum").value
        data["guardian_phone_number2"] = document.getElementById("new_guardian_mobilenum2").value  
        data["guardian_address"] = document.getElementById("new_guardian_address").value
        data["guardian_address2"] = document.getElementById("new_guardian_address2").value
        //STUDENT PROFILE
        data["phone_number"] = document.getElementById("newmobilenum").value
        data["email_address"] = document.getElementById("newemail").value
        data["a_street"] = document.getElementById("newstreet").value
        data["a_barangay"] = document.getElementById("newbarangay").value
        data["a_city"] = document.getElementById("newcity").value
        data["a_province"] = document.getElementById("newprovince").value
        data["a_zip_code"] = document.getElementById("newzipcode").value
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(data["email_address"]!==""){
            if(data["email_address"].match(mailformat)){
                editProfile(data);
            }else{
                document.getElementById("newemail").focus();
                data["email_address"] =""
            }
        }
        editProfile(data);
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
        notice.style.display = 'none';
    }   
}
