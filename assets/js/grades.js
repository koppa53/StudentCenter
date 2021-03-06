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
let note = document.querySelector('#note');

//Fetch grades once page has loaded
window.onload = function() {
    fetchUserGrades();
    note.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
};

async function fetchUserGrades(){
    try{
        al.style.display = 'none';
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
        var student_name = ""
        if(data[0].student_first_name!="N/A") student_name= student_name + data[0].student_first_name + " "
        if(data[0].student_middle_name!="N/A") student_name = student_name + data[0].student_middle_name + " "
        if(data[0].student_last_name!="N/A") student_name = student_name + data[0].student_last_name
        const studentid_name = d.school_id + " : "+ student_name 
        data.forEach(function(v){
            Object.assign(v, {button: ""});
            v.academic_term_name += " "+ "("+ v.course_schedule_name + ")"
            delete v.department_name
            delete v.department_id
            delete v.reg_num
            delete v.course_schedule_year_level
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
        generateTableHead(table,k,i,studentid_name);
        generateTable(table, data);
        table.style.boxShadow = "0px 2px 12px 12px rgba(0,0,0,.1)"
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
    var count=0
    for (let element of data) {
        button = document.createElement("button");
        button.className ="button primary icon solid fa-search";
        button.setAttribute("id","btnid"+count);
        //reset timetable for new schedules
        button.onclick = function() {
            var id = this.id
            document.getElementById(id).disabled = true;
            if(document.getElementById("grades") != null)
                document.getElementById("grades").innerHTML = "";
            fetchGrades(element["id"],element["academic_term_name"]);
            gradesTable.style.boxShadow = "0 0px 0px 0px rgba(0,0,0,0)"
            setTimeout(function(){ document.getElementById(id).disabled = false; }, 1500);
        }
        let row = table.insertRow();
        row.style.backgroundColor = "#ffffff";
        for (key in element) {
            if(key != "course_schedule_id" && key!= "id"){
                let text = ""
                let cell = row.insertCell();
                text = document.createTextNode(element[key]);
                cell.appendChild(text);
                cell.appendChild(button);
            }
        }
        count++
    }
}


async function fetchGrades(enrollment_ID,academic_term ){
    try{
        al.style.display = 'none';
        var count = 0;
        var sum = 0;
        var gwa = 0;
        var complete = true;
        const grades_url = "https://softeng.jbtabz.com/grades/"+enrollment_ID
        const res = await fetch (grades_url,{
            headers:{
                "X-Session-Token": token
            }
        })
        const d = await res.json()
        d.forEach(function(v){
            if(v.grade==null || v.grade==-1 || v.grade==-2 || v.grade==0) complete = false;
            if(complete){
                sum = sum + v.grade * (v.subject_unit_lab+v.subject_unit_lec)
                count = count + v.subject_unit_lab+v.subject_unit_lec
            }
            temp = v.subject_code;
            v.subject_code = v.subject_name;
            v.subject_name = temp; 
            v.grade = parseFloat(v.grade).toFixed(1);
            delete v.subject_id;
            delete v.is_hidden;
            delete v.updated_at});
        gwa = sum/count
        gwa = gwa.toFixed(1)
        const head = { 'Course Code' : '', 'Subject' : '', 'Grades' :''};
        let k = Object.keys(head);
        //Build table after fetching data
        generateGradesTableHead(gradesTable, k,i,academic_term);
        generateGradesTable(gradesTable, d,gwa,complete);
        gradesTable.style.boxShadow = "0 2px 12px 12px rgba(0,0,0,.1)"
        gradesTable.scrollIntoView({behavior:'smooth'});
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
    }
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

function generateGradesTable(table, data,gwa,complete) {
    for (let element of data) {
        let row = table.insertRow();
        row.style.backgroundColor = "#ffffff";
        for (key in element) {
            if(key != "subject_unit_lab" && key!= "subject_unit_lec"){
                let text = ""
                let cell = row.insertCell();
                cell.style.textAlign = "center"
                //Classify Cell for grades status 
                if(element[key]=="NaN"){
                    text = document.createTextNode("TBD");
                }else if(element[key]==-1){
                    text = document.createTextNode("INC");
                }else if(element[key]==-2){
                    text = document.createTextNode("DRP");
                }else{
                    text = document.createTextNode(element[key]);
                }
                cell.appendChild(text);
            }
        }
    }
    let gtext=""
    let finalRow = table.insertRow();
    let cell = finalRow.insertCell();
    let text = document.createTextNode("General Weighted Average (GWA)")
    cell.style.textAlign = "center"
    cell.colSpan = "2"
    cell.style.backgroundColor = "#024089";
    cell.style.color = "white";
    cell.appendChild(text);
    let gcell = finalRow.insertCell();
    if(complete) {gtext = document.createTextNode(gwa)}
    else{
        gtext = document.createTextNode("N/A")
    }
    gcell.style.fontSize = "medium"
    gcell.style.fontWeight = "bold"
    gcell.style.textAlign = "center"
    gcell.style.backgroundColor = "#FFC619";
    gcell.appendChild(gtext);
}