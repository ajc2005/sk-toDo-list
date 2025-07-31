const API_DB = "http://localhost:3000/api";
const LIST_DB = `${API_DB}/lists`;
const TASK_DB = `${API_DB}/tasks`;

/* LISTS */

// Create
export async function createList(query) {
    const res = await fetch( LIST_DB, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
    });
    const data = await res.json();
};

// Read
export async function getAllLists() {
    const res = await fetch(LIST_DB);
    const data = await res.json();
};

// Read [id]
export async function getListById(id) {
    const res = await fetch(`${LIST_DB}/${id}`);
    const data = await res.json();
};

// Update list
export async function updateList(id, updatingList) {
    const res = await fetch(`${LIST_DB}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify(updatingList)
    });
    const data = await res.json();
};

// Delete list
export async function deleteList(id) {
    await fetch(`${LIST_DB}/${id}`, {
        method: "DELETE"
    });
};

/* TASKS */

// Create
export async function createTask(query) {
    const res = await fetch( TASK_DB, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
    });
    const data = await res.json();
};

// Read
export async function getAllTasks() {
    const res = await fetch(TASK_DB);
    const data = await res.json();
};

// Read [id]
export async function getTaskById(id) {
    const res = await fetch(`${TASK_DB}/${id}`);
    const data = await res.json();
};

// Update list
export async function updateTask(id, updatingTask) {
    const res = await fetch(`${TASK_DB}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify(updatingTask)
    });
    const data = await res.json();
};

// Delete list
export async function deleteList(id) {
    await fetch(`${TASK_DB}/${id}`, {
        method: "DELETE"
    });
};