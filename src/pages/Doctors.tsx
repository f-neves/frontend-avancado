import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/index.css"
import "../../css/main.css"
import "../../css/paginas.css"

const Medicos = () => {
const navigate = useNavigate();
const handleCadastrarMedico = () => {
  navigate("/cadastro-medicos");
};

  const [medicos, setMedicos] = React.useState([
  { nome: "Dr. João", crm: "12345", especialidade: "Cardiologia", papel: "Chefe" },
  { nome: "Dra. Maria", crm: "67890", especialidade: "Pediatria", papel: "Assistente" },
]);


  return (
    <div>
      <div className="header">
        Médicos Cadastrados
      </div>
      <main>
        <section>
          <table className="medicos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CRM</th>
                <th>Especialidade</th>
                <th>Papel</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="medicoTableBody">
              {medicos.map((medico, index) => (
              <tr key={index}>
                <td>{medico.nome}</td>
                <td>{medico.crm}</td>
                <td>{medico.especialidade}</td>
                <td>{medico.papel}</td>
                <td>{/* Ações */}</td>
              </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleCadastrarMedico}
            className="add-medico-button"
          >
            Cadastrar Novo Médico
          </button>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Medicos;
