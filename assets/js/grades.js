//sample data
let sample_data=[
    { Code: "Course 101" , Subject: "sub1" , Grade: "1.1"},
    { Code: "Course 102" , Subject: "sub2" , Grade: "1.1"},
    { Code: "Course 103" , Subject: "sub3" , Grade: "1.1"},
    { Code: "Course 104" , Subject: "sub4" , Grade: "1.1"},
    { Code: "Course 105" , Subject: "sub5" , Grade: "1.1"}
]
var i = 0;
var sem = 4;
let table = document.querySelector("table");
let notice = document.querySelector('#show-notice');
let al = document.querySelector('#show-alert');

window.onload = function() {
    fetchUserGrades();
};

async function fetchUserGrades(){
    try{
    const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/50782d26-4b44-4486-9a85-961ee20574ee"
    const response = await fetch (enrollmentID_url)
    const data = await response.json() 
    if(data!=undefined){
        notice.style.display = 'none';
    }
    const enrollment_ID = data[0].id
    const academic_term = data[0].academic_term_name
    const grades_url = "https://softeng.jbtabz.com/grades/"+enrollment_ID
    const res = await fetch (grades_url)
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
    generateTableHead(table, k,i,academic_term);
    generateTable(table, d);
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
            if(element[key]==null){
                text = document.createTextNode("TBD");
            }else{
                text = document.createTextNode(element[key]);
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
