const JSON_V1 = "http://localhost:3000/test-list-v1";

// CREATE
async function createTask(task) {

    const res = await fetch( JSON_V1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });

    const data = await res.json();
    
    // Debug msg
    console.log("Created task: ", data);

};

// READ ALL
async function getAllTasks() {
    
    const res = await fetch(JSON_V1);

    const data = await res.json();

    // Debug msg
    console.log("This list's tasks: ", data);
}

// READ (id)
async function getTaskById(id) {

    const res = await fetch(`${JSON_V1}/${id}`);

    const data = await res.json();

    // Debug msg
    console.log("Task: ", data);

}

// UPDATE
async function updateTask(id, updatingTask) {

    const res = await fetch(`${JSON_V1}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify(updatingTask)
    });

    const data = await res.json();

    // Debug msg
    console.log("Task updated: ", data);

}

// DELETE
async function deleteTask(id) {

    await fetch(`${JSON_V1}/${id}`, {
        method: "DELETE"
    });
    
    // Debug msg
    console.log(`Deleted task with id: ${id}`);

}