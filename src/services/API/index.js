import axios from "axios";
import { API_IDENTITY_SERVICE, API_MOCK_SERVICE } from "@env";

const instanceIdentity = axios.create({
    baseURL: `${API_IDENTITY_SERVICE}/api`,
});
const instanceMockService = axios.create({
    baseURL: `${API_MOCK_SERVICE}/give-some-data`,
});

const errorWrapper = async (request, notification = true) => {
    try {
        const { data } = await request;
        return data;
    } catch (error) {
        alert(error.message);
        return false;
    }
};

const setToken = (token = "") => {
    if (token) {
        return (instanceIdentity.defaults.headers.authorization = `Bearer ${token}`);
    }
    instanceIdentity.defaults.headers.authorization = "";
};

const register = async (value) => {
    const { data } = await instanceIdentity.post("/users/signup", value);
    if (data?.token) {
        setToken(data?.token);
    }
    return data;
};

const login = async (value) => {
    const { data } = await instanceIdentity.post("/users/login", value);
    if (data?.token) {
        setToken(data?.token);
    }
    return data;
};

const getCurrent = async (token) => {
    setToken(token);
    try {
        const { data } = await instanceIdentity.get("/users/current");
        setToken(data.token);
        return data;
    } catch (error) {
        setToken();
        throw error;
    }
};

const logout = async () => {
    try {
        await instanceIdentity.get("/users/logout");
        setToken("");
        return true;
    } catch (error) {
        throw error;
    }
};

const getWebSites = async () => {
    return errorWrapper(instanceMockService.get(`/websites`));
};

export const auth = { login, getCurrent, logout, register };
export const moc = { getWebSites };
