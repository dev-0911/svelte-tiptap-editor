const apiAuth = "https://steam.buntod.com/api/auth/token";
const apiAi = "https://steam.buntod.com/api/auth/tiptap-open-ai-token";
const apiCollabApp = "https://steam.buntod.com/api/auth/tiptap-collab-app-token";
const apiCollabApi = "https://steam.buntod.com/api/auth/tiptap-collab-api-token";

const apiConvert = "https://steam.buntod.com/api/auth/tiptap-convert-token";

export const getAuthToken = async (username: string, password: string) => {
    let loading = true; // Set loading state
    let error = null; // Reset error state
    let data = null; // Reset data state
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const response = await fetch(apiAuth, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
    } catch (err) {
        error = err.message;
        console.log("error", error);
    } finally {
        loading = false; // Reset loading state
        return data;
    }
};

export const getTiptapOpenAiToken = async (username: string, password: string) => {
    let loading = true; // Set loading state
    let error = null; // Reset error state
    let data = null; // Reset data state
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const response = await fetch(apiAi, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
    } catch (err) {
        error = err.message;
        console.log("error", error);
    } finally {
        loading = false; // Reset loading state
        return data;
    }
};

export const getTiptapCollabAppToken = async (username: string, password: string) => {
    let loading = true; // Set loading state
    let error = null; // Reset error state
    let data = null; // Reset data state
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const response = await fetch(apiCollabApp, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
    } catch (err) {
        error = err.message;
        console.log("error", error);
    } finally {
        loading = false; // Reset loading state
        return data;
    }
};

export const getTiptapCollabApiToken = async (username: string, password: string) => {
    let loading = true; // Set loading state
    let error = null; // Reset error state
    let data = null; // Reset data state
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const response = await fetch(apiCollabApi, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
    } catch (err) {
        error = err.message;
        console.log("error", error);
    } finally {
        loading = false; // Reset loading state
        return data;
    }
};

export const getTiptapConvertToken = async (username: string, password: string) => {
    let loading = true; // Set loading state
    let error = null; // Reset error state
    let data = null; // Reset data state
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const response = await fetch(apiConvert, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
    } catch (err) {
        error = err.message;
        console.log("error", error);
    } finally {
        loading = false; // Reset loading state
        return data;
    }
};
