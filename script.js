import { renderDashboard } from "./src/scripts/dashboardBuilder.js";
import { renderConfig } from "./src/scripts/userConfigBuilder.js";
import { renderListCreate } from "./src/scripts/newListBuilder.js";
import { renderListEdit } from "./src/scripts/editListBuilder.js";
import { renderListExpanded } from "./src/scripts/listExpandedBuilder.js";
import { renderTaskCreate } from "./src/scripts/newTaskBuilder.js";
import { renderTaskEdit } from "./src/scripts/editTaskBuilder.js";
import { renderLogIn } from "./src/scripts/loginBuilder.js";
import { renderSignUp } from "./src/scripts/signInBuilder.js";
import { isLoggedIn } from "./src/auth/authService.js";

export const APP = document.getElementById("toDoApp");

window.navigate = (route, params = {}) => {
    
    APP.innerHTML = "";
    
    switch (route) {
        case "dashboard": renderDashboard(); break;
        case "user-config": renderConfig(); break;
        case "list-create": renderListCreate(); break;
        case "list-edit": renderListEdit(params); break;
        case "list-expanded": renderListExpanded(params); break;
        case "task-create": renderTaskCreate(params); break;
        case "task-edit": renderTaskEdit(params); break;
        case "login": renderLogIn(); break;
        case "sign-in": renderSignUp(); break;
        default: renderLogIn();
    }
};

function startApp(route = null, params = {}) {
    if (isLoggedIn()) {
        if (route) navigate(route, params);
        else navigate("dashboard");
    } else {
        navigate("login");
    }
}

startApp();