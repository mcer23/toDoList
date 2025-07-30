//Ensures the script runs only after the HTML is loaded
document.addEventListener('DOMContentLoaded',()=>{
    //connection with HTML
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    //Si se tiene alguna imagen o texto cuando el espacio esta vacio
    const emptyImage = document.querySelector('empty-image');
    
    /*Esto solo aplica si se tiene una img o txt en el espacio del task mientras esta vacio.  */
    // const toggleEmptyState = () =>{
    //     emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none'
    // }

    //Progress status
    const progressNumbers = document.getElementById('numbers');

    const updateProgress = () =>{
        const totalTask = taskList.children.length;
        const completedTask = taskList.querySelectorAll('.checkbox:checked').length;
        if (progressNumbers){
            progressNumbers.textContent = `${completedTask} / ${totalTask}`;

        }
        //toggleEmptyState(); //Actualizar el edo del empty-image.
           
    };
    

    //Handles the function of adding a new task
    const newTask = (text = taskInput.value.trim(), completed = false) =>{
        const taskText = text;

        if(!taskText){ //checks if the task space is empty or invalid
            return; 
        }
        
        const li = document.createElement('li');
        //li.textContent = taskText;
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked':''}>
            <span class="task-info">${taskText}</span>
        <div class="task--buttons">
            <button class="edit-btn"><img src="asset/edit-ico.svg" alt="Icono editar"></button>
            <button class="delete-btn"><img src="asset/delete-ico.svg"alt="Icono borrar"></button>
        </div>
        `;
        const editBtn = li.querySelector('.edit-btn');
        const checkbox = li.querySelector('.checkbox');

        if (completed){
            li.classList.add('completed');
            if(editBtn){// Verifica si existe
                editBtn.disabled = true;
                editBtn.style.opacity='0,5';
                editBtn.style.pointerEvents = 'none';
            }
            
        }
        if (checkbox){// Verifica si existe
            checkbox.addEventListener('change', ()=>{
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            if(editBtn){
                editBtn.disabled=isChecked;
                editBtn.style.opacity = isChecked?'0.5':'1';
                editBtn.style.pointerEvents=isChecked?'none':'auto';
            }
            
            updateProgress();

            });

        }
        if (editBtn){// Verifica si existe
            editBtn.addEventListener('click',()=>{
                if(!checkbox.checked){
                    taskInput.value = li.querySelector('span').textContent;
                    li.remove();
                    updateProgress();
                }
            });

        }

        const deleteBtn = li.querySelector('.delete-btn');
        if(deleteBtn){ // Verifica si existe
            deleteBtn.addEventListener('click', () =>{
                li.remove();
                updateProgress();
            });
        }

        taskList.appendChild(li);
        taskInput.value=''; // Limpia el input después de añadir
        updateProgress();
    };

    //adds a clickevent to the btn
    addTaskBtn.addEventListener('click',(event)=> {
        event.preventDefault();
        newTask();

    });
    taskInput.addEventListener('keypress', (e)=>{
        if(e.key==='Enter'){
            newTask();
        }
    });
    //Llama a estas funciones al cargar para inicializar el estado
    //toggleEmptyState();
    updateProgress();
});
    