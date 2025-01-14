import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

interface Patient {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: "MASCULINO" | "FEMININO";
}

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paciente, setPaciente] = useState<Patient | null>(null);

  useEffect(() => {
    // Aqui você faria a chamada à API para buscar os dados do paciente
    // Exemplo simulado:
    const fetchPaciente = async () => {
      try {
        // Substitua por sua chamada real à API
        const response = await fetch(`/api/pacientes/${id}`);
        const data = await response.json();
        setPaciente(data);
      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
        alert("Erro ao carregar dados do paciente");
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
      .required("CPF é obrigatório")
      .matches(/^\d{11}$/, "CPF deve conter 11 números"),
    dataNascimento: Yup.date()
      .required("Data de nascimento é obrigatória")
      .max(new Date(), "Data de nascimento não pode ser no futuro"),
    sexo: Yup.string()
      .required("Sexo é obrigatório")
      .oneOf(["MASCULINO", "FEMININO"], "Selecione um sexo válido")
  });

  const handleSubmit = async (values: Patient, { setSubmitting }: any) => {
    try {
      // Substitua por sua chamada real à API
      await fetch(`/api/pacientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      alert("Paciente atualizado com sucesso!");
      navigate("/pacientes");
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      alert("Erro ao atualizar paciente");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!paciente) {
    return <div>Paciente não encontrado</div>;
  }

  return (
    <div>
      <div className="header">
        Editar Paciente
      </div>
      <main>
        <Formik
          initialValues={{
            id: paciente.id,
            nome: paciente.nome,
            cpf: paciente.cpf,
            dataNascimento: paciente.dataNascimento,
            sexo: paciente.sexo
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
              <Field type="hidden" name="id" />

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
                className="input"
              >
                <option value="">Selecione o sexo</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
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