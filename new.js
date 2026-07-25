let btn = document.querySelector("#addit");
let input = document.querySelector("#input");
const taskContainer = document.querySelector("#tasks");
const count = document.querySelector("#tasks-count");
const resetBtn = document.querySelector("#reset");


const taskObj = {
    text: input.value,
    completed: false
};

// All the tasks live here
const taskArr = JSON.parse(localStorage.getItem("tasks")) || [];



function renderTasks() {
    taskContainer.innerHTML = "";

    taskArr.forEach((taskObj, index) => {

        // ----------html part---------

        const task = document.createElement("div");
        task.classList.add("tasks-box");

        task.innerHTML = `
            <div class="left">
                <input type="checkbox" ${taskObj.completed ? "checked" : ""}>
                <span>${taskObj.text}</span>
            </div>      
        
            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button> `;

        taskContainer.appendChild(task);

        // ----Delete Button for each task--------


        const deleteBtn = task.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function () {

            taskArr.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(taskArr));

            renderTasks(); //to update the frontend whenever something is dlted

        });
        count.textContent=`${taskArr.length}`;
    }
    )
};

renderTasks();  //called when the display refreshes


btn.addEventListener("click", function (dets) {

    dets.preventDefault();
    let warn = document.querySelector(".warn");

    if (input.value.trim() === "") { //to check if the field isn't empty
        warn.style.display = "block";
        return;
    }
    else {
        warn.style.display = "none";
    }

    const taskObj = {
        text: input.value,
        completed: false
    };
    taskArr.push(taskObj);  // adds the values to the array;



    localStorage.setItem("tasks", JSON.stringify(taskArr));
    input.value = "";
    renderTasks();
});

checkbox.addEventListener("change", function () {
 taskObj.completed = checkbox.checked;
    
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    renderTasks();
});






