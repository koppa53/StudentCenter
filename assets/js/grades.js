//Retreive necessary id and tokens for API Requests
const student_id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/"+student_id;
const get_profile_url = 'https://softeng.jbtabz.com/student/'+ student_id;
var i = 0;
let table = document.querySelector("table");
let gradesTable = document.querySelector("#grades");
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');

//Fetch grades once page has loaded
window.onload = function() {
    fetchUserGrades();
};

async function fetchUserGrades(){
    try{
        const response = await fetch (enrollmentID_url,{
            headers:{
                "X-Session-Token": token
            }
        })
        const res = await fetch(get_profile_url,{
            headers:{
                "X-Session-Token": token
            }
        })
        const d = await res.json() 
        const data = await response.json() 
        if(data!=undefined){
            notice.style.display = 'none';
        }
        const student_name = d.school_id + " : "+ data[0].student_first_name+" "+data[0].student_middle_name+" " +data[0].student_last_name
        data.forEach(function(v){
            Object.assign(v, {button: ""});
            v.academic_term_name += " "+ "("+ v.course_schedule_name + ")"
            delete v.course_schedule_name
            delete v.status
            delete v.student_first_name
            delete v.student_middle_name
            delete v.student_last_name
            delete v.created_at
            delete v.student_id
            delete v.academic_term_id
            delete v.is_revoked
            delete v.subject_code;
            delete  v.subject_name; 
            delete v.updated_at});
        const head = { 'Academic Term' : '','Program' : '', 'View' : '' };
        let k = Object.keys(head);
        //Build table for academic term list
        generateTableHead(table,k,i,student_name);
        generateTable(table, data);
        table.style.boxShadow = "0 2px 12px 12px rgba(0,0,0,.1)"
        }catch(e){
            console.log(e.message)
            al.style.display = 'block';
            notice.style.display = 'none';
        }   
}

function generateTableHead(table, data,i,academic_term) {
    let thead1 = table.createTHead();
    let row1 = thead1.insertRow();
    let th1 = document.createElement("th");
    let text1 = document.createTextNode(academic_term);
    th1.appendChild(text1);
    th1.colSpan= 3;
    row1.appendChild(th1);
    //generate headers once
    if(i<1){
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }   
}

function generateTable(table, data) {
    for (let element of data) {
        button = document.createElement("button");
        button.className ="button primary icon solid fa-search";
        //reset timetable for new schedules
        button.onclick = function() {
            if(document.getElementById("grades") != null)
                document.getElementById("grades").innerHTML = "";
            fetchGrades(element["id"],element["academic_term_name"]);
            gradesTable.style.boxShadow = "0 0px 0px 0px rgba(0,0,0,0)"
        }
        let row = table.insertRow();
        for (key in element) {
            if(key != "course_schedule_id" && key!= "id"){
                let text = ""
                let cell = row.insertCell();
                text = document.createTextNode(element[key]);
                cell.appendChild(text);
                cell.appendChild(button);
            }
        }
    }
}


async function fetchGrades(enrollment_ID,academic_term ){
    const grades_url = "https://softeng.jbtabz.com/grades/"+enrollment_ID
    const res = await fetch (grades_url,{
        headers:{
            "X-Session-Token": token
        }
    })
    const d = await res.json()
    d.forEach(function(v){
        temp = v.subject_code;
        v.subject_code = v.subject_name;
        v.subject_name = temp; 
        delete v.is_hidden;
        delete v.subject_id 
        delete v.updated_at});
    const head = { 'Course Code' : '', 'Subject' : '', 'Grades' :''};
    let k = Object.keys(head);
    //Build table after fetching data
    generateGradesTableHead(gradesTable, k,i,academic_term);
    generateGradesTable(gradesTable, d);
    gradesTable.style.boxShadow = "0 2px 12px 12px rgba(0,0,0,.1)"
    gradesTable.scrollIntoView({behavior:'smooth'});
}

function generateGradesTableHead(table, data,i,academic_term) {
    let thead1 = table.createTHead();
    let row1 = thead1.insertRow();
    let th1 = document.createElement("th");
    let text1 = document.createTextNode(academic_term);
    th1.appendChild(text1);
    th1.colSpan= 3;
    row1.appendChild(th1);
    //generate headers once
    if(i<1){
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }   
}

function generateGradesTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let text = ""
            let cell = row.insertCell();
            cell.style.textAlign = "center"
            //Colorize Cell for grades status classifications
            if(element[key]==null){
                text = document.createTextNode("TBD");
                //cell.style.backgroundColor = "yellow";
            }else if(element[key]=="-1"){
                text = document.createTextNode("INC");
                //cell.style.backgroundColor = "#f68c1f";
            
            }else if(element[key]=="-2"){
                text = document.createTextNode("DRP");
                //cell.style.backgroundColor = "#f04d22";
            }else{
                text = document.createTextNode(element[key]);
                if(element[key]=="5.0") row.style.backgroundColor = "red";
            }
            cell.appendChild(text);
        }
    }
}