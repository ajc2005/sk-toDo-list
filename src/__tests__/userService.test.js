import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../services/userService.js";

global.fetch = jest.fn();

beforeEach(() => { fetch.mockClear(); });

describe("User CRUD Service", () => {

    // CREATE
    it("When creating a user -> should return OK and DATA on success", async () => {
    
        const MOCK_INPUT = { userTag: "user01", userPassword: "test123" };
        const MOCK_DATA = { ...MOCK_INPUT, id: "3df5" };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await createUser(MOCK_INPUT.data);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA).toMatchObject(MOCK_INPUT);
        expect(RESULT.DATA.id).toBeDefined();
        expect(typeof RESULT.DATA.id).toBe("string");

    });

    // READ ALL
    it("When fetching all users -> should return an array of all users", async () => {

        const MOCK_DATA = [
            { id: "id01", userTag: "user01", userPassword: "test123" },
            { id: "id02", userTag: "user02", userPassword: "test123" },
            { id: "id03", userTag: "user03", userPassword: "test123" }
        ];

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await getAllUsers();

        expect(RESULT.status).toBe("ok");
        expect(Array.isArray(RESULT.DATA)).toBe(true);
        expect(RESULT.DATA).toHaveLength(3);
        expect(RESULT.DATA[0]).toHaveProperty("id");

    });

    // READ by ID
    it("When fetching a user -> should return the specified user", async () => {
    
        const MOCK_USER_ID = "3s4y";
        const MOCK_DATA = { id: MOCK_USER_ID, userTag: "user01", userPassword: "test123" };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_DATA });

        const RESULT = await getUserById(MOCK_USER_ID);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA.id).toBe(MOCK_USER_ID);
        expect(RESULT.DATA).toMatchObject({ userTag: "user01", userPassword: "test123" });

    });

    // UPDATE
    it("When updating an user -> should return the updated user", async () => {
    
        const MOCK_USER_ID = "3s4y";
        const MOCK_UPDATE_INPUT = { userTag: "user05", userPassword: "test321" };
        const MOCK_RESPONSE = { id: MOCK_USER_ID, ...MOCK_UPDATE_INPUT };

        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_RESPONSE });

        const RESULT = await updateUser(MOCK_USER_ID, MOCK_UPDATE_INPUT);

        expect(RESULT.status).toBe("ok");
        expect(RESULT.DATA.id).toBe(MOCK_USER_ID);
        expect(RESULT.DATA).toMatchObject(MOCK_UPDATE_INPUT);

    });

    // DELETE - Success
    it("When deleting an user -> should return OK on success", async () => {

        fetch.mockResolvedValueOnce({ ok: true });

        const RESULT = await deleteUser("ui01");

        expect(RESULT.status).toBe("ok");

    });

    // DELETE - Failure
    it("When deleting an user -> should return ERR on failure", async () => {
        
        fetch.mockResolvedValueOnce({ ok: false });

        const RESULT = await deleteUser("ui02");

        expect(RESULT.status).toBe("error");
        expect(RESULT.message).toMatch(/Failed to delete user/i);
        
    });

});