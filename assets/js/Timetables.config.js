//SOME CODES/FUNCTIONS ARE CAN BE OPTMIZED will be updated soon
//setup table
var timetables = [
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','',''],
['', '', '', '', '', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','','',''],
];

var week =  ['Mon', 'Tue', 'Wed', 'Thur', 'Fri','Sat','Sun'];
var highlightWeek = new Date().getDay();
var styles = {
    Gheight: 50,
    leftHandWidth: 80,
    palette: ['#ff6633', '#ffd061']
};

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

var flag=0;
var i = 0;
var sem = 4;
let table = document.querySelector("table");
var button = document.createElement("button");
button.className ="button primary icon solid fa-search";

window.onload = function() {
    //getSchedule(timetables)
    fetchAcademicTerms();
};

button.addEventListener("click",function() {
    if (flag===0) {
        getSchedule(timetables)
    }
})

async function fetchAcademicTerms(){
    try{
    const enrollmentID_url = "https://softeng.jbtabz.com/enrollments/50782d26-4b44-4486-9a85-961ee20574ee"
    const response = await fetch (enrollmentID_url)
    const data = await response.json() 
    if(data!=undefined){
        const al = document.querySelector('#show-notice');
        al.style.display = 'none';
    }
    const enrollment_ID = data[0].id
    const academic_term = data[0].academic_term_name
    const student_name = data[0].student_first_name+" "+data[0].student_middle_name+" " +data[0].student_last_name
    data.forEach(function(v){
        v.academic_term_name += " "+ "("+ v.course_schedule_name + ")"
        delete v.course_schedule_name
        delete v.status
        delete v.course_schedule_id
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
    const head = { 'Academic Term' : '','Program' : '', 'View' : '' };
    console.log(data)
    let k = Object.keys(head);
    console.log(k)
    generateTableHead(table,k,i,student_name);
    generateTable(table, data);
    }catch(e){
        console.log(e.message)
        const al = document.querySelector('#show-alert');
        al.style.display = 'block';
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
        let c = row.insertCell();
        c.appendChild(button);
    }
}



async function getSchedule(timetables){
    try{
        const schedule_url = "https://softeng.jbtabz.com/course_schedule_contents/8e371283-7293-4dcb-81af-9291cfcc141a"
        const response = await fetch(schedule_url);
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
            }
        });
        flag=1
        createTable()
    }catch(e){
        console.log(e)
        const al = document.querySelector('#show-alert');
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
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
            if(i==1){
                d+=3
            }else{
                d+=2
            }
        }
        if(Object.keys(duration).length > 1){
            d+=1
        }
        t[1] = d
        return t
    }
}


