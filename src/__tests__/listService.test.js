import { createList, getAllLists, getListById, updateList, deleteList } from "../services/listService.js";

global.fetch = jest.fn();

beforeEach(() => { fetch.mockClear(); });

describe("List CRUD Service", () => {

    // CREATE
    it("When creating a list -> should return OK and DATA on success", async () => {
    
        const MOCK_INPUT = { title: "listTitle", userId: "ui01" };
        const MOCK_DATA = { ...MOCK_INPUT, id: "3df5" };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await createList(MOCK_INPUT.data);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA).toMatchObject(MOCK_INPUT);
        expect(RESULT.DATA.id).toBeDefined();
        expect(typeof RESULT.DATA.id).toBe("string");

    });

    // READ ALL
    it("When fetching all lists -> should return an array of all lists", async () => {

        const MOCK_DATA = [
            { id: "id01", title: "testTitle01", userId: "ui01" },
            { id: "id02", title: "testTitle02", userId: "ui01" },
            { id: "id03", title: "testTitle03", userId: "ui02" },
            { id: "id04", title: "testTitle04", userId: "ui02" }
        ];

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await getAllLists();

        expect(RESULT.status).toBe("ok");
        expect(Array.isArray(RESULT.DATA)).toBe(true);
        expect(RESULT.DATA).toHaveLength(4);
        expect(RESULT.DATA[0]).toHaveProperty("id");

    });

    // READ by ID
    it("When fetching a list -> should return the specified list", async () => {
    
        const MOCK_LIST_ID = "3s4y";
        const MOCK_DATA = { id: MOCK_LIST_ID, title: "testTitle", userId: "ui01" };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await getListById(MOCK_LIST_ID);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA.id).toBe(MOCK_LIST_ID);
        expect(RESULT.DATA).toMatchObject({ title: "testTitle", userId: "ui01" });

    });

    // UPDATE
    it("When updating a list -> should return the updated list", async () => {
    
        const MOCK_LIST_ID = "3s4y";
        const MOCK_UPDATE_INPUT = { title: "updatedTitle", userId: "ui03" };
        const MOCK_RESPONSE = { id: MOCK_LIST_ID, ...MOCK_UPDATE_INPUT };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_RESPONSE });

        const RESULT = await updateList(MOCK_LIST_ID, MOCK_UPDATE_INPUT);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA.id).toBe(MOCK_LIST_ID);
        expect(RESULT.DATA).toMatchObject(MOCK_UPDATE_INPUT);

    });

    // DELETE - Success
    it("When deleting a list -> should return OK on success", async () => {

        fetch.mockResolvedValueOnce({ ok: true });

        const RESULT = await deleteList("li01");

        expect(RESULT.status).toBe("ok");

    });

    // DELETE - Failure
    it("When deleting a list -> should return ERR on failure", async () => {
        
        fetch.mockResolvedValueOnce({ ok: false });

        const RESULT = await deleteList("li02");

        expect(RESULT.status).toBe("error");
        expect(RESULT.message).toMatch(/Failed to delete list/i);
        
  });

});
