import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getTransferenciaById, updateTransfer, deleteTransfer } from "../../services/transfers.api";
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";
import { Transfer } from "../../types/transfers.type";
import { getPacienteById } from "../../services/patients.api";

const EditarTransferencia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [transferencia, setTransferencia] = useState<Transfer | null>(null);

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

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const dataTransferencia = await getTransferenciaById(id as string);
        const dataPaciente = await getPacienteById(dataTransferencia.solicitacao.pacienteId as string);
        console.log("dataPaciente",dataPaciente);
        const data ={
          ...dataTransferencia,
          dataPaciente
        }
        setTransferencia(data);
      } catch (error) {
        console.error("Erro ao buscar dados da transferência:", error);
        alert("Erro ao carregar dados da transferência.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransfer();
  }, [id]);

  const handleSubmit = async (
    values: Transfer, 
    { setSubmitting }: FormikHelpers<Transfer>) => {
    try {
      await updateTransfer(id as string, values);
      alert("Transferência atualizada com sucesso!");
      navigate("/transferencias");
    } catch (error) {
      console.error("Erro ao atualizar transferência:", error);
      // alert("Erro ao atualizar transferência.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Você tem certeza que deseja excluir esta transferência?")) {
      try {
        await deleteTransfer(id as string);
        alert("Transferência excluída com sucesso!");
        navigate("/transferencias");
      } catch (error) {
        console.error("Erro ao excluir transferência:", error);
        alert("Erro ao excluir transferência.");
      }
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!transferencia) {
    return <div>Transferência não encontrada.</div>;
  }

  return (
    <div>
      <div className="header">Editar Transferência</div>
      <main>
        <Formik
          initialValues={transferencia}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
            <label htmlFor="paciente">Paciente:</label>
              <Field
                type="text"
                id="paciente"
                name="dataPaciente.nome"
                className="input"
              />
              <ErrorMessage name="paciente" component="div" className="error-message" />

              <label htmlFor="origem">Hospital de Origem:</label>
              <Field 
                type="text" 
                id="origem" 
                name="origem.nome"
                className="input" 
              />

              <label htmlFor="destino">Hospital de Destino:</label>
              <Field 
                type="text" 
                id="destino" 
                name="destino.nome" 
                className="input" 
              />

              <label htmlFor="classificacao">Classificação:</label>
              <Field 
                as="select"
                id="classificacao" 
                name="classificacao" 
                className="input">
                  <option value="">Selecione a classificação</option>
                  <option value="PRIMARIO">Primário</option>
                  <option value="SECUNDARIO">Secundário</option>
                  <option value="TERCIARIO">Terciário</option>
              </Field>
              <ErrorMessage name="classificacao" component="div" className="error-message" />

              {transferencia.medicamento.map((medicamento, index) => (
                <div className="">
                  <label htmlFor="medicamento">Medicamento {index + 1}:</label>
                  <Field 
                    type="text" 
                    id={`medicamento[${index}].nome`}
                    name={`medicamento[${index}].nome`}
                    className="input"
                  />
                  <Field 
                    type="text" 
                    id={`medicamento[${index}].dosagem`}
                    name={`medicamento[${index}].dosagem`}
                    className="input"
                  />
                  <Field 
                    type="text" 
                    id={`medicamento[${index}].principioAtivo`}
                    name={`medicamento[${index}].principioAtivo`}
                    className="input"
                  />
                </div>
              ))}
              <ErrorMessage name="classificacao" component="div" className="error-message" />

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
                type="text" 
                id="meioTransporte" 
                name="meioTransporte" 
                className="input" />
              <ErrorMessage name="meioTransporte" component="div" className="error-message" />

              <label htmlFor="status">Status:</label>
              <Field 
                type="text" 
                id="status" 
                name="status" 
                className="input" />
              <ErrorMessage name="status" component="div" className="error-message" />

              <label htmlFor="motivo">Motivo:</label>
              <Field 
                type="text" 
                id="motivo" 
                name="solicitacao.justificativa" 
                className="input" />
              <ErrorMessage name="motivo" component="div" className="error-message" />

              
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/transferencias")}
                  className="cancel-button"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="delete-button"
                >
                  Excluir Transferência
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

export default EditarTransferencia;
