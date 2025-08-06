import { APP } from "../../script.js";
import { login } from "../auth/authService.js";

export async function renderLogIn() {
    APP.innerHTML = "";

    const LOG_IN_TITLE = document.createElement("h1");
    LOG_IN_TITLE.textContent = "Log In";

    const USER_TAG_INPUT = document.createElement("input");
    USER_TAG_INPUT.placeholder = "Username";

    const USER_PASSWORD_INPUT = document.createElement("input");
    USER_PASSWORD_INPUT.placeholder = "Password";
    USER_PASSWORD_INPUT.type = "password";

    const LOG_IN_BTN = document.createElement("button");
    LOG_IN_BTN.textContent = "Log in";
    LOG_IN_BTN.onclick = async () => {
        try {
            login(USER_TAG_INPUT.value, USER_PASSWORD_INPUT.value);
            navigate("dashboard");
        } catch (err) {
            alert("Login invalid.");
        }
    };

    const SIGN_IN_BTN = document.createElement("button");
    SIGN_IN_BTN.textContent = "Sign in";
    SIGN_IN_BTN.onclick = () => navigate("sign-in");

    APP.append(
        LOG_IN_TITLE,
        USER_TAG_INPUT,
        USER_PASSWORD_INPUT,
        LOG_IN_BTN,
        SIGN_IN_BTN
    );
}