import { getAllUsers } from "../services/userService.js";

export async function login(userTag, userPassword) {
    
    const USER = await (await getAllUsers()).DATA.find(user => user.userTag === userTag);

    if (!USER) { throw new Error("User not found!"); }

    const VALID = (userPassword === USER.userPassword);

    if (!VALID) throw new Error("Incorrect password!");

    localStorage.setItem("activeUserId", JSON.stringify(USER.id));

    return true;
}

export function logout() {
    localStorage.removeItem("activeUserId");
}

export function getCurrentUserId() {
    return JSON.parse(localStorage.getItem("activeUserId"));
}

export function isLoggedIn() {
    return !!getCurrentUserId();
}