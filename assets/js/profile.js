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
        var address="" 
        if(data.a_street!="N/A") address = address + data.a_street 
        if(data.a_barangay!="N/A") address = address +", "+data.a_barangay 
        if(data.a_city!="N/A") address = address +", "+data.a_city
        if(data.a_zip_code!="N/A") address = address +" "+data.a_zip_code
        if(data.a_province!="N/A") address = address +" "+data.a_province 
        var name =""
        if(data.first_name!="N/A") name = name + data.first_name +" "
        if(data.middle_name!="N/A") name = name + data.middle_name + " "
        if(data.last_name!="N/A") name = name + data.last_name
        document.getElementById("Name").innerHTML = name;
        document.getElementById("ID").innerHTML = data.school_id;
        document.getElementById("program").innerHTML = p[p.length-1].course_name;
        document.getElementById("add").innerHTML = address
        document.getElementById("mno").innerHTML = data.phone_number;
        document.getElementById("gend").innerHTML = data.sex;
        document.getElementById("bday").innerHTML = data.birth_date;
        document.getElementById("email").innerHTML = data.email_address;
        //avoid null from being displayed in webpage
        var guardname=""
        var guardname2=""
        if(d.first_name!=null) guardname = guardname + d.first_name
        if(d.middle_name!=null && d.middle_name!="N/A") guardname = guardname +" "+d.middle_name
        if(d.last_name!=null) guardname = guardname +" "+d.last_name
        if(d.phone_number==null) d.phone_number=""
        if(d.address==null) d.address=""
        if(d.first_name_2!=null) guardname2 = guardname2 + d.first_name_2
        if(d.middle_name_2!=null && d.middle_name_2!="N/A") guardname2 = guardname2 +" "+d.middle_name_2
        if(d.last_name_2!=null) guardname2 = guardname2 +" "+d.last_name_2
        if(d.phone_number_2==null) d.phone_number_2=""
        if(d.address_2==null) d.address_2=""
        document.getElementById("guardian_name").innerHTML = guardname
        document.getElementById("guardian_mobile_number").innerHTML = d.phone_number;
        document.getElementById("guardian_address").innerHTML = d.address;
        document.getElementById("guardian_name2").innerHTML = guardname2
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

