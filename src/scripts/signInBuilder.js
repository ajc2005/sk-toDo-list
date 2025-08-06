import { APP } from "../../script.js";
import { createUser } from "../services/userService.js";

export async function renderSignUp() {
    APP.innerHTML = "";

    const SIGN_UP_TITLE = document.createElement("h1");
    SIGN_UP_TITLE.textContent = "Sign Up";

    const NEW_USER_TAG_INPUT = document.createElement("input");
    NEW_USER_TAG_INPUT.placeholder = "Username";

    const NEW_USER_PASSWORD_INPUT = document.createElement("input");
    NEW_USER_PASSWORD_INPUT.placeholder = "Password";
    NEW_USER_PASSWORD_INPUT.type = "password";

    const CREATE_USER_BTN = document.createElement("button");
    CREATE_USER_BTN.textContent = "Create Account";
    CREATE_USER_BTN.onclick = async () => {
        if (!NEW_USER_TAG_INPUT.value || !NEW_USER_PASSWORD_INPUT.value) {
            alert("Please enter both USERNAME and PASSWORD");
            return;
        }
        try {
            await createUser({
                userTag: NEW_USER_TAG_INPUT.value,
                userPassword: NEW_USER_PASSWORD_INPUT.value
            });
            navigate("login");
        } catch (err) {
            alert(err.message);
        }
    };

    const SIGN_UP_CANCEL_BTN = document.createElement("button");
    SIGN_UP_CANCEL_BTN.onclick = () => navigate("login");
    SIGN_UP_CANCEL_BTN.textContent = "Cancel";

    APP.append(
        SIGN_UP_TITLE,
        NEW_USER_TAG_INPUT,
        NEW_USER_PASSWORD_INPUT,
        CREATE_USER_BTN,
        SIGN_UP_CANCEL_BTN
    );
}