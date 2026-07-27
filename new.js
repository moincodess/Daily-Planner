let btn = document.querySelector("#addit");
const taskContainer = document.querySelector("#tasks");
const count = document.querySelector("#tasks-count");
const resetBtn = document.querySelector(".clear-btn");
const color = document.body.querySelector("#toggle");
let theme = localStorage.getItem("theme");

const allBtn = document.querySelector("#all");
const activeBtn = document.querySelector("#active");
const compBtn = document.querySelector("#comp");

document.body.classList.add(theme);

// All the tasks live here
let taskArr = JSON.parse(localStorage.getItem("tasks")) || [];


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

        const cb = task.querySelector('input[type="checkbox"]');

        cb.addEventListener("change", function () {

            taskObj.completed = cb.checked;

            localStorage.setItem("tasks", JSON.stringify(taskArr));
            renderTasks();
        });


        // ----Delete Button for each task--------


        const deleteBtn = task.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function () {

            taskArr.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(taskArr));

            renderTasks(); //to update the frontend whenever something is dlted

        });

        const tempArr = taskArr.filter(task => task.completed === false);
        count.textContent = tempArr.length;

    }
    )
};

renderTasks();  //called when the display refreshes


resetBtn.addEventListener("click", function () {

    taskArr = taskArr.filter(task => !task.completed)
    localStorage.setItem("tasks", JSON.stringify(taskArr));

    renderTasks(); //to update the frontend whenever something is dlted


});
color.addEventListener("click", function () {
    if (document.body.classList.contains("dark")) {

        document.body.classList.remove("dark");
        localStorage.removeItem("theme");

    }
    else {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
})




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
        id: count,
        text: input.value,
        completed: false
    };
    taskArr.push(taskObj);  // adds the values to the array;



    localStorage.setItem("tasks", JSON.stringify(taskArr));
    input.value = "";
    renderTasks();
});




