import { getListById } from "../service/listService.js";
import { getTaskByListId } from "../service/taskService.js";

const PARAM = new URLSearchParams(window.location.search);
const LIST_ID = PARAM.get("listId");

const CONTAINER = document.getElementById("list-container");

if (!LIST_ID) { CONTAINER.innerHTML = "<p>List not found!</p>"; }

Promise.all([

    getListById(LIST_ID),
    getTaskByListId(LIST_ID)

]).then(([list, tasks]) => {

    const LIST_TASKS = tasks.map( task => `
        <div class="task" data-id="${task.id}">
            <p class="task-title">${task.title}</p>
        </div>
    `).join("");

    CONTAINER.innerHTML = `
        <div class="list" data-id="${list.id}">
            <h2 class="list-title">${list.title}</h2>
            <section class="list-tasks">${LIST_TASKS}</section>
        </div>
    `;

}).catch( err => {

    CONTAINER.innerHTML = "<p>Failed to load tasks!</p>";
    console.error("Error: ", err);

});

CONTAINER.addEventListener("click", (e) => {

    const TASK_HTML = e.target.closest(".task");
    if (!TASK_HTML) return;

    const TASK_ID = TASK_HTML.dataset.id;
    window.location.href = `../task/task.html?taskId=${TASK_ID}`;

});