import { createTask, getAllTasks, getTasksByListId, getTaskById, updateTask, deleteTask } from "../services/taskService.js";

global.fetch = jest.fn();

beforeEach(() => { fetch.mockClear(); });

describe("Task CRUD Service", () => {

    // CREATE
    it("When creating a task -> should return OK and DATA on success", async () => {
    
        const MOCK_INPUT = { title: "taskTitle", isCompleted: false, listId: "li01" };
        const MOCK_DATA = { ...MOCK_INPUT, id: "3df5" };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await createTask(MOCK_INPUT.data);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA).toMatchObject(MOCK_INPUT);
        expect(RESULT.DATA.id).toBeDefined();
        expect(typeof RESULT.DATA.id).toBe("string");

    });

    // READ ALL
    it("When fetching all tasks -> should return an array of all tasks", async () => {

        const MOCK_DATA = [
            { id: "id01", title: "testTask01", isCompleted: true,  listId: "li01" },
            { id: "id02", title: "testTask02", isCompleted: false, listId: "li01" },
            { id: "id03", title: "testTask03", isCompleted: false, listId: "li02" },
            { id: "id04", title: "testTask04", isCompleted: true,  listId: "li02" }
        ];

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await getAllTasks();

        expect(RESULT.status).toBe("ok");
        expect(Array.isArray(RESULT.DATA)).toBe(true);
        expect(RESULT.DATA).toHaveLength(4);
        expect(RESULT.DATA[0]).toHaveProperty("id");

    });

    // READ by LIST ID
    it("When fetching a list's tasks -> should return the specified list's tasks as array", async () => {
    
        const MOCK_LIST_ID = "3s4y";
        const MOCK_DATA = [
            { id: "id01", title: "testTask01", isCompleted: true,  listId: MOCK_LIST_ID },
            { id: "id02", title: "testTask02", isCompleted: false, listId: MOCK_LIST_ID },
            { id: "id03", title: "testTask03", isCompleted: false, listId: MOCK_LIST_ID }
        ];

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await getTasksByListId(MOCK_LIST_ID);

        expect(RESULT.status).toBe("ok");
        expect(Array.isArray(RESULT.DATA)).toBe(true);
        expect(RESULT.DATA).toHaveLength(3);
        expect(RESULT.DATA[0]).toHaveProperty("id");
        expect(RESULT.DATA[0]).toHaveProperty("listId", MOCK_LIST_ID);

    });

    // READ by ID
    it("When fetching a task -> should return the specified task", async () => {
    
        const MOCK_TASK_ID = "t45k";
        const MOCK_DATA = { id: MOCK_TASK_ID, title: "testTitle", isCompleted: false, listId: "li01" };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await getTaskById(MOCK_TASK_ID);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA.id).toBe(MOCK_TASK_ID);
        expect(RESULT.DATA).toMatchObject({ title: "testTitle", isCompleted: false, listId: "li01" });

    });

    // UPDATE
    it("When updating a task -> should return the updated task", async () => {
    
        const MOCK_TASK_ID = "t45k";
        const MOCK_UPDATE_INPUT = { title: "updatedTitle", isCompleted: true, listId: "li03" };
        const MOCK_RESPONSE = { id: MOCK_TASK_ID, ...MOCK_UPDATE_INPUT };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_RESPONSE });

        const RESULT = await updateTask(MOCK_TASK_ID, MOCK_UPDATE_INPUT);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA.id).toBe(MOCK_TASK_ID);
        expect(RESULT.DATA).toMatchObject(MOCK_UPDATE_INPUT);

    });

    // DELETE - Success
    it("When deleting a task -> should return OK on success", async () => {
    
            fetch.mockResolvedValueOnce({ ok: true });
    
            const RESULT = await deleteTask("ti01");
    
            expect(RESULT.status).toBe("ok");
    
        });
    
    // DELETE - Failure
    it("When deleting a task -> should return ERR on failure", async () => {
            
        fetch.mockResolvedValueOnce({ ok: false });
    
        const RESULT = await deleteTask("ti02");
    
        expect(RESULT.status).toBe("error");
        expect(RESULT.message).toMatch(/Failed to delete task/i);
            
      });

});