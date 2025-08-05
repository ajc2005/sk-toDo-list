const LIST_DB = "http://localhost:3000/lists";

/* CREATE */
export async function createList( query ) {

    try {

        const RES = await fetch( LIST_DB , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( query )
        });

        if (!RES.ok) throw new Error("Failed to create list!");

        const DATA = await RES.json();
        
        // Debug msg
        console.log("New List: " + DATA);

        return { status: "ok", DATA };

    } catch (err) {

        console.error("Error while creating list: " + err);

        return { status: "error", message: err.message };

    };
    
};

/* READ */
export async function getAllLists() {
    
    try {

        const RES = await fetch( LIST_DB );

        if (!RES.ok) throw new Error("Failed to read lists!");

        const DATA = await RES.json();

        // Debug msg
        console.log("All available lists: " + DATA);

        return { status: "ok", DATA };

    } catch (err) {

        console.error("Error while fetching lists: " + err);

        return { status: "error", message: err.message };
    
    };

};

/* READ by ID */
export async function getListById( listId ) {

    try {

        const RES = await fetch( `${LIST_DB}/${listId}` );

        if (!RES.ok) throw new Error( `List with ID: ${listId} not found!`);

        const DATA = await RES.json();

        return { status: "ok", DATA };

    } catch (err) {

        console.error(`Error fetching list (ID: ${listId}): ` + err);

        return { status: "error", message: err.message };
    
    };

};

/* UPDATE */
export async function updateList( listId, updateListBody ) {
    
    try {

        const RES = await fetch( `${LIST_DB}/${listId}` , {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( updateListBody )
        });

        if (!RES.ok) throw new Error(`Failed to update list (ID: ${listId})`);

        const DATA = await RES.json();

        return { status: "ok", DATA };
    
    } catch (err) {

        console.error(`Error while updating list (ID: ${listId}): ` + err);

        return { status: "error", message: err.message };
    
    };

};

/* DELETE */
export async function deleteList( listId ) {

    try {

        const RES = await fetch( `${LIST_DB}/${listId}` , {
            method: "DELETE"
        });

        if (!RES.ok) throw new Error(`Failed to delete list! (ID: ${listId})`);
    
        return { status: "ok" };

    } catch (err) {

        console.error(`Error while deleting list (ID: ${listId}): ` + err);

        return { status: "error", message: err.message };

    };

};