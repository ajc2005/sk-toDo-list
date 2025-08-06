import { APP } from "../../script.js";
import { deleteTask, getTaskById, updateTask } from "../services/taskService.js";

export async function renderTaskEdit({ listId, taskId }) {
    APP.innerHTML = "";

    const { DATA: TASK_QUERY } = await getTaskById(taskId);

    const EDIT_TASK_TITLE_INPUT = document.createElement("input");
    EDIT_TASK_TITLE_INPUT.value = TASK_QUERY.title;

    const EDIT_TASK_CHECK = document.createElement("input");
    EDIT_TASK_CHECK.type = "checkbox";
    EDIT_TASK_CHECK.checked = TASK_QUERY.isCompleted;

    const UPDATE_TASK_BTN = document.createElement("button");
    UPDATE_TASK_BTN.textContent = "Save";
    UPDATE_TASK_BTN.onclick = async () => {
        await updateTask(taskId, {
            title: EDIT_TASK_TITLE_INPUT.value,
            isCompleted: EDIT_TASK_CHECK.checked,
            listId: listId
        });
        navigate("list-expanded", { listId });
    };

    const DELETE_TASK_BTN = document.createElement("button");
    DELETE_TASK_BTN.textContent = "Delete";
    DELETE_TASK_BTN.onclick = async () => {
        await deleteTask(taskId);
        navigate("list-expanded", { listId });
    };

    const UPDATE_TASK_CANCEL_BTN = document.createElement("button");
    UPDATE_TASK_CANCEL_BTN.onclick = () => navigate("list-expanded", { listId });
    UPDATE_TASK_CANCEL_BTN.textContent = "Cancel";

    const TITLE = document.createElement("h1");
    TITLE.textContent = "Edit task";

    APP.append(
        TITLE,
        EDIT_TASK_TITLE_INPUT,
        EDIT_TASK_CHECK,
        UPDATE_TASK_BTN,
        DELETE_TASK_BTN,
        UPDATE_TASK_CANCEL_BTN
    );
}