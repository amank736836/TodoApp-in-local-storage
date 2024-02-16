let alltasks = [];
let task_counter = 1;

const taskname = document.querySelector("#taskname");
const tasks = document.querySelector("#tasks");

taskname.addEventListener("keydown",(e)=>{
    if(e.keyCode==13 && taskname.value!=""){
        AddTask();
    }else if(e.keyCode==13){
        taskname.value = prompt("Please enter some task");
        AddTask();
    }
} )

function AddTask() {
    let obj = {};
    obj.title = taskname.value;
    obj.status = 'pending';
    obj.id = task_counter;
    alltasks.push(obj);
    storeToLocalStorage();
    AddtoUI(obj);
    task_counter++;
    localStorage.setItem('task_counter',task_counter);
}

function AddtoUI(obj){

    let div = document.createElement("div");
    let span = document.createElement("span");
    let chk = document.createElement("input");
    let replace = document.createElement("button");
    let del = document.createElement("button");

    div.setAttribute("id", obj.id);
    div.setAttribute("class", "div1");
    
    span.innerText = obj.title;
    
    chk.setAttribute("type", "checkbox");
    if(obj.status == 'completed'){
        chk.setAttribute("checked","");
    }
    
    chk.addEventListener("click", (e)=>{
        check_task(e);
    })

    replace.innerHTML = "Replace";
    replace.addEventListener('click',(e)=>{
        replace_task(e);
    })
    
    del.innerHTML = "Delete"
    del.addEventListener('click',(e)=>{
        delete_task(e);
    })
    
    div.appendChild(span);
    div.appendChild(chk);
    div.appendChild(replace);
    div.appendChild(del);
    tasks.appendChild(div);

    clear();
}

function check_task(e){
    
    let parentdiv = e.target.parentNode;
    let taskid = parentdiv.getAttribute("id");

    let chk = parentdiv.childNodes[1];

    let status = "";
    if(chk.checked) status='completed';
    else status='pending';


    alltasks.filter((item)=>{
        if(item.id == taskid) item.status = status;
        return item;
    })
    storeToLocalStorage();
}

function replace_task(e){
    let parentdiv = e.target.parentNode;
    let taskid = parentdiv.getAttribute("id");
    let span = parentdiv.childNodes[0];

    span.innerText = taskname.value;

    alltasks = alltasks.filter((item)=>{
        if(item.id == taskid) item.title = taskname.value;
        return item;
    })
    storeToLocalStorage();
}

function clear(){
    taskname.value = "";
}

function delete_task(e){
    let parentdiv = e.target.parentNode;
    let taskid = parentdiv.getAttribute("id");
    parentdiv.remove();
    alltasks = alltasks.filter((item)=>{
        if(item.id != taskid) return item;
    })
    storeToLocalStorage();
}


function storeToLocalStorage(){
    localStorage.setItem("alltasks",JSON.stringify(alltasks));
}

function fetchFromLocalStorage(){
    if(localStorage.getItem("alltasks")!= '[]' && localStorage.getItem("alltasks")!=null){
        alltasks = JSON.parse(localStorage.getItem("alltasks"));
        task_counter = localStorage.getItem("task_counter");
        alltasks.forEach((item) => AddtoUI(item))
    }else{
        alltasks = [];
        task_counter = 1;
        localStorage.setItem('task_counter',1);
    }   
}

fetchFromLocalStorage()