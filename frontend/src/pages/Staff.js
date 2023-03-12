import { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import doctorActions from "../redux/actions/doctorActions"
import Score from "../components/Score"

class Staff extends Component {
  state = {
    loading: { condition: true, text:'', back:'', gif:true},
  };

  componentDidMount() {
    window.scroll(0, 0);
    if(!this.props.doctors.length){
      this.props.getDoctors()
      .then((res) => {
        res.success
          ? this.setState({ loading: { condition: false } })
          : this.setState({
              loading: {
                ...this.state.loading,
                text: "Lo sentimos, ha ocurrido un error, volvé a intentarlo más tarde.",
                back: "Volver a Home",
                git:false
              },
            });
      });
    }else{
      this.setState({ loading: { condition: false } })
    }
  }

  render() {
    if (this.state.loading.condition) {
      return ( 
      <div className="containerLoading">
        {this.state.loading.gif && <img src="/assets/loader.gif" alt='loading'/>}
        <h3>{this.state.loading.text}</h3>
        <Link to='/'>{this.state.loading.back}</Link>
      </div>
      )
    }
    let doctor = this.props.doctors.map((obj) => {
      return (
        <Link to={`/staff/${obj._id}`} key={obj._id}>
          <div className="doctorCardsContainer">
            <div className="doctorCard">
              <div
                className="doctor-image"
                style={{
                  backgroundImage: `url('${obj.src}')`,
                }}
              ></div>
              <div className="docCardText">
                <h4>
                  {obj.name} {obj.lastName}
                </h4>
                <p>M.P.: {obj.registration}</p>
                <p>{obj.specialty}</p>
                
              </div>
              <div className="stars"><Score scoreArray={obj.score} staff={true} doctorId={obj._id}/></div>
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="container">
        <div className="grayContainer">
        <h3>Staff</h3>
        <p>Contamos con profesionales especializados en alergias e intolerancias alimentarias, diabetología, alimentación y dietética clínica, nutrición materno-infantil, dietoterapia, psiconutrición, medicina general y entrenamiento fit, con rutinas abocadas a la salud integral del paciente.</p>
        <h4 className="click">Hacé click en la imagen de los doctores para entrar a su perfil profesional.</h4>
        <div className="doctorCardsContainer">{doctor}</div>
        </div>
      </div>
    )
  }
}

const mapStateTopProps = (state) => {
  return {
    doctors: state.doctors.doctors,
  };
};

const mapDispatchToProps = {
  getDoctors: doctorActions.getDoctors,
};

export default connect(mapStateTopProps, mapDispatchToProps)(Staff);
