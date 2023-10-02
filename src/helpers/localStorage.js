const TOKEN_KEY = "token";

export const setJWTTokenInLocalStorage = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getJWTTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN_KEY) || "";
};

export const clearJWTTokenInLocalStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
};