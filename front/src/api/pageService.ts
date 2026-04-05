const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const pageService = {
  // Pour la liste du Dashboard
  getAll: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erreur lors de la récupération");
    return response.json();
  },

  // Pour la création (Dashboard)
  create: async (data: any) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur lors de la création");
    return response.json();
  },
    updateBySlug: async (slug: string, updates: any) => {
        const response = await fetch(`http://localhost:3000/characters/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error("Erreur lors de la modification");
        return response.json();
    },
  // Pour la suppression (Dashboard)
  delete: async (slug: string) => {
    const response = await fetch(`${API_URL}/${slug}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression");
  }
};