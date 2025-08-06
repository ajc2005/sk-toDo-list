const TASK_DB = "http://localhost:3000/tasks";

/* CREATE */
export async function createTask( query ) {

    try {

        const RES = await fetch( TASK_DB , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( query )
        });

        if (!RES.ok) throw new Error("Failed to create task!");

        const DATA = await RES.json();
        
        // Debug msg
        console.log("New Task: " + DATA);

        return { status: "ok", DATA };

    } catch (err) {

        console.error("Error while creating task: " + err);

        return { status: "error", message: err.message };

    };
    
};

/* READ */
export async function getAllTasks() {
    
    try {

        const RES = await fetch( TASK_DB );

        if (!RES.ok) throw new Error("Failed to read tasks!");

        const DATA = await RES.json();

        // Debug msg
        console.log("All available tasks: " + DATA);

        return { status: "ok", DATA };

    } catch (err) {

        console.error("Error while fetching tasks: " + err);

        return { status: "error", message: err.message };
    
    };

};

/* READ by LIST ID */
export async function getTasksByListId( listId ) {

    try {

        const RES = await fetch( `${TASK_DB}?listId=${listId}` );

        if (!RES.ok) throw new Error( `Tasks from list with ID: ${listId} not found!`);

        const DATA = await RES.json();

        return { status: "ok", DATA };

    } catch (err) {

        console.error(`Error fetching tasks from list (ID: ${listId}): ` + err);

        return { status: "error", message: err.message };
    
    };

};

/* READ by ID */
export async function getTaskById( taskId ) {

    try {

        const RES = await fetch( `${TASK_DB}/${taskId}` );

        if (!RES.ok) throw new Error( `Task with ID: ${taskId} not found!`);

        const DATA = await RES.json();

        return { status: "ok", DATA };

    } catch (err) {

        console.error(`Error fetching task (ID: ${taskId}): ` + err);

        return { status: "error", message: err.message };
    
    };

};

/* UPDATE */
export async function updateTask( taskId, updateTaskBody ) {
    
    try {

        const RES = await fetch( `${TASK_DB}/${taskId}` , {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( updateTaskBody )
        });

        if (!RES.ok) throw new Error(`Failed to update task (ID: ${taskId})`);

        const DATA = await RES.json();

        return { status: "ok", DATA };
    
    } catch (err) {

        console.error(`Error while updating task (ID: ${taskId}): ` + err);

        return { status: "error", message: err.message };
    
    };

};

/* DELETE */
export async function deleteTask( taskId ) {

    try {

        const RES = await fetch( `${TASK_DB}/${taskId}` , {
            method: "DELETE"
        });

        if (!RES.ok) throw new Error(`Failed to delete task! (ID: ${taskId})`);
    
        return { status: "ok" };

    } catch (err) {

        console.error(`Error while deleting task (ID: ${taskId}): ` + err);

        return { status: "error", message: err.message };

    };

};