import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../../css/index.css";
import "../../../css/main.css";
import "../../../css/paginas.css";

const CadastroHospitais = () => {
  const initialValues = {
    nome: "",
    telefone: "",
    email: "",
    endereco: {
      rua: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: ""
    }
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    telefone: Yup.string()
      .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
    email: Yup.string()
      .email("Email inválido")
      .required("Email é obrigatório"),
    endereco: Yup.object({
      rua: Yup.string()
        .required("Rua é obrigatória"),
      complemento: Yup.string(),
      bairro: Yup.string()
        .required("Bairro é obrigatório"),
      cep: Yup.string()
        .required("CEP é obrigatório")
        .matches(/^\d{8}$/, "CEP deve ter 8 dígitos"),
      cidade: Yup.string()
        .required("Cidade é obrigatória"),
      estado: Yup.string()
        .required("Estado é obrigatório")
        .length(2, "Use a sigla do estado com 2 letras")
    })
  });

  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    console.log(values);
    alert("Hospital cadastrado com sucesso!");
    setSubmitting(false);
    navigate("/hospitais");
  };

  return (
    <div>
      <div className="header">
        Cadastro de Hospitais
      </div>
      <main>
        <Formik
          initialValues={initialValues}
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
                placeholder="Nome do hospital"
              />
              <ErrorMessage name="nome" component="div" className="error-message" />

              <label htmlFor="telefone">Telefone:</label>
              <Field
                type="text"
                id="telefone"
                name="telefone"
                className="input"
                placeholder="Digite apenas números"
              />
              <ErrorMessage name="telefone" component="div" className="error-message" />

              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="email@exemplo.com"
              />
              <ErrorMessage name="email" component="div" className="error-message" />

              <fieldset className="endereco-fieldset">
                <legend>Endereço</legend>
                
                <label htmlFor="endereco.rua">Rua:</label>
                <Field
                  type="text"
                  id="endereco.rua"
                  name="endereco.rua"
                  className="input"
                  placeholder="Nome da rua"
                />
                <ErrorMessage name="endereco.rua" component="div" className="error-message" />

                <label htmlFor="endereco.complemento">Complemento:</label>
                <Field
                  type="text"
                  id="endereco.complemento"
                  name="endereco.complemento"
                  className="input"
                  placeholder="Complemento (opcional)"
                />
                <ErrorMessage name="endereco.complemento" component="div" className="error-message" />

                <label htmlFor="endereco.bairro">Bairro:</label>
                <Field
                  type="text"
                  id="endereco.bairro"
                  name="endereco.bairro"
                  className="input"
                  placeholder="Nome do bairro"
                />
                <ErrorMessage name="endereco.bairro" component="div" className="error-message" />

                <label htmlFor="endereco.cep">CEP:</label>
                <Field
                  type="text"
                  id="endereco.cep"
                  name="endereco.cep"
                  className="input"
                  placeholder="Digite apenas números"
                />
                <ErrorMessage name="endereco.cep" component="div" className="error-message" />

                <label htmlFor="endereco.cidade">Cidade:</label>
                <Field
                  type="text"
                  id="endereco.cidade"
                  name="endereco.cidade"
                  className="input"
                  placeholder="Nome da cidade"
                />
                <ErrorMessage name="endereco.cidade" component="div" className="error-message" />

                <label htmlFor="endereco.estado">Estado:</label>
                <Field
                  type="text"
                  id="endereco.estado"
                  name="endereco.estado"
                  className="input"
                  placeholder="UF"
                  maxLength={2}
                />
                <ErrorMessage name="endereco.estado" component="div" className="error-message" />
              </fieldset>

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

export default CadastroHospitais;