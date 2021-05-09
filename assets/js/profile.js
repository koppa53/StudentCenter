
const student_id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const get_profile_url = 'https://softeng.jbtabz.com/student/'+ student_id;
const get_guardian_url = 'https://softeng.jbtabz.com/guardian/'+ student_id; 
const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/"+ student_id;
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

window.onload = function() {
    fetchUserProfile();
};

async function fetchUserProfile(){
    try{
        const [response,res,prog] = await Promise.all([fetch(get_profile_url,{
            headers: {
                "X-Session-Token": token
            }}
            ),fetch(get_guardian_url,{
                headers: {
                    "X-Session-Token": token
            }}),fetch(enrollmentID_url,{
                headers: {
                    "X-Session-Token": token
            }}
            )]);
        const data = await response.json(); 
        const d = await res.json();
        const p = await prog.json(); 
        if(data != undefined && d!=undefined && p!=undefined){
            bt.style.display = '';
            tb.style.display = '';
            gtb.style.display = '';
            notice.style.display = 'none';
        }
        document.getElementById("Name").innerHTML = data.first_name + " "+ data.middle_name + " "+data.last_name;
        document.getElementById("ID").innerHTML = data.school_id;
        document.getElementById("program").innerHTML = p[p.length-1].course_name;
        document.getElementById("add").innerHTML = data.address;
        document.getElementById("mno").innerHTML = data.phone_number;
        document.getElementById("gend").innerHTML = data.sex;
        document.getElementById("bday").innerHTML = data.birth_date;
        document.getElementById("email").innerHTML = data.email_address;
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

