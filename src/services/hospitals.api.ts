const API_URL = import.meta.env.VITE_API_URL;

// Obtém todos os hospitais
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

// Busca uma unidade hospitalar pelo ID
export async function getHospitalById(id: string) {
  const url = `${API_URL}/api/unidades-hospitalares/${id}`;
  try {
    const response = await fetch(url);
    console.log("response", response);
    if (!response.ok) {
      throw new Error(`Erro ao buscar hospitais: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível carregar o hospital.");
  }
}

// Cria um novo hospitais
export async function createHospital(hospitaisData: any) {
  const url = `${API_URL}/api/unidades-hospitalares`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospitaisData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar hospitais: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível criar o hospitais.");
  }
}

// Atualiza um hospitais existente
export async function updateHospital(id: string, hospitaisData: Partial<any>) {
  const url = `${API_URL}/api/unidades-hospitalares/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospitaisData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar hospitais: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível atualizar o hospitais.");
  }
}

// Exclui um hospitais
export async function deleteHospital(id: string) {
  const url = `${API_URL}/api/unidades-hospitalares/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir hospitais: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível excluir o hospitais.");
  }
}
