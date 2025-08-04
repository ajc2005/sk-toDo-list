import { getAllLists } from "../service/listService.js";
import { getTaskByListId } from "../service/taskService.js";

const CONTAINER = document.getElementById("allList-container");

getAllLists().then( async (lists) => {

    const LIST_BUILDER = await Promise.all(
        
        lists.map( async (list) => {

            const LIST_TASKS = await getTaskByListId(list.id);
            
            const TASK_PREV = LIST_TASKS.map( task => {

                return `
                <div class="task-prev" data-id="${task.id}">
                    <p class="task-prev-title">${task.title}</p>
                </div>
                `;

            }).join("");

        return `
        <div class="list" data-id="${list.id}">
            <h2 class="list-title">${list.title}</h2>
            <section class="tasksPrev-container">${TASK_PREV}</section>
        </div>
        `;

    }));

    CONTAINER.innerHTML = LIST_BUILDER.join("");

}).catch( err => {

    CONTAINER.innerHTML = "<p>Failed to load posts!</p>";
    console.error("Error: ", err);

});

CONTAINER.addEventListener("click", (e) => {

    const LIST_HTML = e.target.closest(".list");
    if (!LIST_HTML) return;

    const LIST_ID = LIST_HTML.dataset.id;
    window.location.href = `../list/list.html?listId=${LIST_ID}`;

});