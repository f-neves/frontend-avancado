import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPacienteById, updatePaciente, deletePaciente } from "../../services/patients.api";
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";
import { Patient } from "../../types/patient.type";

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paciente, setPaciente] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const data = await getPacienteById(id as string);
        setPaciente(data);
      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
        alert("Erro ao carregar dados do paciente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  const validationSchema = Yup.object({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    cpf: Yup.string()
      .required("CPF é obrigatório"),
    dataNascimento: Yup.date()
      .required("Data de nascimento é obrigatória")
      .max(new Date(), "Data de nascimento não pode ser no futuro"),
    sexo: Yup.string()
      .required("Sexo é obrigatório")
  });

  const handleSubmit = async (values: Patient, { setSubmitting }: any) => {
    try {
      await updatePaciente(id as string, values);
      alert("Paciente atualizado com sucesso!");
      navigate("/pacientes");
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      alert("Erro ao atualizar paciente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Você tem certeza que deseja excluir este paciente?")) {
      try {
        await deletePaciente(id as string);
        alert("Paciente excluído com sucesso!");
        navigate("/pacientes");
      } catch (error) {
        console.error("Erro ao excluir paciente:", error);
        alert("Erro ao excluir paciente.");
      }
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!paciente) {
    return <div>Paciente não encontrado.</div>;
  }

  return (
    <div>
      <div className="header">Editar Paciente</div>
      <main>
        <Formik
          initialValues={{
            id: paciente.id,
            nome: paciente.nome,
            cpf: paciente.cpf.replace(/\D/g, ""),
            dataNascimento: paciente.dataNascimento,
            sexo: paciente.sexo,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
              <label htmlFor="nome">Nome:</label>
              <Field
                type="text"
                id="nome"
                name="nome"
                className="input"
                placeholder="Nome do paciente"
              />
              <ErrorMessage name="nome" component="div" className="error-message" />

              <label htmlFor="cpf">CPF:</label>
              <Field
                type="text"
                id="cpf"
                name="cpf"
                className="input"
                placeholder="Digite apenas números"
              />
              <ErrorMessage name="cpf" component="div" className="error-message" />

              <label htmlFor="dataNascimento">Data de Nascimento:</label>
              <Field
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                className="input"
              />
              <ErrorMessage name="dataNascimento" component="div" className="error-message" />

              <label htmlFor="sexo">Sexo:</label>
              <Field 
                as="select" 
                id="sexo" 
                name="sexo" 
                className="input">
                  <option value="">Selecione o sexo</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                  <option value="OUTRO">Outro</option>
              </Field>
              <ErrorMessage name="sexo" component="div" className="error-message" />

              <div className="button-group">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/pacientes")}
                  className="cancel-button"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="delete-button"
                >
                  Excluir Paciente
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default EditarPaciente;
