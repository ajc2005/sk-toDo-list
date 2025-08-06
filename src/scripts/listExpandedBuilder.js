import { APP } from "../../script.js";
import { getListById } from "../services/listService.js";

export async function renderListExpanded({ listId }) {
    APP.innerHTML = "";

    const { DATA: EXPANDED_LIST } = await getListById(listId);

    const LIST_PAGE_TITLE = document.createElement("h1");
    LIST_PAGE_TITLE.textContent = EXPANDED_LIST.title;

    const NEW_TASK_NAV_BTN = document.createElement("button");
    NEW_TASK_NAV_BTN.onclick = () => navigate("task-create", { listId });
    NEW_TASK_NAV_BTN.textContent = "Add task";

    const EDIT_LIST_NAV_BTN = document.createElement("button");
    EDIT_LIST_NAV_BTN.onclick = () => navigate("list-edit", { listId });
    EDIT_LIST_NAV_BTN.textContent = "Edit list";

    const TASK_UL = document.createElement("ul");
    (EXPANDED_LIST.tasks || []).forEach(task => {
        const TASK_LI = document.createElement("li");
        TASK_LI.onclick = () => navigate("task-edit", { listId, taskId: task.id });
        TASK_LI.textContent = task.title + (task.isCompleted ? "🟢" : "🔵");
        TASK_UL.appendChild(TASK_LI);
    });

    const BACK_TO_DASHBOARD_NAV_BTN = document.createElement("button");
    BACK_TO_DASHBOARD_NAV_BTN.onclick = () => navigate("dashboard");
    BACK_TO_DASHBOARD_NAV_BTN.textContent = "Back";

    APP.append(
        LIST_PAGE_TITLE,
        NEW_TASK_NAV_BTN,
        EDIT_LIST_NAV_BTN,
        TASK_UL,
        BACK_TO_DASHBOARD_NAV_BTN
    );
}