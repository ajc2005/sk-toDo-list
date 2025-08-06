import { APP } from "../../script.js";
import { getCurrentUserId } from "../auth/authService.js";
import { getUserById } from "../services/userService.js";
import { deleteList, getListById, updateList } from "../services/listService.js";

export async function renderListEdit({ listId }) {
    APP.innerHTML = "";

    const { DATA: LIST_QUERY } = await getListById(listId);

    const LIST_EDIT_PAGE_TITLE = document.createElement("h1");
    LIST_EDIT_PAGE_TITLE.textContent = "Edit List";

    const LIST_EDIT_TITLE_INPUT = document.createElement("input");
    LIST_EDIT_TITLE_INPUT.value = LIST_QUERY.title;

    const UPDATE_LIST_BTN = document.createElement("button");
    UPDATE_LIST_BTN.textContent = "Save";
    UPDATE_LIST_BTN.onclick = async () => {
        const { DATA: USER } = await getUserById(getCurrentUserId());
        await updateList(listId, {
            title: LIST_EDIT_TITLE_INPUT.value,
            userId: USER.id
        });
        navigate("dashboard");
    };

    const DELETE_LIST_BTN = document.createElement("button");
    DELETE_LIST_BTN.textContent = "Delete";
    DELETE_LIST_BTN.onclick = async () => {
        await deleteList(listId);
        navigate("dashboard");
    };

    const LIST_EDIT_CANCEL_BTN = document.createElement("button");
    LIST_EDIT_CANCEL_BTN.onclick = () => navigate("dashboard");
    LIST_EDIT_CANCEL_BTN.textContent = "Cancel";

    APP.append(
        LIST_EDIT_PAGE_TITLE,
        LIST_EDIT_TITLE_INPUT,
        UPDATE_LIST_BTN,
        DELETE_LIST_BTN,
        LIST_EDIT_CANCEL_BTN
    );
}