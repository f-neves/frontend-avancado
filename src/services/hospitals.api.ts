const API_URL = import.meta.env.VITE_API_URL;

export async function getHospitais() {
  const url = `${API_URL}/api/unidades-hospitalares`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar hospitais: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível carregar os hospitais.");
  }
}