"use strict"
//date function
const dateElement= document.getElementById("date");
const options= {
    weekday:"long",
    month:"short",
    day:"numeric"
                }
const today= new Date();

dateElement.innerHTML= today.toLocaleDateString("en-US",options);


// function add to do

const list= document.getElementById("list");
const input= document.getElementById("input");
const normalButton= document.getElementById("normal");
const finishedTask= document.getElementById("done");
const unfinishedTask= document.getElementById("not-done");


let toDo=[];
let buttonToDo=[];
let editValue=[];
let valueItem= [];
let id;
let idButton;
let editId;



function addToDo(){
    
    //input part
    const itemValue= input.value;
    if(itemValue===""){
        var alerta= alert("Por Favor escribe algo en tu lista");
        return;
    }
    valueItem.push(itemValue);
    console.log(valueItem);

    //creating elements
    const itemNew= document.createElement("li");
    const deleteButton= document.createElement("button");
    const para = document.createElement("p");
    const editButton= document.createElement("button");
    const checkButton= document.createElement("input");
    const buttonsContainer= document.createElement("div");
    

    buttonsContainer.classList.add("buttons");
    
    //creating text
    para.classList.add("text");
    const text= document.createTextNode(itemValue);
    para.appendChild(text);
    

    //check-buttton
    
    checkButton.classList.add("check");
    checkButton.setAttribute("type","checkbox");
    checkButton.value= "not-checked";
    
    //item
    itemNew.classList.add("item");
    itemNew.appendChild(checkButton);           
    itemNew.appendChild(para);
    list.appendChild(itemNew);
    
    

    //edit-button
    editButton.classList.add("edit");
    editButton.value="EDIT";
    let editName= document.createTextNode("EDIT");
    editButton.appendChild(editName);
    buttonsContainer.appendChild(editButton);
    itemNew.appendChild(buttonsContainer);
    
    //delete-button
    deleteButton.classList.add("delete");
    deleteButton.value="REMOVE";
    let deleteName= document.createTextNode("REMOVE");
    deleteButton.appendChild(deleteName);
    buttonsContainer.appendChild(deleteButton);
    itemNew.appendChild(buttonsContainer);
    
    //id
    toDo.push(itemNew);
    let id= toDo.indexOf(itemNew);
    console.log(id);

    //id delete-button
    buttonToDo.push(deleteButton);
    let idButton= buttonToDo.indexOf(deleteButton);

    //id edit-button
    editValue.push(editButton);
    let editId= editValue.indexOf(editButton);
    
    //checkbox button
    checkButton.addEventListener("click",()=>{

        if (checkButton.value==="not-checked") {
            checkButton.setAttribute("value","checked");
            checkButton.setAttribute("style","background:#22F700; color: cornsilk ")
            para.setAttribute("style","color:#ACACAC; text-decoration:line-through");
            console.log(checkButton);
        } else {
            checkButton.setAttribute("value","not-checked");
            checkButton.setAttribute("style","background:none; color: none ")
            para.setAttribute("style","color:none; text-decoration:none");
            console.log(checkButton);
        }
        
    });

    //edit button
    editButton.addEventListener("click",()=>{
        if(editId===id){
            let editText= prompt("Inserte aqui el texto a cambiar ...");
            para.innerHTML=editText;
            }
        }
    );


    //delete button
    deleteButton.addEventListener("click",()=>{
            if(idButton===id){
            list.removeChild(itemNew);
            valueItem.splice(id,1);
            console.log(valueItem);
            
            }
        }
    );
    
    //normal button
    normalButton.addEventListener("click",()=>{
        itemNew.setAttribute("style","display:block");
    });

    
    //finished-task button
    finishedTask.addEventListener("click",()=>{
        if (checkButton.value==="checked") {
            itemNew.setAttribute("style","display:block");
            
        } else {
            itemNew.setAttribute("style","display:none");
        }
    });

    //unfinished-task button
    unfinishedTask.addEventListener("click",()=>{
        if (checkButton.value==="not-checked") {
            itemNew.setAttribute("style","display:block");
            
        } else {
            itemNew.setAttribute("style","display:none");
        }
    });

}

document.addEventListener("keyup",(event)=>{ if(event.keyCode===13){addToDo()}});