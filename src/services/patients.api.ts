const API_URL = import.meta.env.VITE_API_URL;

// Busca todos os pacientes
export async function getPacientes() {
  const url = `${API_URL}/api/pacientes`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar pacientes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível carregar os pacientes.");
  }
}

// Cria um novo paciente
export async function createPaciente(pacienteData: any) {
  const url = `${API_URL}/api/pacientes`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pacienteData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar paciente: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível criar o paciente.");
  }
}

// Edita um paciente existente
export async function updatePaciente(id: string, pacienteData: Partial<any>) {
  const url = `${API_URL}/api/pacientes/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pacienteData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar paciente: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível atualizar o paciente.");
  }
}

// Exclui um paciente
export async function deletePaciente(id: string) {
  const url = `${API_URL}/api/pacientes/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir paciente: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível excluir o paciente.");
  }
}
