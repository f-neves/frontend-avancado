import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/index.css"
import "../../css/main.css"
import "../../css/paginas.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Login bem-sucedido!");
    navigate("/");
  };

  return (
    <div>
      {/* <div className="navbar-placeholder"></div> */}

      <div className="header">
        Login de Usuário
      </div>

      <main className="login-container">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="email">E-mail</label>
          <input
            type="email"
            className="input"
            placeholder="Digite seu e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="input-label" htmlFor="password">Senha</label>
          <input
            type="password"
            className="input"
            placeholder="Digite sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
      </main>

      <footer className="footer">
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;
