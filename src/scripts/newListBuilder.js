import { APP } from "../../script.js";
import { getCurrentUserId } from "../auth/authService.js";
import { getUserById } from "../services/userService.js";
import { createList } from "../services/listService.js";

export async function renderListCreate() {
    APP.innerHTML = "";

    const NEW_LIST_PAGE_TITLE = document.createElement("h1");
    NEW_LIST_PAGE_TITLE.textContent = "Create List";

    const NEW_LIST_TITLE_INPUT = document.createElement("input");
    NEW_LIST_TITLE_INPUT.placeholder = "List name";

    const CREATE_NEW_LIST_BTN = document.createElement("button");
    CREATE_NEW_LIST_BTN.textContent = "Create";
    CREATE_NEW_LIST_BTN.onclick = async () => {
        const { DATA: USER } = await getUserById(getCurrentUserId());
        await createList({
            title: NEW_LIST_TITLE_INPUT.value,
            userId: USER.id
        });
        navigate("dashboard");
    };

    const CREATE_NEW_LIST_CANCEL_BTN = document.createElement("button");
    CREATE_NEW_LIST_CANCEL_BTN.onclick = () => navigate("dashboard");
    CREATE_NEW_LIST_CANCEL_BTN.textContent = "Cancel";

    APP.append(
        NEW_LIST_PAGE_TITLE,
        NEW_LIST_TITLE_INPUT,
        CREATE_NEW_LIST_BTN,
        CREATE_NEW_LIST_CANCEL_BTN
    );
}