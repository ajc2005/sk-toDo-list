import { APP } from "../../script.js";
import { createTask } from "../services/taskService.js";

export async function renderTaskCreate({ listId }) {
    APP.innerHTML = "";

    const TITLE = document.createElement("h1");
    TITLE.textContent = "New Task";

    const TASK_TITLE_INPUT = document.createElement("input");
    TASK_TITLE_INPUT.placeholder = "Task title";

    const CREATE_TASK_BTN = document.createElement("button");
    CREATE_TASK_BTN.textContent = "Create";
    CREATE_TASK_BTN.onclick = async () => {
        await createTask({
            title: TASK_TITLE_INPUT.value,
            isCompleted: false,
            listId: listId
        });
        navigate("list-expanded", { listId });
    };

    const CREATE_TASK_CANCEL_BTN = document.createElement("button");
    CREATE_TASK_CANCEL_BTN.onclick = () => navigate("list-expanded", { listId });
    CREATE_TASK_CANCEL_BTN.textContent = "Cancel";

    APP.append(
        TITLE,
        TASK_TITLE_INPUT,
        CREATE_TASK_BTN,
        CREATE_TASK_CANCEL_BTN
    );
}