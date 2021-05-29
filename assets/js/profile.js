//Retreive necessary id and tokens for API Requests
const student_id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const get_profile_url = 'https://softeng.jbtabz.com/student/'+ student_id;
const get_guardian_url = 'https://softeng.jbtabz.com/guardian/'+ student_id; 
const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/"+ student_id;
const whoamI = "https://softeng.jbtabz.com/auth/whoami";
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');
/*HIDE CONTENT*/
    const bt = document.querySelector('#bt');
    const tb = document.querySelector('#tbl');
    const gtb = document.querySelector('#gtbl');
    const atb = document.querySelector('#atbl');
/*END OF HIDE CONTENT*/

//Fetch profiles once page has loaded
window.onload = function() {
    fetchUserProfile();
};

async function fetchUserProfile(){
    try{
        al.style.display = 'none';
        const [response,res,prog,acc] = await Promise.all([fetch(get_profile_url,{
            headers: {
                "X-Session-Token": token
            }}
            ),fetch(get_guardian_url,{
                headers: {
                    "X-Session-Token": token
            }}),fetch(enrollmentID_url,{
                headers: {
                    "X-Session-Token": token
            }}),fetch(whoamI,{
                headers: {
                    "X-Session-Token": token
            }})
            ]);
        const data = await response.json(); 
        const d = await res.json();
        const p = await prog.json(); 
        const a = await acc.json();
        var update = a.updated_at.split('T');
        //hide status message from the page
        if(data != undefined && d!=undefined && p!=undefined){
            bt.style.display = '';
            tb.style.display = '';
            tb.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
            gtb.style.display = '';
            gtb.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
            atb.style.display = '';
            atb.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
            notice.style.display = 'none';
        }
        //Append Fetched data from server to profile fields in the page 
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
        document.getElementById("username").innerHTML = a.username;
        document.getElementById("accupdate").innerHTML = update[0] ;
        
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
        notice.style.display = 'none';
    }
}

