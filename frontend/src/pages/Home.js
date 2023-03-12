import { Component } from "react";
import { Link } from "react-router-dom";
import Information from '../components/Information'

export default class Home extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    return (
      <main>
        <div
          className="hero"
          style={{ backgroundImage: "url('/assets/hero3.jpg')" }}
        >
          <div className="insideHero">
            <h1>Enfocados en tu bienestar integral.</h1>
            <button id="buttonSign">
              <Link to="/staff">CONOCÉ NUESTRO STAFF</Link>
            </button>
          </div>
        </div>
        <div className="iconCardsContainer">
          <div className="iconCard">
            <img src="/assets/icoNutricion.png" alt="icono nutricion" />
            <h3>NUTRICIÓN</h3>
          </div>
          <div className="iconCard">
            <img src="/assets/icoPsicologia.png" alt="icono psicología" />
            <h3>PSICOLOGÍA</h3>
          </div>
          <div className="iconCard">
            <img src="/assets/icoMedicina.png" alt="icono medicina" />
            <h3>MEDICINA GENERAL</h3>
          </div>
          <div className="iconCard">
            <img src="/assets/icoEntrenamiento.png" alt="icono entrenamiento" />
            <h3>ENTRENAMIENTO</h3>
          </div>
        </div>
        <div
          className="description"
          style={{ backgroundImage: "url('/assets/description2.jpg')" }}>
          <div>
            <img src="/assets/logo.png" alt="logo" />
            <h3>¿Quiénes somos?</h3>
            <p>
              Somos un equipo interdisciplinario comprometido con la salud
              nutricional de la sociedad, con el propósito de acompañar a las
              personas en la búsqueda de la armonía del cuerpo y la mente.
            </p>
          </div> 
        </div>
        <Information/>
      </main>
    )
  }
}
