import { Link } from "react-router-dom"
import { useState } from "react"

const AppointUser = ({ appointment, deleteAppoint }) => {
   const [confirmDelete, setConfirmDelete] = useState(false)
   return (
      <div>
         <div>
            <Link to={`/staff/${appointment.doctorId._id}`}>
               <h3 className="linksDoctor">
                  {appointment.doctorId.name} {appointment.doctorId.lastName}
               </h3>
            </Link>
         </div>
         <p className="turnos">{appointment.date.date}</p>
         <p className="turnos">{appointment.date.hour} hs.</p>
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

export default AppointUser
