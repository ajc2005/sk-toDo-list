import { APP } from "../../script.js";
import { getCurrentUserId } from "../auth/authService.js";
import { getUserById, updateUser } from "../services/userService.js";

export async function renderConfig() {
    APP.innerHTML = "";

    const { DATA: USER } = await getUserById(getCurrentUserId());

    const SETTINGS_TITLE = document.createElement("h1");
    SETTINGS_TITLE.textContent = "Settings";

    const USERNAME_INPUT = document.createElement("input");
    USERNAME_INPUT.value = USER.userTag;

    const USERPASSWORD_INPUT = document.createElement("input");
    USERPASSWORD_INPUT.value = USER.userPassword;

    const UPDATE_USER_BTN = document.createElement("button");
    UPDATE_USER_BTN.textContent = "Save";
    UPDATE_USER_BTN.onclick = async () => {
        await updateUser(USER.id, {
            userTag: USERNAME_INPUT.value,
            userPassword: USERPASSWORD_INPUT.value
        });
        navigate("dashboard");
    };

    const UPDATE_USER_CANCEL_BTN = document.createElement("button");
    UPDATE_USER_CANCEL_BTN.onclick = () => navigate("dashboard");
    UPDATE_USER_CANCEL_BTN.textContent = "Cancel";

    APP.append(
        SETTINGS_TITLE,
        USERNAME_INPUT,
        USERPASSWORD_INPUT,
        UPDATE_USER_BTN,
        UPDATE_USER_CANCEL_BTN
    );
}