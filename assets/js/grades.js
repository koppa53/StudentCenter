//Retreive necessary id and tokens for API Requests
const student_id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/"+student_id;
var i = 0;
let table = document.querySelector("table");
table.style.boxShadow = "0 2px 12px 12px rgba(0,0,0,.1)"
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');

//Fetch grades once page has loaded
window.onload = function() {
    fetchUserGrades();
};

async function fetchUserGrades(){
    try{
    //Create API Request
    const response = await fetch (enrollmentID_url,{
        headers:{
            "X-Session-Token": token
        }
    })
    const data = await response.json() 
    if(data!=undefined){
        notice.style.display = 'none';
    }
    for(i = 0; i<data.length;i++){
        const enrollment_ID = data[i].id
        const academic_term = data[i].academic_term_name
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
        generateTableHead(table, k,i,academic_term);
        generateTable(table, d);
    }
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
        let row = table.insertRow();
        for (key in element) {
            let text = ""
            let cell = row.insertCell();
            cell.style.textAlign = "center"
            //Colorize Cell for grades status classifications
            if(element[key]==null){
                text = document.createTextNode("TBD");
                cell.style.backgroundColor = "yellow";
            }else if(element[key]=="-1"){
                text = document.createTextNode("INC");
                cell.style.backgroundColor = "#f68c1f";
            
            }else if(element[key]=="-2"){
                text = document.createTextNode("DRP");
                cell.style.backgroundColor = "#f04d22";
            }else{
                text = document.createTextNode(element[key]);
                if(element[key]=="5.0") row.style.backgroundColor = "red";
            }
            cell.appendChild(text);
        }
    }
}

/* incase of 1st 2nd 3rd is needed in the semesters
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}*/
