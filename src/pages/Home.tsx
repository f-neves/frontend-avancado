import "../../css/index.css"
import "../../css/main.css"
import "../../css/paginas.css"

function Home (){
    return (
        <div>
        <div className="header">
          STP - Sistema de Transferência de Pacientes
        </div>
        <main>
            <section className="home">
            <div className="home-text">
                <h2>Bem-vindo ao STP</h2>
                <p>Transformando transferências hospitalares com segurança, eficiência e transparência.</p>
                <a href="login" className="btn">Comece Agora</a>
            </div>
            <div className="home-image">
                <img src="home-image.png" alt="Imagem Hospitalar" />
            </div>
            </section>
            <section className="features">
            <div className="feature-card">
                <h3>Facilidade de Uso</h3>
                <p>Interface intuitiva para facilitar o gerenciamento de transferências hospitalares.</p>
            </div>
            <div className="feature-card">
                <h3>Segurança de Dados</h3>
                <p>Proteção completa das informações de pacientes durante as transferências.</p>
            </div>
            <div className="feature-card">
                <h3>Conexão entre Hospitais</h3>
                <p>Integração entre unidades hospitalares para um atendimento eficiente.</p>
            </div>
            </section>
        </main>

        <footer>
            <div className="container">
            <p>&copy; 2024 STP. Todos os direitos reservados.</p>
            </div>
        </footer>
        </div>
    )
}

export default Home