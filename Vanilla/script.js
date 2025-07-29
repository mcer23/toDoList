//Ensures the script runs only after the HTML is loaded
document.addEventListener('DOMContentLoaded',()=>{
    //connection with HTML
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    //Si se tiene alguna imagen o texto cuando el espacio esta vacio
    const emptyImage = document.querySelector('empty-image');
    const toggleEmptyState = () =>{
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none'
    }

    //Handles the function of adding a new task
    const newTask = (event) => {
        event.preventDefault();
        const taskText=taskInput.value.trim();

        if(!taskText){ //checks if the task space is empty or invalid
            return; 
        }
        const li = document.createElement('li');
        //li.textContent = taskText;
        li.innerHTML = `
        <input type="checkbox" class="checkbox>
        <span>${taskText}</span>
        `


        taskList.appendChild(li);
        taskInput.value='';
        toggleEmptyState();
    };
    //adds a clickevent to the btn
    addTaskBtn.addEventListener('Click', newTask);
    taskInput.addEventListener('keypress', (e)=>{
        if(e.key==='Enter'){
            newTask(e);
        }
    })
})
    