
//Retreive necessary id and tokens for API Requests
const student_id = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/"+ student_id;
const get_profile_url = 'https://softeng.jbtabz.com/student/'+ student_id;
//setup table
var timetables = [
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
];
//Initialize Day-Frame and timetable setup
var week =  ['Mon', 'Tue', 'Wed', 'Thur', 'Fri','Sat','Sun'];
var highlightWeek = new Date().getDay();
var styles = {
    Gheight: 50,
    leftHandWidth: 80,
    palette: ['#3574ab', '#e08b02']
};

//Initialize Time-Frame
var timetableType = [
[{index: 'AM',name: '7:00'}, 1],
[{index: 'AM',name: '7:30'}, 1],
[{index: 'AM',name: '8:00'}, 1],
[{index: 'AM',name: '8:30'}, 1],
[{index: 'AM',name: '9:00'}, 1],
[{index: 'AM',name: '9:30'}, 1],
[{index: 'AM',name: '10:00'}, 1],
[{index: 'AM',name: '10:30'}, 1],
[{index: 'AM',name: '11:00'}, 1],
[{index: 'AM',name: '11:30'}, 1],
[{index: 'AM',name: '12:00'}, 1],
[{index: 'PM',name: '12:30'}, 1],
[{index: 'PM',name: '1:00'}, 1],
[{index: 'PM',name: '1:30'}, 1],
[{index: 'PM',name: '2:00'}, 1],
[{index: 'PM',name: '2:30'}, 1],
[{index: 'PM',name: '3:00'}, 1],
[{index: 'PM',name: '3:30'}, 1],
[{index: 'PM',name: '4:00'}, 1],
[{index: 'PM',name: '4:30'}, 1],
[{index: 'PM',name: '5:00'}, 1],
[{index: 'PM',name: '5:30'}, 1],
[{index: 'PM',name: '6:00'}, 1],
[{index: 'PM',name: '6:30'}, 1],
[{index: 'PM',name: '7:00'}, 1],
[{index: 'PM',name: '7:30'}, 1],
[{index: 'PM',name: '8:00'}, 1],
[{index: 'PM',name: '8:30'}, 1],
[{index: 'PM',name: '9:00'}, 1],
[{index: 'PM',name: '9:30'}, 1],
[{index: 'PM',name: '10:00'}, 1]
];


var i = 0;
let table = document.querySelector("table");
let button = document.createElement("button");
let dlbutton = document.createElement("button");
let element = document.getElementById("coursesTable");
let ele = document.getElementById("cont");
let notice = document.querySelector('#show-notice');
let dlnotice = document.querySelector('#show-download');
let dlsuccess = document.querySelector('#show-dlsuccess');
let al = document.querySelector('#show-alert');
let timetablecard = document.querySelector('#timetable-card');
let note = document.querySelector('#note');
let corStudName = "";

//Fetch all academic terms of student once page loads
window.onload = function() {
    fetchAcademicTerms();
    timetablecard.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
    note.style.boxShadow = "0px 2px 8px 8px rgba(0,0,0,.1)"
};

async function fetchAcademicTerms(){
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
        var current = new Date();
        var corstudent_name = ""
        if(data[0].student_first_name!="N/A") corstudent_name = corstudent_name + data[0].student_first_name + " "
        if(data[0].student_middle_name!="N/A") corstudent_name = corstudent_name + data[0].student_middle_name + " "
        if(data[0].student_last_name!="N/A") corstudent_name = corstudent_name + data[0].student_last_name
        const student_name = d.school_id + " : "+ corstudent_name
        const corgender = d.sex
        const corschoolid = d.school_id
        var seperate = d.birth_date.split("-")
        const age = current.getFullYear() - seperate[0] 
        data.forEach(function(v){
            Object.assign(v, {button: ""});
            v.academic_term_name += " "+ "("+ v.course_schedule_name + ")"
            delete v.department_name
            delete v.department_id
            delete v.course_schedule_year_level
            delete v.course_schedule_name
            delete v.student_first_name
            delete v.student_middle_name
            delete v.student_last_name
            delete v.created_at
            delete v.student_id
            delete v.academic_term_id
            delete v.id
            delete v.is_revoked
            delete v.subject_code;
            delete  v.subject_name; 
        delete v.updated_at});
        const head = { 'Academic Term' : '','Program' : '', 'Actions' : '' };
        let k = Object.keys(head);
        //Build table for academic term list
        generateTableHead(table,k,i,student_name);
        generateTable(table, data,corstudent_name,corgender,corschoolid,age);
        table.style.boxShadow = "0 2px 12px 12px rgba(0,0,0,.1)"
    }catch(e){
        console.log(e.message)
        al.style.display = 'block';
        notice.style.display = 'none';
    }   
}

function generateTableHead(table, data,i,student_name) {
    let thead1 = table.createTHead();
    let row1 = thead1.insertRow();
    let th1 = document.createElement("th");
    let text1 = document.createTextNode(student_name);
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
function generateTable(table, data,corstudent_name,corgender,corschoolid,age) {
    var count=0
    for (let element of data) {
        button = document.createElement("button");
        button.title = "View Graphical Schedule"
        button.className ="button primary icon solid fa-search";
        button.setAttribute("id","btnid"+count);
        dlbutton = document.createElement("button");
        dlbutton.className ="button primary icon solid fa-download ";
        dlbutton.title = "Download Schedule (COR)"
        dlbutton.setAttribute("id","dbtnid"+count);
        //reset timetable for new schedules
        button.onclick = function() {
            var id = this.id
            document.getElementById(id).disabled = true;
            timetables = [
                ['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
                ['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
                ['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
                ['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
                ['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
                ['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
                ['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','','',''],
                ];
            if(document.getElementById("coursesTable") != null)
                document.getElementById("coursesTable").innerHTML = "";
            var acad_term = element["academic_term_name"].split("(")
            var sem = acad_term[1].replace(")","")
            document.getElementById("sem").innerHTML = sem
            getSchedule(timetables,element["course_schedule_id"])
            setTimeout(function(){ document.getElementById(id).disabled = false; }, 1500);
        }
        //generate COR based on selected semester
        dlbutton.onclick = function(){
            document.querySelector("#header").scrollIntoView({behavior:'smooth'});
            var id = this.id
            document.getElementById(id).disabled = true;
            var acad_term = element["academic_term_name"].split("(")
            var term = acad_term[0].replace("S/Y","")
            generateCOR(corstudent_name,corgender,corschoolid,element["status"],element["course_name"],element["course_schedule_id"],term,age,id)
            
        }
        let row = table.insertRow();
        row.style.backgroundColor = "#ffffff";
        for (key in element) {
            if(key != "course_schedule_id" && key!="status" && key!="reg_num"){
                let text = ""
                let btext = ""
                let cell = row.insertCell();
                text = document.createTextNode(element[key]);
                btext = document.createTextNode(" ");
                cell.appendChild(text);
                cell.appendChild(button);
                cell.appendChild(btext);
                cell.appendChild(dlbutton);
                cell.style.textAlign = "middle"
            }
        }
        count++
    }
}

async function getSchedule(timetables,id){
    try{
        al.style.display = 'none';
        const schedule_url = "https://softeng.jbtabz.com/course_schedule_contents/"+id;
        const response = await fetch(schedule_url,{
            headers:{
                "X-Session-Token": token
            }
        });
        const data = await response.json();
        data.forEach(function(v){
            var profname = v.professor_first_name+" "+v.professor_middle_name+" "+v.professor_last_name;
            var x=0;
            var time = [0,0];
            delete v.id;
            delete v.course_schedule_id; 
            delete v.schedule_id;
            delete v.professor_id;
            delete v.subject_id;
            delete v.created_at;
            for(var y =0; y<=v.schedule_days.length; y++){
                if(v.schedule_days[y]=="mon"){
                    time = plot_table_time(v.schedule_time_start,v.schedule_time_duration);
                    for(i=time[0],x=1;x<=time[1];i++,x++){
                        timetables[0][i] = v.subject_name+"\n\n"+"Room: \n"+v.schedule_room+ "\n\nProfessor: "+profname;
                    }
                }
                if(v.schedule_days[y]=="tues"){
                    time = plot_table_time(v.schedule_time_start,v.schedule_time_duration);
                    for(i=time[0],x=1;x<=time[1];i++,x++){
                        timetables[1][i] = v.subject_name+"\n\n"+"Room: \n"+v.schedule_room+ "\n\nProfessor: "+profname;
                    }
                }
                if(v.schedule_days[y]=="wed"){
                    time = plot_table_time(v.schedule_time_start,v.schedule_time_duration);
                    for(i=time[0],x=1;x<=time[1];i++,x++){
                        timetables[2][i] = v.subject_name+"\n\n"+"Room: \n"+v.schedule_room+ "\n\nProfessor: "+profname;
                    }
                }
                if(v.schedule_days[y]=="thur"){
                    time = plot_table_time(v.schedule_time_start,v.schedule_time_duration);
                    for(i=time[0],x=1;x<=time[1];i++,x++){
                        timetables[3][i] = v.subject_name+"\n\n"+"Room: \n"+v.schedule_room+ "\n\nProfessor: "+profname;
                    }
                }
                if(v.schedule_days[y]=="fri"){
                    time = plot_table_time(v.schedule_time_start,v.schedule_time_duration);
                    for(i=time[0],x=1;x<=time[1];i++,x++){
                        timetables[4][i] = v.subject_name+"\n\n"+"Room: \n"+v.schedule_room+ "\n\nProfessor: "+profname;
                    }
                }
                if(v.schedule_days[y]=="sat"){
                    time = plot_table_time(v.schedule_time_start,v.schedule_time_duration);
                    for(i=time[0],x=1;x<=time[1];i++,x++){
                        timetables[5][i] = v.subject_name+"\n\n"+"Room: \n"+v.schedule_room+ "\n\nProfessor: "+profname;
                    }
                }
                if(v.schedule_days[y]=="sun"){
                    time = plot_table_time(v.schedule_time_start,v.schedule_time_duration);
                    for(i=time[0],x=1;x<=time[1];i++,x++){
                        timetables[6][i] = v.subject_name+"\n\n"+"Room: \n"+v.schedule_room+ "\n\nProfessor: "+profname;
                    }
                }
            }
        });
        timetablecard.style.display = "block"
        createTable()
        element.scrollIntoView({behavior:'smooth'});
    }catch(e){
        console.log(e)
        notice.style.display = 'none';
        al.style.display = 'block';
    }
}

function createTable(){
    var Timetable = new Timetables({
        el: '#coursesTable',
        timetables: timetables,
        week: week,
        timetableType: timetableType,
        styles: styles,
        gridOnClick: function (e) {
            if (e.name!="") alert(e.name)
        },
    });
}

function plot_table_time(time,duration){
    var i = 0;
    var d = 0;
    var t=[];
    if(time == "07:00:00"){
        t[0] = 0;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "07:30:00"){
        t[0] = 1;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "08:00:00"){
        t[0] = 2;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "08:30:00"){
        t[0] = 3;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "09:00:00"){
        t[0] = 4;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "09:30:00"){
        t[0] = 5;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "10:00:00"){
        t[0] = 6;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "10:30:00"){
        t[0] = 7;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "11:00:00"){
        t[0] = 8;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "11:30:00"){
        t[0] = 9;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "12:00:00"){
        t[0] = 10;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "12:30:00"){
        t[0] = 11;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "13:00:00"){
        t[0] = 12;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "13:30:00"){
        t[0] = 13;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "14:00:00"){
        t[0] = 14;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "14:30:00"){
        t[0] = 15;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "15:00:00"){
        t[0] = 16;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "15:30:00"){
        t[0] = 17;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "16:00:00"){
        t[0] = 18;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "16:30:00"){
        t[0] = 19;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "17:00:00"){
        t[0] = 20;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "17:30:00"){
        t[0] = 21;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=3
        }
        t[1] = d
        return t
    }
    if(time == "18:00:00"){
        t[0] = 22;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=3
        }
        t[1] = d
        return t
    }
    if(time == "18:30:00"){
        t[0] = 23;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "19:00:00"){
        t[0] = 24;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "19:30:00"){
        t[0] = 25;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "20:00:00"){
        t[0] = 26;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "20:30:00"){
        t[0] = 27;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "21:00:00"){
        t[0] = 27;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "21:30:00"){
        t[0] = 27;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
    if(time == "22:00:00"){
        t[0] = 27;
        for(i=1;i<=duration.hours;i++){
            d+=2
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
}

async function generateCOR(corstudent_name,corgender,corschoolid,status,program,id,term,age,divid){
    dlnotice.style.display = 'block';
    var stat =""
    var registrationNum=""
    if(status=="Regular") stat = "FREE EDUCATION"
    var totalunits = 0;
    const re = await fetch (enrollmentID_url,{
        headers:{
            "X-Session-Token": token
        }
    })
    const rnum = await re.json();
    rnum.forEach(function(g){ 
        if(g.course_schedule_id == id){
            registrationNum = g.reg_num
        }
    })
    const yearlvl_url = "https://softeng.jbtabz.com/course_schedule/"+id;
        const res = await fetch(yearlvl_url,{
            headers:{
                "X-Session-Token": token
            }
        });
    const d = await res.json();
    const department_url = "https://softeng.jbtabz.com/course/"+d.course_id;
        const r = await fetch(department_url,{
            headers:{
                "X-Session-Token": token
            }
        });
    const department = await r.json();
    const schedule_url = "https://softeng.jbtabz.com/course_schedule_contents/"+id;
        const response = await fetch(schedule_url,{
            headers:{
                "X-Session-Token": token
            }
        });
    const data = await response.json();
    var sub= new Array()
    data.forEach(function(g){
        sub.push(g.subject_name)
    })
    //COUNT ALL SUBJECTS BY REMOVING DUPLICATES
    var filteredSubjects = sub.filter((value,index)=> sub.indexOf(value)===index)
    var count = 0;
    var content = Array.from(Array(filteredSubjects.length), () => new Array(8))
    var alreadyAdded = false
    data.forEach(function(v){
        var dupPos = 0;
        //CHECK IF SUB IS ALREADY LISTED
        for(i=0;i<filteredSubjects.length;i++){
            if(content[i][1] == v.subject_name){
                alreadyAdded = true
                dupPos = i
            }
        }if(alreadyAdded==false){
            content[count][0] = v.subject_code
            content[count][1] = v.subject_name
            var credits = v.subject_unit_lec + v.subject_unit_lab
            if(v.subject_unit_lab==0.0) v.subject_unit_lab ="---"
            else{
                v.subject_unit_lab= v.subject_unit_lab.toFixed(1)
            }
            content[count][2] = credits.toFixed(1) + " " + v.subject_unit_lec.toFixed(1) + " " + v.subject_unit_lab
            content[count][3] = v.schedule_class
            var days = ""
            for(var y =0; y<=v.schedule_days.length; y++){
                if(v.schedule_days[y]=="mon") days = days + "M"
                if(v.schedule_days[y]=="tues") days = days + "T"
                if(v.schedule_days[y]=="wed") days = days + "W"
                if(v.schedule_days[y]=="thur") days = days + "Th"
                if(v.schedule_days[y]=="fri") days = days + "F"
                if(v.schedule_days[y]=="sat") days = days + "S"
                if(v.schedule_days[y]=="sun")days = days + "Sun"
                
            }
            content[count][4] = days
            var starttime = tConvert(v.schedule_time_start)
            //REFORMAT START TIME
            var sep = starttime.split(":")
            sep[2] = sep[2].replace("00","")
            var formattedStartTime = sep[0]+":"+sep[1]+" "+sep[2]
            //COMPUTE END TIME
            var separate = starttime.split(":")
            separate[0] = parseInt(separate[0]) + parseInt(v.schedule_time_duration["hours"])
            if(separate[0]==12) separate[2] = separate[2].replace("AM","PM")
            if(separate[0]>12) {
                separate[0] = parseInt(separate[0]) - 12
                separate[2] = separate[2].replace("AM","PM")
            }
            if(v.schedule_time_duration["minutes"]!=null){
                separate[1] = parseInt(separate[1]) + parseInt(v.schedule_time_duration["minutes"])
                if(separate[1]==60){
                    separate[1]="00"
                    separate[0] = parseInt(separate[0]) + 1
                }
            }
            separate[2] = separate[2].replace("00","")
            var endtime= separate[0]+":"+separate[1]+" "+separate[2]
            content[count][5] = formattedStartTime +"-"+ endtime
            content[count][6] = v.schedule_room
            content[count][7] = v.professor_last_name.toUpperCase()+", "+v.professor_first_name[0]+"."
            totalunits = totalunits + credits
            count++
        }else{
            //IF SUB IS ALREADY LISTED APPEND TO EXISTING SCHEDULE
            var days = ""
            for(var y =0; y<=v.schedule_days.length; y++){
                if(v.schedule_days[y]=="mon") days = days + "M"
                if(v.schedule_days[y]=="tues") days = days + "T"
                if(v.schedule_days[y]=="wed") days = days + "W"
                if(v.schedule_days[y]=="thur") days = days + "Th"
                if(v.schedule_days[y]=="fri") days = days + "F"
                if(v.schedule_days[y]=="sat") days = days + "S"
                if(v.schedule_days[y]=="sun")days = days + "Sun"
            }
            content[dupPos][4] = content[dupPos][4]+"\n"+days
            var starttime = tConvert(v.schedule_time_start)
            //REFORMAT START TIME
            var sep = starttime.split(":")
            sep[2] = sep[2].replace("00","")
            var formattedStartTime = sep[0]+":"+sep[1]+" "+sep[2]
            //COMPUTE END TIME  
            var separate = starttime.split(":")
            separate[0] = parseInt(separate[0]) + parseInt(v.schedule_time_duration["hours"])
            if(separate[0]==12) separate[2] = separate[2].replace("AM","PM")
            if(separate[0]>12) {
                separate[0] = parseInt(separate[0]) - 12
                separate[2] = separate[2].replace("AM","PM")
            }
            if(v.schedule_time_duration["minutes"]!=null){
                separate[1] = parseInt(separate[1]) + parseInt(v.schedule_time_duration["minutes"])
                if(separate[1]==60){
                    separate[1]="00"
                    separate[0] = parseInt(separate[0]) + 1
                }
            }
            separate[2] = separate[2].replace("00","")
            var endtime= separate[0]+":"+separate[1]+" "+separate[2]
            content[dupPos][5] = content[dupPos][5]+"\n"+formattedStartTime +"-"+ endtime
            var profname = v.professor_last_name.toUpperCase()+", "+v.professor_first_name[0]+"."
            if(content[dupPos][7]!= profname ) content[dupPos][7] = content[dupPos][7]+"\n" + profname
            alreadyAdded = false
        }
    })
    //templates
    var tUnits = "Total Units: "+"("+totalunits.toFixed(1)+")"
    var studName = "STUDENT NAME:   " + corstudent_name.toUpperCase()
    var studID = "STUDENT NUMBER:    " + corschoolid.toUpperCase()
    var corprogram = "PROGRAM:    " + program.toUpperCase() 
    var major = "MAJOR:    "
    var yearlvl = "YEAR LVL: " + d.year_level.toUpperCase()
    var corAge = "AGE:  " + age
    var gender = "GENDER: " + corgender.toUpperCase()
    var sy = "SCHOOL YEAR:" + term.toUpperCase()
    var curriculum = "CURRICULUM: "
    var scholarship = "SCHOLARSHIP: " + stat
    var regNum = "REGISTRATION NUMBER: "
    var studSig = "STUDENT SIGNATURE"
    var regSig = "COLLEGE REGISTRAR"
    var reciept = "OFFICIAL RECEIPT:_____________________________"
    var paydate = "PAYMENT/VALIDATION DATE:_____________________"
    var note = "KEEP THIS CERTIFICATE YOU WILL BE REQUIRED TO PRESENT THIS IN ALL YOUR DEALINGS WITH THE COLLEGE."
    var printBy = "PRINTED BY: "
    var note2 = "*NOTE: INVALID WITHOUT THE REGISTRAR'S SIGNATURE"
    //append data
    var current = new Date();
    var regName = "SHARLENE A. MENDIZABAL"
    var initials = corstudent_name.toUpperCase().split(" ")
    window.jsPDF = window.jspdf.jsPDF
    var pdf = new jsPDF('p','mm','a4');
    var img = new Image;
    img.crossOrigin = "";  
    img.src = "images/BU-small-logo.png";
    img.onload = function() {
        var textWidth = pdf.getStringUnitWidth(department.department_name.toUpperCase()) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
        var textOffset = (pdf.internal.pageSize.width - textWidth) / 2;
        pdf.setFont('Helvetica')
        pdf.addImage(this,98, 2 ,20,20);
        pdf.setFontSize(35)
        pdf.text("BICOL UNIVERSITY",98,35,{ charSpace: '1.5', align: 'center' })
        pdf.setFontSize(19)
        pdf.text(textOffset, 45, department.department_name.toUpperCase());
        pdf.setFontSize(14)
        pdf.setFont('Helvetica','bold')
        pdf.text("CERTIFICATE OF REGISTRATION",92,57,{ align: 'center' , charSpace: '1.5'})
        pdf.setDrawColor(107,207,245); 
        pdf.rect(5, 62, 200, 22);
        pdf.setFont('Helvetica','normal')     
        pdf.setFontSize(10)
        pdf.text(studName,6,66)
        pdf.text(studID,6,70)
        pdf.text(corprogram,6,74)
        pdf.text(major,6,78)
        pdf.text(yearlvl,6,82)
        pdf.text(corAge,130,66)
        pdf.text(gender,130,70)
        pdf.text(sy,130,74)
        pdf.text(curriculum,130,78)
        pdf.text(scholarship,130,82)
        pdf.autoTable({
            startY:87 ,
            tableWidth: 200,
            head: [['Code', 'Subject', 'Units\nCred/Lec/Lab','Class' ,'Days', 'Time' , 'Room','Faculty']],
            headStyles:{textColor: 21,halign: 'center',fillColor: [107,207,245],cellPadding:{top: 1, right: 1, bottom: 0, left: 0 }},
            didParseCell(data) {
                if (data.section === 'head' && data.column.index === 2) data.cell.styles.fontSize=7;
            },
            bodyStyles: { halign: 'center',fontSize:9, cellPadding:{top: 1, right: 1, bottom: 1, left: 0 }}, 
            margin: { top: 10 , left:5},
            body: content,
        })
        pdf.autoTable({
            tableWidth: 90,
            head: [[{
                    content: 'ASSESED FEES',
                    colSpan: 2,
                    styles: { textColor: 21,halign: 'center',fillColor: [107,207,245] },},
                ],
            ],
            bodyStyles: { halign: 'left',fontSize:9 , maxCellHeight:3,cellPadding:{top: 0, right: 5, bottom: 1, left: 0}}, 
            margin: {left:5},
            body: [
                [tUnits, ''],
                ['',''],
                ['Tuition Fee - UG/CP/ETEEAP', '3,675.00'],
                ['Med & Den. Fee - UG/CP/ETEEAP', '20.00'],
                ['Library Fee - UG/CP/ETEEAP', '50.00'],
                ['Guidance Fee - UG/CP/ETEEAP', '50.00'],
                ['Athletic Fee - UG/CP/ETEEAP', '40.00'],
                ['SCUAA Fee - UG/CP/ETEEAP', '50.00'],
                ['Cultura Fee - UG/CP/ETEEAP', '40.00'],
                ['Universitarian Fee - UG/CP/ETEEAP', '12.00'],
                ['Internet Fee - UG/CP/ETEEAP', '175.00'],
                ['Matriculation Fee - UG/CP/ETEEAP', '20.00'],
                ['Laboratory Fee - UG/CP/ETEEAP', '200.00'],
                ['Laboratory Fee - UG/CP/ETEEAP', '200.00'],
                ['Laboratory Fee - UG/CP/ETEEAP', '200.00'],
                ['', ''],
                ['Total Assesment:', '4,712.00'],
                ['Less Financial Aid:', '0.00'],
                ['Net Assessed:', '4,712.00'],
                ['Total Payment:', '0.00'],
                ['Outstanding Balance:', '4,712.00'],
                ['Additional Previous Balance:', '21,760.00'],
            ],
        })
        let finalY = pdf.lastAutoTable.finalY
        pdf.setFont('Helvetica','bold')
        pdf.setFontSize(9)
        pdf.setFillColor(243,240,255);
        pdf.rect(97, finalY-111, 105, 5, "F");
        pdf.text(regNum,97,finalY-107)
        pdf.setTextColor(255,0,0)
        pdf.text(registrationNum,140,finalY-107)
        pdf.setTextColor(0,0,0)
        pdf.text(corstudent_name.toUpperCase(),133,finalY-67)
        pdf.setFont('Helvetica','normal')
        pdf.setFontSize(8)
        pdf.text(studSig,133,finalY-63)
        pdf.setFont('Helvetica','bold')
        pdf.setFontSize(9)
        pdf.text(regName,133,finalY-45)
        pdf.setFont('Helvetica','normal')
        pdf.setFontSize(8)
        pdf.text(regSig,133,finalY-41)
        pdf.text(reciept,97,finalY-11)
        pdf.text(paydate,97,finalY-7)
        pdf.setFillColor(243,240,255);
        pdf.rect(97, finalY-5, 105, 3, "F");
        pdf.setFontSize(5)
        pdf.text(note,100, finalY-3,)
        pdf.text(printBy,97, finalY,)
        pdf.text(initials[0]+" "+initials[initials.length-1],109, finalY,)
        pdf.text(current.toLocaleString(),129, finalY,)
        pdf.setFont('Helvetica','bold')
        pdf.setTextColor(255,0,0)
        pdf.text(note2,155, finalY,)
        //pdf.output('dataurlnewwindow'); 
        pdf.save(corschoolid+".pdf");
        dlnotice.style.display = 'none'
        dlsuccess.style.display = 'block'
        setTimeout(function(){ dlsuccess.style.display = 'none'}, 5000);
        document.getElementById(divid).disabled = false;
    };
}

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}