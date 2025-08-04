const LIST_DB = "http://localhost:3000/list";

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
    return data;
};

// Read [id]
export async function getListById(id) {
    const res = await fetch(`${LIST_DB}/${id}`);
    const data = await res.json();
    return data;
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