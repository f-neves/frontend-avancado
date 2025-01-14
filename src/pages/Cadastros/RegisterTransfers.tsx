import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";

const CadastroTransferencia = () => {
  const initialValues = {
    medicoOrigem: "",
    paciente: "",
    prioridade: "",
    justificativa: ""
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    medicoOrigem: Yup.string()
      .required("Médico de origem é obrigatório"),
    paciente: Yup.string()
      .required("Paciente é obrigatório"),
    prioridade: Yup.string()
      .oneOf(["BAIXA", "MEDIA", "ALTA"], "Selecione uma prioridade válida")
      .required("Prioridade é obrigatória"),
    justificativa: Yup.string()
      .required("Justificativa é obrigatória")
      .min(10, "A justificativa deve ter pelo menos 10 caracteres")
  });

  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    console.log(values);
    alert("Solicitação de transferência cadastrada com sucesso!");
    setSubmitting(false);
    navigate("/transferencias");
  };

  return (
    <div>
      <div className="header">
        Solicitação de Nova Transferência
      </div>
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
              <label htmlFor="medicoOrigem">Médico de Origem:</label>
              <Field
                type="text"
                id="medicoOrigem"
                name="medicoOrigem"
                className="input"
                placeholder="Nome do médico de origem"
              />
              <ErrorMessage name="medicoOrigem" component="div" className="error-message" />

              <label htmlFor="paciente">Paciente:</label>
              <Field
                type="text"
                id="paciente"
                name="paciente"
                className="input"
                placeholder="Nome do paciente"
              />
              <ErrorMessage name="paciente" component="div" className="error-message" />

              <label htmlFor="prioridade">Prioridade:</label>
              <Field
                as="select"
                id="prioridade"
                name="prioridade"
                className="input"
              >
                <option value="" disabled>Selecione o nível da prioridade</option>
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </Field>
              <ErrorMessage name="prioridade" component="div" className="error-message" />

              <label htmlFor="justificativa">Justificativa:</label>
              <Field
                as="textarea"
                id="justificativa"
                name="justificativa"
                className="input"
                placeholder="Digite a justificativa da transferência"
              />
              <ErrorMessage name="justificativa" component="div" className="error-message" />

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

export default CadastroTransferencia;