const USER_DB = "http://localhost:3000/users";

/* CREATE */
export async function createUser( query ) {

    try {

        const RES = await fetch( USER_DB , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( query )
        });

        if (!RES.ok) throw new Error("Failed to create user!");

        const DATA = await RES.json();
        
        // Debug msg
        console.log("New User: " + DATA);

        return { status: "ok", DATA };

    } catch (err) {

        console.error("Error while creating user: " + err);

        return { status: "error", message: err.message };

    };
    
};

/* READ */
export async function getAllUsers() {
    
    try {

        const RES = await fetch( USER_DB );

        if (!RES.ok) throw new Error("Failed to read users!");

        const DATA = await RES.json();

        // Debug msg
        console.log("All created users: ", DATA);

        return { status: "ok", DATA };

    } catch (err) {

        console.error("Error while fetching users: " + err);

        return { status: "error", message: err.message };
    
    };

};

/* READ by ID */
export async function getUserById( userId ) {

    try {

        const RES = await fetch( `${USER_DB}/${userId}` );

        if (!RES.ok) throw new Error( `User with ID: ${userId} not found!`);

        const DATA = await RES.json();

        return { status: "ok", DATA };

    } catch (err) {

        console.error(`Error fetching user (ID: ${userId}): ` + err);

        return { status: "error", message: err.message };
    
    };

};

/* UPDATE */
export async function updateUser( userId, updateUserBody ) {
    
    try {

        const RES = await fetch( `${USER_DB}/${userId}` , {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( updateUserBody )
        });

        if (!RES.ok) throw new Error(`Failed to update user (ID: ${userId})`);

        const DATA = await RES.json();

        return { status: "ok", DATA };
    
    } catch (err) {

        console.error(`Error while updating user (ID: ${userId}): ` + err);

        return { status: "error", message: err.message };
    
    };

};

/* DELETE */
export async function deleteUser( userId ) {

    try {

        const RES = await fetch( `${USER_DB}/${userId}` , {
            method: "DELETE"
        });

        if (!RES.ok) throw new Error(`Failed to delete user! (ID: ${userId})`);
    
        return { status: "ok" };

    } catch (err) {

        console.error(`Error while deleting user (ID: ${userId}): ` + err);

        return { status: "error", message: err.message };

    };

};