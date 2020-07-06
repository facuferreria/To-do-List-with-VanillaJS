"use strict";

//GET ACTUAL DATE
const options= {
    month:"long",
    day:"numeric",
    year: "numeric"
}

const dateElement= document.getElementById("date");
const today = new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US",options);

//HTML ELEMENTS
const form  = document.getElementById("list");
const input = document.getElementById("input");
const normalButton = document.getElementById("normal");
const finishedTask = document.getElementById("done");
const unfinishedTask = document.getElementById("not-done");
const refreshBtn = document.getElementById("refresh-btn");
const failBox = document.getElementById("fail");
const closeBtn = document.getElementById("close-btn");
const taskCategories = document.getElementById("categories")

let lists = [];

document.addEventListener("keyup",(event)=>{ if(event.keyCode === 13) addTask() });
refreshBtn.addEventListener("click",() => refreshPage());

// Obtener desde localStorage al cargar todo el DOM
window.addEventListener( "load", function() {
    lists = JSON.parse(localStorage.getItem("item.list")) || [];
    // Agregar en HTML los elementos encontrados
    lists.forEach((item) => addTask(item));
});

function addTask(fromList){
    
    event.preventDefault();

    let inputValue= (fromList) ? fromList.name : input.value;
    
    if(inputValue === "" || inputValue === null) return failAlert();

    function failAlert(){
        failBox.style.display = "block";
        closeBtn.addEventListener("click", ()=> failBox.style.display = "none");
    }

    //CREATING COMPONENTS
    const item = document.createElement("li");
    const deleteBtn = document.createElement("i");
    const toDoTxt = document.createElement("p");
    const editBtn  = document.createElement("i");
    const checkBtn= document.createElement("i");
    const btnContainer = document.createElement("div");

    btnContainer.classList.add("buttons");

    //ITEM COMPONENT
    item.classList.add("item");
    let id = parseInt(item.dataset.id);
    id = (fromList) ? fromList.id : lists.length;

    //SUB-COMPONENT TODO TEXT
    const text= document.createTextNode(inputValue);
    toDoTxt.className = "text";
    toDoTxt.appendChild(text);

    //SUB-COMPONENT CHECKBOX
    if (fromList && fromList.completed === true) {
        checkBtn.className = "far fa-check-circle";
        toDoTxt.classList.add("completed");
    } else {
        checkBtn.className = "far fa-circle";
        toDoTxt.className = "text";
    }
    
    //SUB-COMPONENT EDIT BUTTON
    editBtn.className = "far fa-edit";
    btnContainer.appendChild(editBtn);
    
    //SUB COMPONENT DELETE BUTTON
    deleteBtn.className = "fas fa-trash-alt";
    btnContainer.appendChild(deleteBtn);
    
    //APPEND COMPONENTS TO THE ITEM
    item.appendChild(checkBtn);           
    item.appendChild(toDoTxt);
    form.appendChild(item);
    item.appendChild(btnContainer);

    //EVENT LISTENER TO THE ITEM
    item.addEventListener("click", (element) => {
        element = element.target; 
        if (element === checkBtn) return checkTask();
        if (element === deleteBtn) return deleteTask();
        if (element === editBtn) return editTask();
    });
    
    //CHECK THE TASK
    function checkTask() {

        checkBtn.classList.toggle("fa-circle");
        checkBtn.classList.toggle("fa-check-circle");
        toDoTxt.classList.toggle("completed");
        checkBtn.className === "far fa-check-circle" ? lists[id].completed = true : 
        lists[id].completed = false;
        saveValue(checkBtn);

        function saveValue(el) {
            const dataLS = JSON.parse(localStorage.getItem('item.list'));
            (fromList) ? dataLS[id].completed =  fromList.completed :  
            dataLS[id].completed = lists[id].completed;
            saveAndUpdateData(dataLS);
        } 
    };

    // EDIT THE TASK
    function editTask() {

            toDoTxt.innerHTML =`<div class=".edit-container" id = "edit-container">
                                    <input type="text" class="edit-input" id = "edit-input">
                                    <i class="fas fa-plus-circle fa-lg" id = "submit-edit"></i>
                                </div>`;

            let editInput = document.getElementById("edit-input");
            let submitEdit = document.getElementById("submit-edit");
             
            submitEdit.addEventListener("click",() => editTask());

            function saveNewTask(){
                const dataLS = JSON.parse(localStorage.getItem('item.list'));
                dataLS[id].name = editInput.value;
                saveAndUpdateData(dataLS);
            }
            
            function editTask (){
                toDoTxt.innerHTML = editInput.value;
                saveNewTask();
            };
        };

    //DELETE THE TASK AND REMOVE IT FROM STORAGE
    function deleteTask() {
        form.removeChild(item);
        const dataLS = JSON.parse(localStorage.getItem('item.list'));
        const key = dataLS.findIndex(el => el.name == toDoTxt.textContent);
        dataLS.splice(key, 1);
        saveAndUpdateData(dataLS);
        location.reload();
    };
         
    // EVENT LISTENER TO THE NAV
    taskCategories.addEventListener("click", (element) => {
        element = element.target;
        if (element === normalButton) return goToNormal();
        if (element === finishedTask) return seeFinishedTasks();
        if (element === unfinishedTask) return seeUnfinishedTask();
    });

    //GO TO NORMAL BUTTON
    let goToNormal = () => item.style.display = "flex";

    //FINISHED TASK BUTTON
    let seeFinishedTasks = () => { 
        checkBtn.value=== "checked" ? item.style.display = "flex" : item.style.display = "none";
    };

    // UNFINISHED TASK BUTTON
    let seeUnfinishedTask = () => {
        checkBtn.value=== "not-checked" ? item.style.display = "flex" : item.style.display = "none";
    };

    //UPLOADING THE DATA
    let data = createDataList(inputValue);

    if(!fromList) {
        lists.push(data);
        saveAndUpdateData(lists);
    }
    
    function saveAndUpdateData(item) {  
        localStorage.setItem("item.list", JSON.stringify(item));
    }

    function createDataList(name) {
        return {id: lists.length, name: name, completed: false};
    }

    input.value = "";
}

function refreshPage() {
    localStorage.clear();
    location.reload();
}