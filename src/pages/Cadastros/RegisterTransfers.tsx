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
import { getMedicos } from "../../services/doctors.api";
import { getHospitais } from "../../services/hospitals.api";

const CadastroTransferencia = () => {
  const initialValues = {
    medicoOrigem: "",
    paciente: "",
    prioridade: "",
    justificativa: ""
  };
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [medicos, setMedicos] = useState<Patient[]>([]);
  const [hospitals, setHospitals] = useState<Patient[]>([]);

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

  useEffect(() => {
    const fetchDoctors= async () => {
      const dataMedicos = await getMedicos();
      setMedicos(dataMedicos);
    }
    fetchDoctors()
  }, [])

  useEffect(() => {
    const fetchHospitals= async () => {
      const dataHospitals = await getHospitais();
      setHospitals(dataHospitals);
    }
    fetchHospitals()
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
              <Field as="select" id="medicos" name="medicos" className="input">
                <option value="" disabled>
                  Selecione o médico de origem:
                </option>
                {medicos?.map((medicos) => (
                  <option key={medicos?.id} value={medicos?.id}>
                    {medicos?.nome}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="medicoOrigem" component="div" className="error-message" />

              <label htmlFor="paciente">Paciente:</label>
              <Field 
                as="select" 
                id="paciente" 
                name="paciente" 
                className="input"
                >
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

              <label htmlFor="origem">Hospital de Origem:</label>
              <Field 
                as="select" 
                id="destino" 
                name="destino" 
                className="input"
                >
                <option value="" disabled>
                  Selecione o paciente
                </option>
                {hospitals?.map((hospitals) => (
                  <option key={hospitals?.id} value={hospitals?.id}>
                    {hospitals?.nome}
                  </option>
                ))}
              </Field>

              <label htmlFor="destino">Hospital de Destino:</label>
              <Field 
                as="select" 
                id="origem" 
                name="origem" 
                className="input"
                >
                <option value="" disabled>
                  Selecione o paciente
                </option>
                {hospitals?.map((hospitals) => (
                  <option key={hospitals?.id} value={hospitals?.id}>
                    {hospitals?.nome}
                  </option>
                ))}
              </Field>

              <label htmlFor="classificacao">Classificação:</label>
              <Field 
                as="select"
                id="classificacao" 
                name="classificacao" 
                className="input"
              >
                <option value="" disabled>Selecione o nível da prioridade</option>
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </Field>
              <ErrorMessage name="prioridade" component="div" className="error-message" />

              <label htmlFor="procedimentosAcondicionamento">Procedimentos de Acondicionamento:</label>
              <Field
                type="text"
                id="procedimentosAcondicionamento"
                name="procedimentosAcondicionamento"
                className="input"
              />
              <ErrorMessage
                name="procedimentosAcondicionamento" component="div" className="error-message"
              />

              <label htmlFor="procedimentosUnidadeDestino">Procedimentos Unidade de Destino:</label>
              <Field
                type="text"
                id="procedimentosUnidadeDestino"
                name="procedimentosUnidadeDestino"
                className="input"
              />
              <ErrorMessage
                name="procedimentosUnidadeDestino" component="div" className="error-message"
              />

              <label htmlFor="distancia">Distância (km):</label>
              <Field 
                type="number" 
                id="distancia" 
                name="distancia" 
                className="input" />
              <ErrorMessage name="distancia" component="div" className="error-message" />

              <label htmlFor="meioTransporte">Meio de Transporte:</label>
              <Field 
                as="select"
                id="meioTransporte" 
                name="meioTransporte" 
                className="input"
              >
                <option value="" disabled>Selecione o meio de transporte</option>
                <option value="AMBULANCIA">Ambulância</option>
                <option value="HELICOPTERO">Helicóptero</option>
                <option value="OUTRO">Outro</option>
              </Field>

              <label htmlFor="status">Status da transferência:</label>
              <Field 
                as="select"
                id="status" 
                name="status" 
                className="input"
              >
                <option value="" disabled>Selecione o status</option>
                <option value="PENDENTE">Pedente</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDA">Concluída</option>
                <option value="CANCELADA">Cancelada</option>
              </Field>

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