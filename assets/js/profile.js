const get_profile_url = 'https://softeng.jbtabz.com/search/students/Nolla';
const get_guardian_url = 'https://softeng.jbtabz.com/guardian/50782d26-4b44-4486-9a85-961ee20574ee'; 
const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/50782d26-4b44-4486-9a85-961ee20574ee"
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');
/*HIDE CONTENT*/
    const bt = document.querySelector('#bt');
    const tb = document.querySelector('#tbl');
    const gtb = document.querySelector('#gtbl');
    bt.style.display = 'none';
    tb.style.display = 'none';
    gtb.style.display = 'none';
/*END OF HIDE CONTENT*/
async function fetchUserProfile(){
    try{
        //let success = document.querySelector('#show-success');
        //success.style.display = 'block';
        const [response,res,prog] = await Promise.all([fetch(get_profile_url),fetch(get_guardian_url),fetch(enrollmentID_url)]);
        const data = await response.json(); 
        const d = await res.json();
        const p = await prog.json(); 
        if(data != undefined && d!=undefined && p!=undefined){
            bt.style.display = '';
            tb.style.display = '';
            gtb.style.display = '';
            notice.style.display = 'none';
        }
        document.getElementById("Name").innerHTML = data[0].first_name + " "+ data[0].middle_name + " "+data[0].last_name;
        document.getElementById("ID").innerHTML = data[0].school_id;
        document.getElementById("program").innerHTML = p[0].course_name;
        document.getElementById("add").innerHTML = data[0].address;
        document.getElementById("mno").innerHTML = data[0].phone_number;
        document.getElementById("gend").innerHTML = data[0].sex;
        document.getElementById("bday").innerHTML = data[0].birth_date;
        document.getElementById("email").innerHTML = data[0].email_address;
        document.getElementById("guardian_name").innerHTML = d.first_name + " "+ d.middle_name + " "+d.last_name;
        document.getElementById("guardian_mobile_number").innerHTML = d.phone_number;
        document.getElementById("guardian_address").innerHTML = d.address;
        document.getElementById("guardian_name2").innerHTML = d.first_name_2 + " "+ d.middle_name_2 + " "+d.last_name_2;
        document.getElementById("guardian_mobile_number2").innerHTML = d.phone_number_2;
        document.getElementById("guardian_address2").innerHTML = d.address_2;
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
        notice.style.display = 'none';
    }
}

