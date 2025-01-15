import { dataPatient, Patient } from "../types/patient.type";

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

// Busca um paciente pelo ID
export async function getPacienteById(id: string) {
  const url = `${API_URL}/api/pacientes/${id}`;
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

// Cria um novo paciente
export async function createPaciente(pacienteData: dataPatient) {
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
export async function updatePaciente(id: string, pacienteData: Patient) {
  delete pacienteData.id;
  console.log("pacienteData - updatePaciente", pacienteData);
  const url = `${API_URL}/api/pacientes/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pacienteData),
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Captura detalhes do erro, se existirem
      console.error("Erro no backend:", errorDetails);
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
