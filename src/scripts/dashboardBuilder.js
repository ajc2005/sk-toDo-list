import { APP } from "../../script.js";
import { getCurrentUserId } from "../auth/authService.js";
import { getUserById } from "../services/userService.js";
import { getAllLists } from "../services/listService.js";

export async function renderDashboard() {

    APP.innerHTML = "";

    const USER = (await getUserById(getCurrentUserId())).DATA;
    const ALL_LISTS = (await getAllLists()).DATA;

    const CUSTOM_MSG = document.createElement("h1");
    CUSTOM_MSG.textContent = `Welcome, ${USER.userTag}`;

    const NEW_LIST_NAV_BTN = document.createElement("button");
    NEW_LIST_NAV_BTN.onclick = () => navigate("list-create");
    NEW_LIST_NAV_BTN.textContent = "Add new List";

    const USER_CONFIG = document.createElement("button");
    USER_CONFIG.onclick = () => navigate("user-config");
    USER_CONFIG.textContent = "User Settings";

    const LIST_UL = document.createElement("ul");
    ALL_LISTS.forEach(list => {
        const LIST_LI = document.createElement("li");
        LIST_LI.onclick = () => navigate("list-expanded", { listId: list.id });
        LIST_LI.textContent = list.title;
        LIST_UL.appendChild(LIST_LI);
    });

    APP.append(CUSTOM_MSG, NEW_LIST_NAV_BTN, USER_CONFIG, LIST_UL);
    
}