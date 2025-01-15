import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createPaciente } from "../../services/patients.api"; // Ajuste o caminho se necessário
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";

const CadastroPacientes = () => {
  const initialValues = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    sexo: "",
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    cpf: Yup.string()
      .required("CPF é obrigatório"),
    dataNascimento: Yup.date()
      .required("Data de nascimento é obrigatória")
      .max(new Date(), "A data de nascimento não pode ser futura"),
    sexo: Yup.string().required("Sexo é obrigatório"),
  });

  const handleSubmit = async (
    values: typeof initialValues, { setSubmitting, resetForm }:FormikHelpers<typeof initialValues>) => {
    try {
      // Chamar a API para criar o paciente
      await createPaciente(values);
      console.log("values", values)

      alert("Paciente cadastrado com sucesso!");
      resetForm(); // Limpa o formulário após o cadastro
      navigate("/pacientes"); // Redireciona para a página de listagem
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o paciente. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="header">Cadastro de Pacientes</div>
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="register-form" id="formCadastroPaciente">
              <label htmlFor="nome">Nome:</label>
              <Field
                type="text"
                id="nome"
                name="nome"
                className="input"
                placeholder="Nome do Paciente"
              />
              <ErrorMessage name="nome" component="div" className="error-message" />

              <label htmlFor="cpf">CPF:</label>
              <Field
                type="text"
                id="cpf"
                name="cpf"
                className="input"
                placeholder="CPF do Paciente"
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
              <Field as="select" id="sexo" name="sexo" className="input">
                <option value="" disabled>
                  Selecione o sexo
                </option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
              </Field>
              <ErrorMessage name="sexo" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
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

export default CadastroPacientes;
