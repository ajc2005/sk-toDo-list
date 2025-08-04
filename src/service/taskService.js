const TASK_DB = "http://localhost:3000/task";

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

// Read [taskId]
export async function getTaskById(taskId) {
    const res = await fetch(`${TASK_DB}/${taskId}`);
    const data = await res.json();
    return data;
};

// Read [listId]
export async function getTaskByListId(listId) {
    const res = await fetch(`${TASK_DB}?listId=${listId}`);
    const data = await res.json();
    return data;
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