const taskname = document.querySelector("#taskname");
const tasks = document.querySelector("#tasks");

let alltasks = [];
let task_counter = 1;

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
    div.setAttribute("id", obj.id);
    div.setAttribute("class", "div1");
    let span = document.createElement("span");
    span.innerText = obj.title;
    
    let chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    if(obj.status == 'completed'){
        chk.setAttribute("checked","");
    }
    chk.addEventListener("click", (e)=>{
        let status = "";
        if(chk.checked)
        status='completed';
    else
    status='pending';

    let parentdiv = e.target.parentNode;
    let taskid = parentdiv.getAttribute("id");

    alltasks.map((item)=>{
        if(item.id == taskid)
        item.status = status;
    return item;
    })
    storeToLocalStorage();
    // console.log(alltasks);
    })




    let replace = document.createElement("button");
    replace.innerHTML = "Replace";
    replace.addEventListener('click',(e)=>{
        // console.log(e);
        // const title = prompt('Enter updated new task:');
        // span.innerText = title;
        // let parentdiv = e.target.parentNode;
        // let taskid = parentdiv.getAttribute("id");
        // alltasks = alltasks.filter((item)=>{
        //     if(item.id == taskid){
        //         item.title = title;
        //     }
        //     return item;
        // })
        // storeToLocalStorage();
        // console.log(alltasks);

        const input = document.createElement("input");
        input.setAttribute("autofocus", "");
        input.type = "text";
        input.placeholder = "Enter updated new task";
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const title = input.value;
                span.innerText = title;
                let parentDiv = e.target.parentNode;
                let taskId = parentDiv.getAttribute("id");
                alltasks = alltasks.map((item) => {
                    if (item.id == taskId) {
                        item.title = title;
                    }
                    return item;
                });
                storeToLocalStorage();
                div.removeChild(input);
            }
         });
        div.insertBefore(input, replace);
    })

    
    
    let del = document.createElement("button");
    del.innerHTML = "Delete"
    del.addEventListener('click',(e)=>{
        let parentdiv = e.target.parentNode;
        let taskid = parentdiv.getAttribute("id");
        parentdiv.remove();
        alltasks = alltasks.filter((item)=>{
            if(item.id != taskid){
                return item;
            }
        })
        storeToLocalStorage();
    })
    
    taskname.value = "";
    
    
    div.appendChild(span);
    div.appendChild(chk);
    div.appendChild(replace);
    div.appendChild(del);
    tasks.appendChild(div);
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