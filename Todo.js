const taskname = document.querySelector("#taskname");
const tasks = document.querySelector("#tasks");

let alltasks = [];
let task_counter = 1;

taskname.addEventListener("keydown",(e)=>{
    if(e.keyCode==13 && taskname.value!=""){
        AddTask();
    }else{
        taskname.value = prompt("Please enter some task");
        AddTask();
    }
} )

function AddTask() {
    let obj = {};
    obj.title = taskname.value;
    obj.status = 'pending';
    obj.id = task_counter;
    task_counter++;
    localStorage.setItem('task_counter',task_counter);
    alltasks.push(obj);

    AddtoUI(obj);
    storeToLocalStorage();
    // console.log(alltasks);

}

function AddtoUI(obj){

    let div = document.createElement("div");
    div.setAttribute("id", obj.id);
    let span = document.createElement("span");
    // let txtNode = document.createTextNode(obj.title);
    // let txtNode = document.createTextNode(taskname.value);
    //span.appendChild(txtNode);
    span.innerText = obj.title;
    // span.innerText = taskname.value;
    div.appendChild(span);

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

    div.appendChild(chk);


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

    div.appendChild(replace);


    let del = document.createElement("button");
    del.innerHTML = "Del"
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

    div.appendChild(del);


    tasks.appendChild(div);
    taskname.value = "";

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