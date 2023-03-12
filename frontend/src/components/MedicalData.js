import { connect } from "react-redux"
import { useState } from "react"
import patientActions from "../redux/actions/patientActions"
import Description from "./Description"

const MedicalData = ({ appointment, postDescription, token }) => {
   const [inputDescription, setInputDescription] = useState({
      description: "",
   })
   const { name, lastName, src, dni, data, medicalData, _id } =
      appointment.patientId
   const [descriptions, setDescriptions] = useState(medicalData)
   const [change, setChange] = useState(false)

   const inputHandler = (e) => {
      setInputDescription({
         ...inputDescription,
         description: e.target.value,
      })
   }

   const submitHandler = () => {
      postDescription(_id, token, inputDescription.description).then((res) => {
         setDescriptions(res.res)
      })
      setChange(!change)
      setInputDescription({ description: "" })
   }

   const pressEnter = (e) => {
      if (e.key === "Enter") {
         submitHandler()
      }
   }

   return (
      <>
         <div>
            <div className="medicalData">
               <h3>Historial Médico</h3>
               <h3>Paciente</h3>
               <div className="ABC">
                  <div>
                     <img className="imgMD" src={src} alt="fotoPaciente" />
                  </div>
                  <div>
                     {" "}
                     <p>
                        <span className="datosBold">Nombre: </span>
                        {name}
                     </p>
                     <p>
                        <span className="datosBold">Apellido: </span>
                        {lastName}
                     </p>
                     <p>
                        <span className="datosBold">DNI: </span>
                        {dni}
                     </p>
                  </div>
                  <div>
                     {" "}
                     <p>
                        <span className="datosBold">Domicilio:</span>{" "}
                        {data.direction.street} {data.direction.num}{" "}
                        {data.direction.city}
                     </p>
                     <p>
                        <span className="datosBold">Teléfono: </span>
                        {data.phoneNumber}
                     </p>
                     <p>
                        <span className="datosBold">E-mail: </span>
                        {data.mail}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="DEF">
            <h3>Registro de notas</h3>
            <div className="descripcion">
               <div>
                  {descriptions.length === 0 ? (
                     <p>No hay notas aún</p>
                  ) : (
                     descriptions.map((description, index) => {
                        return (
                           <Description description={description} key={index} />
                        )
                     })
                  )}
               </div>
               <div>
                  <img className="pin" src="/assets/pin.png" alt="" />
               </div>
            </div>
            <div className="divEnviarNota">
              <textarea
                className="medicalInput"
                value={inputDescription.description}
                name="description"
                placeholder="Ingresar fecha (dd/mm/aaaa) : nota correspondiente."
                onChange={inputHandler}
                onKeyPress={pressEnter}
              />
              <button id="buttonSign" onClick={submitHandler}>
                ENVIAR
              </button>
            </div>
         </div>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
      token: state.users.token,
      dataUser: state.users.dataUser,
      patients: state.patients.patients,
   }
}

const mapDispatchToProps = {
   postDescription: patientActions.postDescription,
}
export default connect(mapStateToProps, mapDispatchToProps)(MedicalData)
