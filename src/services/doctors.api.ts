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


// Busca um paciente pelo ID
export async function getMedicoById(id: string) {
  const url = `${API_URL}/api/medicos/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar paciente: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível carregar o paciente.");
  }
}

// Cria um novo médico
export async function createMedicos(medicoData: any) {
  const url = `${API_URL}/api/medicos`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicoData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar médico: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível criar o médico.");
  }
}


// Atualiza um médico existente
export async function updateMedico(id: string, medicoData: Partial<any>) {
  const url = `${API_URL}/api/medicos/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicoData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar médico: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível atualizar o médico.");
  }
}

// Exclui um médico
export async function deleteMedico(id: string) {
  const url = `${API_URL}/api/medicos/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir médico: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível excluir o médico.");
  }
}