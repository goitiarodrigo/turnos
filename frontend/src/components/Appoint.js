import ReactCircleModal from "react-circle-modal"
import MedicalData from "./MedicalData"
import { useState } from "react"

const Appoint = ({ appointment, deleteAppoint }) => {
   const [confirmDelete, setConfirmDelete] = useState(false)
   return (
      <div>
         <div className="nombre-HC">
            <h4>
               {appointment.patientId.name} {appointment.patientId.lastName}
            </h4>
            <ReactCircleModal
               backgroundColor="#36B0B4"
               toogleComponent={(onClick) => (
                  <img
                     className="historiaClinica"
                     onClick={onClick}
                     src="/assets/historialClinico.png"
                     alt=""
                  />
               )}
               offsetX={0}
               offsetY={0}
            >
               {(onClick) => (
                  <div
                     style={{
                        backgroundColor: "#fff",
                        padding: "1em",
                        width: "75vw",
                        alignSelf: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <MedicalData appointment={appointment} />
                     <button onClick={onClick}>VOLVER</button>
                  </div>
               )}
            </ReactCircleModal>
         </div>
         <p>{appointment.date.date}</p>
         <p>{appointment.date.hour} hs</p>
         <div className="borrarTurno">
            {!confirmDelete && (
               <button
                  className="buttonDelete"
                  onClick={() => setConfirmDelete(!confirmDelete)}
               >
                  BORRAR TURNO
               </button>
            )}
            {confirmDelete && (
               <div className="borrarTurno">
                  <span className="confirmDelete">Confirmar</span>
                  <img
                     className="iconCom"
                     src="/assets/cross.png"
                     alt="edit"
                     onClick={() => setConfirmDelete(!confirmDelete)}
                  />
                  <img
                     className="iconCom"
                     src="/assets/check2.png"
                     alt="edit"
                     onClick={() => deleteAppoint(appointment)}
                  />
               </div>
            )}
         </div>
      </div>
   )
}

export default Appoint
