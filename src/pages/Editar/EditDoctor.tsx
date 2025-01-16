import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { deleteMedico, getMedicoById, updateMedico } from "../../services/doctors.api";
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";
import { Doctor } from "../../types/doctor.type";

const EditDoctor = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    crm: Yup.string()
      .required("CRM é obrigatório"),
    especialidade: Yup.string().required("Especialidade é obrigatória"),
    papel: Yup.string()
      .oneOf(["REGULADOR", "ORIGEM", "DESTINO"], "Selecione um papel válido")
      .required("Papel é obrigatório"),
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctor = await getMedicoById(id!);
        setInitialValues({
          nome: doctor.nome,
          crm: doctor.crm,
          especialidade: doctor.especialidade,
          papel: doctor.papel,
        });
      } catch (err) {
        setError("Erro ao carregar os dados do médico.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleSubmit = async (
    values: Doctor,
    { setSubmitting }: FormikHelpers<Doctor>
  ) => {
    try {
      await updateMedico(id!, values);
      alert("Médico atualizado com sucesso!");
      navigate("/medicos");
    } catch (err) {
      alert("Erro ao atualizar o médico. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Você tem certeza que deseja excluir este médico?")) {
      try {
        await deleteMedico(id as string);
        alert("Médico excluído com sucesso!");
        navigate("/medicos");
      } catch (error) {
        console.error("Erro ao excluir médico:", error);
        alert("Erro ao excluir médico.");
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!initialValues) return null;

  return (
    <div>
      <div className="header">Editar Médico</div>
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="edit-form">
              <label htmlFor="nome">Nome:</label>
              <Field
                type="text"
                id="nome"
                name="nome"
                className="input"
                placeholder="Nome do médico"
              />
              <ErrorMessage name="nome" component="div" className="error-message" />

              <label htmlFor="crm">CRM:</label>
              <Field
                type="text"
                id="crm"
                name="crm"
                className="input"
                placeholder="Número do CRM"
              />
              <ErrorMessage name="crm" component="div" className="error-message" />

              <label htmlFor="especialidade">Especialidade:</label>
              <Field as="select" id="especialidade" name="especialidade" className="input">
                <option value="">Selecione uma especialidade</option>
                <option value="ALERGOLOGIA_E_IMUNOLOGIA">Alergologia e Imunologia</option>
                <option value="ANESTESIOLOGIA">Anestesiologia</option>
                <option value="ANGIOLOGIA_E_CIRURGIA_VASCULAR">Angiologia e Cirurgia Vascular</option>
                <option value="CARDIOLOGIA">Cardiologia</option>
                <option value="CIRURGIA_CARDIACA">Cirurgia Cardíaca</option>
                <option value="CIRURGIA_DE_CABECA_E_PESCOCO">Cirurgia de Cabeça e Pescoço</option>
                <option value="CIRURGIA_GERAL">Cirurgia Geral</option>
                <option value="CIRURGIA_PLASTICA">Cirurgia Plástica</option>
                <option value="CIRURGIA_TORACICA">Cirurgia Torácica</option>
                <option value="CIRURGIA_VASCULAR">Cirurgia Vascular</option>
                <option value="CLINICA_MEDICA">Clínica Médica</option>
                <option value="DERMATOLOGIA">Dermatologia</option>
                <option value="ENDOCRINOLOGIA_E_METABOLOGIA">Endocrinologia e Metabologia</option>
                <option value="GASTROENTEROLOGIA">Gastroenterologia</option>
                <option value="GENETICA_MEDICA">Genética Médica</option>
                <option value="GERIATRIA">Geriatria</option>
                <option value="GINECOLOGIA_E_OBSTETRICIA">Ginecologia e Obstetrícia</option>
                <option value="HEMATOLOGIA_E_HEMOTERAPIA">Hematologia e Hemoterapia</option>
                <option value="INFECTOLOGIA">Infectologia</option>
                <option value="MASTOLOGIA">Mastologia</option>
                <option value="MEDICINA_DE_FAMILIA_E_COMUNIDADE">Medicina de Família e Comunidade</option>
                <option value="MEDICINA_DE_TRAFEGO">Medicina de Tráfego</option>
                <option value="MEDICINA_DO_TRABALHO">Medicina do Trabalho</option>
                <option value="MEDICINA_DO_ESPORTE">Medicina do Esporte</option>
                <option value="MEDICINA_INTENSIVA">Medicina Intensiva</option>
                <option value="MEDICINA_LEGAL_E_PERICIA_MEDICA">Medicina Legal e Perícia Médica</option>
                <option value="MEDICINA_NUCLEAR">Medicina Nuclear</option>
                <option value="NEFROLOGIA">Nefrologia</option>
                <option value="NEUROCIRURGIA">Neurocirurgia</option>
                <option value="NEUROLOGIA">Neurologia</option>
                <option value="NUTROLOGIA">Nutrologia</option>
                <option value="OFTALMOLOGIA">Oftalmologia</option>
                <option value="ORTOPEDIA_E_TRAUMATOLOGIA">Ortopedia e Traumatologia</option>
                <option value="OTORRINOLARINGOLOGIA">Otorrinolaringologia</option>
                <option value="PATOLOGIA">Patologia</option>
                <option value="PATOLOGIA_CLINICA_MEDICINA_LABORATORIAL">Patologia Clínica/Medicina Laboratorial</option>
                <option value="PEDIATRIA">Pediatria</option>
                <option value="PNEUMOLOGIA">Pneumologia</option>
                <option value="PSIQUIATRIA">Psiquiatria</option>
                <option value="RADIOLOGIA_E_DIAGNOSTICO_POR_IMAGEM">Radiologia e Diagnóstico por Imagem</option>
                <option value="RADIOTERAPIA">Radioterapia</option>
                <option value="REUMATOLOGIA">Reumatologia</option>
                <option value="UROLOGIA">Urologia</option>
              </Field>
              <ErrorMessage name="especialidade" component="div" className="error-message" />

              <label htmlFor="papel">Papel:</label>
              <Field as="select" id="papel" name="papel" className="input">
                <option value="">Selecione um papel</option>
                <option value="REGULADOR">Regulador</option>
                <option value="ORIGEM">Origem</option>
                <option value="DESTINO">Destino</option>
              </Field>
              <ErrorMessage name="papel" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/medicos")}
                className="cancel-button"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
              >
                Excluir Médico
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

export default EditDoctor;
