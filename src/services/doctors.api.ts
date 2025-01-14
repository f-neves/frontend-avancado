const API_URL = import.meta.env.VITE_API_URL;

export async function getMedicos() {
  const url = `${API_URL}/api/medicos`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar médicos: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível carregar os médicos.");
  }
}