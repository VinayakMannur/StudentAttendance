const searchDate = document.getElementById('searchDate');
const markAttendance = document.getElementById('markAttendance');

searchDate.addEventListener('click', searchAttendance);
markAttendance.addEventListener('click', submitAttendance);

async function searchAttendance(e){
    e.preventDefault();
    const date = document.getElementById('getDate').value;
    // console.log(date);
    
    showAllStudents();
}

async function showAllStudents(){

    document.getElementById('studentListForMarking').style.display = 'block';
    const parent = document.getElementById('studentListForMarkingAtt');

    let students = [];
    
    await axios.get('http://localhost:2000/allStudents')
        .then((responce) => {
            console.log(responce);
            students = responce.data.data;
        })
        .catch(err => console.log(err))

    students.forEach(stud => {
        // console.log(stud.names);
        const li = document.createElement('li');
        li.className = 'list-group-item student';
        
        const spanName = document.createElement('span');
        const spanId = document.createElement('span');
        spanName.textContent = stud.names;
        spanId.textContent = stud.id;
        spanId.style.display = 'none'
        li.appendChild(spanId);
        li.appendChild(spanName);

        const div = document.createElement('form');
        div.className = 'form-check form-check-inline float-end';

        const abradio = document.createElement('input');
        abradio.type = 'radio'
        abradio.name = 'status'
        abradio.id = `a${stud.id}`;
        abradio.value = 'absent';

        const ablabel= document.createElement('label');
        ablabel.className ='m-2'
        ablabel.setAttribute("for",`a${stud.id}`);
        ablabel.textContent = 'Absent';

        const preradio = document.createElement('input');
        preradio.type = 'radio'
        preradio.name = 'status'
        preradio.id = `p${stud.id}`;
        preradio.value = 'present';

        const prelabel= document.createElement('label');
        prelabel.className = 'm-2';
        prelabel.setAttribute("for",`p${stud.id}`);
        prelabel.textContent = 'Present'

        div.appendChild(abradio);
        div.appendChild(ablabel);
        div.appendChild(preradio);
        div.appendChild(prelabel);

        li.appendChild(div);

        parent.appendChild(li)     
    })
}

async function submitAttendance(){
    // console.log('attendance submitted');
    let newList = [];

    const date = document.getElementById('getDate').value;
    newList.push(date);

    const studentList = document.querySelectorAll('.student')

    // console.log(studentList);
    studentList.forEach(student => {
        let id = student.firstChild.textContent;
        // console.log(student);
        const ele = student.lastChild.elements;
        // console.log(ele);
        let status = ''

        for(let i=0; i<ele.length;i++){
            if(ele[i].checked){
                // console.log(ele[i].value);
                status = ele[i].value
            }   
        }
        newList.push(status)
    })

    await axios.post('http://localhost:2000/postAttendance',{
        date: newList[0],
        s1: newList[1],
        s2: newList[2],
        s3: newList[3],
        s4: newList[4],
        s5: newList[5],
        s6: newList[6],
        s7: newList[7],
        s8: newList[8],
        s9: newList[9]
    })
        .then(responce => {
            console.log(responce);
            location.reload();
        })
        .catch(err => console.log(err));
    
}
