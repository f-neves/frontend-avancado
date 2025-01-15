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

// Busca uma transferência pelo ID
export async function getTransferenciaById(id: string) {
  const url = `${API_URL}/api/transferencias/${id}`;
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

// Cria um nova transferencia
export async function createTransferencia(transferData: Partial<any>) {
  const url = `${API_URL}/api/transferencias`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transferData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar transferência: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível criar a transferência.");
  }
}

// Atualiza uma transferência existente
export async function updateTransfer(id: string, transferData: Partial<any>) {
  const url = `${API_URL}/api/transferencias/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transferData),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar transferência: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível atualizar a transferência.");
  }
}


// Exclui uma transferência
export async function deleteTransfer(id: string) {
  const url = `${API_URL}/api/transferencias/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir transferência: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível excluir a transferência.");
  }
}