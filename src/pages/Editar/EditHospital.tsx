import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { deleteHospital, getHospitalById, updateHospital } from "../../services/hospitals.api";
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";
import { Hospital } from "../../types/hospitals.type";

const EditHospital = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    nome: Yup.string().required("O nome é obrigatório."),
    telefone: Yup.string().optional(),
    email: Yup.string().email("Email inválido").optional(),
    endereco: Yup.object({
      rua: Yup.string().required("Rua é obrigatória."),
      bairro: Yup.string().required("Bairro é obrigatório."),
      cidade: Yup.string().required("Cidade é obrigatória."),
      estado: Yup.string().required("Estado é obrigatório."),
      cep: Yup.string().required("CEP é obrigatório."),
    }),
    disponibilidadeLeitos: Yup.number().optional().min(0, "Deve ser maior ou igual a 0"),
    temUTI: Yup.boolean().optional(),
  });

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const date = await getHospitalById(id as string);
        setHospital(date);
      } catch (err) {
        setError("Erro ao carregar os dados do hospital.");
        alert("Erro ao carregar dados do paciente.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  const handleSubmit = async (
    values: Hospital, { setSubmitting }: any) => {
    try {
      await updateHospital(id as string, values);
      alert("Hospital atualizado com sucesso!");
      navigate("/hospitais");
    } catch (err) {
      console.log("error",err, values)
      alert("Erro ao atualizar o hospital. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Você tem certeza que deseja excluir este hospital?")) {
      try {
        await deleteHospital(id as string);
        alert("Hospital excluído com sucesso!");
        navigate("/hospitais");
      } catch (error) {
        console.error("Erro ao excluir hospital:", error);
        alert("Erro ao excluir hospital.");
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!hospital) return null; 

  return (
    <div>
      <div className="header">Editar Hospital</div>
      <main>
        <Formik
          initialValues={hospital}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="edit-form">
              <label htmlFor="nome">Nome:</label>
              <Field 
                type="text" 
                id="nome" 
                name="nome" 
                className="input" 
                />
              <ErrorMessage name="nome" component="div" className="error-message" />

              <label htmlFor="telefone">Telefone:</label>
              <Field 
                type="text" 
                id="telefone" 
                name="telefone" 
                className="input" 
                />
              <ErrorMessage name="telefone" component="div" className="error-message" />

              <label htmlFor="email">Email:</label>
              <Field 
                type="email" 
                id="email" 
                name="email" 
                className="input" 
                />
              <ErrorMessage name="email" component="div" className="error-message" />

              <label htmlFor="endereco.rua">Rua:</label>
              <Field 
                type="text" 
                id="endereco.rua" 
                name="endereco.rua" 
                className="input" 
                />
              <ErrorMessage name="endereco.rua" component="div" className="error-message" />

              <label htmlFor="endereco.bairro">Bairro:</label>
              <Field 
                type="text" 
                id="endereco.bairro" 
                name="endereco.bairro" 
                className="input" 
                />
              <ErrorMessage name="endereco.bairro" component="div" className="error-message" />

              <label htmlFor="endereco.cidade">Cidade:</label>
              <Field 
                type="text" 
                id="endereco.cidade" 
                name="endereco.cidade" 
                className="input" 
                />
              <ErrorMessage name="endereco.cidade" component="div" className="error-message" />

              <label htmlFor="endereco.estado">Estado:</label>
              <Field 
                type="text" 
                id="endereco.estado" 
                name="endereco.estado" 
                className="input" 
                />
              <ErrorMessage name="endereco.estado" component="div" className="error-message" />

              <label htmlFor="endereco.cep">CEP:</label>
              <Field 
                type="text" 
                id="endereco.cep" 
                name="endereco.cep" 
                className="input" 
                />
              <ErrorMessage name="endereco.cep" component="div" className="error-message" />

              <label htmlFor="disponibilidadeLeitos">Disponibilidade de Leitos:</label>
              <Field
                type="number"
                id="disponibilidadeLeitos"
                name="disponibilidadeLeitos"
                className="input"
              />
              <ErrorMessage name="disponibilidadeLeitos" component="div" className="error-message" />

              <label htmlFor="temUTI">Possui UTI:</label>
              <Field 
                type="checkbox" 
                id="temUTI" 
                name="temUTI" 
                className="checkbox" 
                />
              <ErrorMessage name="temUTI" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/hospitais")}
                className="cancel-button"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
              >
                Excluir Hospital
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

export default EditHospital;
