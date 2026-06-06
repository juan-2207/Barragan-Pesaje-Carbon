import Card from '../components/Card'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import heroMineria from '../assets/hero-mineria.jpg'
import frenteMina from '../assets/frente-mina.jpg'
import trabajador1 from '../assets/trabajador1.jpg'
import trabajador2 from '../assets/trabajador2.jpg'
import trabajador3 from '../assets/trabajador3.jpg'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <section className="hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(11, 19, 43, 0.30) 0%, rgba(11, 19, 43, 0.25) 55%, rgba(11, 19, 43, 0.30) 100%), url(${heroMineria})` }}>
        <div className="hero-inner">
          <h1>SENAFIM - Líderes en la Extracción Responsable de Carbón.</h1>
          <p className="hero-sub">Suministramos energía al mundo con décadas de experiencia operando minas de carbón con la tecnología más avanzada, garantizando la seguridad absoluta de nuestro equipo y el suministro energético estable.</p>
          <div className="hero-cta">
            <Button onClick={() => navigate('/jobs')} className="explore-btn">Ver vacantes</Button>
          </div>
        </div>
      </section>

      <section className="container who-are-we">
        <div className="who-image">
          <img src={frenteMina} alt="Frente de mina en operación" />
        </div>
        <div className="who-text">
          <h2>Quiénes somos</h2>
          <p>
            Somos una compañía de base tecnológica y operativa, pionera en la optimización de procesos de extracción minera de carbón.
            Nuestro equipo está compuesto por ingenieros de minas, geólogos y personal operativo altamente capacitado que hacen de la seguridad en el terreno nuestra máxima prioridad absoluta.
            No somos solo operativos; somos expertos en el núcleo de la minería moderna.
          </p>
        </div>
      </section>

      <section className="container join-family">
        <Card title="Únete a la familia">
          <div className="gallery-grid">
            <img src={trabajador1} alt="Ingeniero de mina con casco naranja" />
            <img src={trabajador2} alt="Operador de maquinaria pesada en mina" />
            <img src={trabajador3} alt="Supervisor de mina con tablet" />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/jobs">
              <Button className="explore-btn">Explorar vacantes</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Home
