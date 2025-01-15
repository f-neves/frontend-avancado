import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";
import { createTransferencia } from "../../services/transfers.api";
import { useEffect, useState } from "react";
import { getPacientes } from "../../services/patients.api";
import { Patient } from "../../types/patient.type";

const CadastroTransferencia = () => {
  const initialValues = {
    medicoOrigem: "",
    paciente: "",
    prioridade: "",
    justificativa: ""
  };
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Patient[]>([]);

  const validationSchema = Yup.object({
    origem: Yup.string().required("Origem é obrigatória"),
    destino: Yup.string().required("Destino é obrigatório"),
    classificacao: Yup.string().required("Classificação é obrigatória"),
    procedimentosAcondicionamento: Yup.string().required("Este campo é obrigatório"),
    procedimentosUnidadeDestino: Yup.string().required("Este campo é obrigatório"),
    distancia: Yup.number().required("Distância é obrigatória"),
    meioTransporte: Yup.string().required("Meio de transporte é obrigatório"),
    status: Yup.string().required("Status é obrigatório"),
    motivo: Yup.string(),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, resetForm }: any) => {
    try {
      await createTransferencia(values);
      alert("Solicitação de transferência cadastrada com sucesso!");
      resetForm(); 
      setSubmitting(false);
      navigate("/transferencias");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar transferência. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      const dataPacientes = await getPacientes();
      setPacientes(dataPacientes);
    }
    fetchPatients()
  }, [])
  

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
                id="origem" 
                name="origem.nome"
                className="input" 
                placeholder="Nome do médico de origem"
              />
              <ErrorMessage name="medicoOrigem" component="div" className="error-message" />

              <label htmlFor="paciente">Paciente:</label>
              <Field as="select" id="paciente" name="paciente" className="input">
                <option value="" disabled>
                  Selecione o paciente
                </option>
                {pacientes?.map((pacientes) => (
                  <option key={pacientes?.id} value={pacientes?.id}>
                    {pacientes?.nome}
                  </option>
                ))}
              </Field>
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