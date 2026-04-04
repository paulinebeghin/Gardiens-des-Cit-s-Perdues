const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getCharacters = async () => {
    const response = await fetch(`${API_URL}/characters`, {
        credentials: "include"
    });
    return response.json();
};