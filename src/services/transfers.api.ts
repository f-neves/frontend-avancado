const API_URL = import.meta.env.VITE_API_URL;

export async function getTransferencias() {
  const url = `${API_URL}/api/transferencias`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar transferências: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível carregar as transferências.");
  }
}