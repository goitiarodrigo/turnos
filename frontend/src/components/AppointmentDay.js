import {useState } from "react"
import EveryAppoinmet from "./EveryAppoinmet"

const AppointmentDay = ({
   day,
   timeTable,
   appointmentByDay,
   bookAppointmentHandler,
   fullDay,
}) => {
   const [view, setView] = useState({ turn: false, warning: false })

   const viewHandler = () => {
      setView({ ...view, turn: !view.turn })
   }
   const viewWarningHandler = () => {
      setView({ ...view, warning: !view.warning })
   }
   const turn = timeTable.map((obj, index) => {
      const fullHour = appointmentByDay.filter(
         (objeto) => objeto.date.hour === obj
      )
      return (
         <EveryAppoinmet
            key={index}
            hour={obj}
            fullHour={fullHour}
            day={day}
            viewHandler={viewHandler}
            bookAppointmentHandler={bookAppointmentHandler}
         />
      )
   })
   return (
      <>
         <div className="containerDay">
            <div
               className={fullDay ? "full" : !view.turn ? "noFull" : 'clickDay'}
               onClick={!fullDay ? viewHandler : viewWarningHandler}
            >
               <p>{day}</p>
            </div>
            <div className="days">
               {view.turn && turn}
               {view.warning && (
                  <div>
                     Sin turnos disponibles, por favor seleccioná otra fecha.
                  </div>
               )}
            </div>
         </div>
      </>
   )
}
export default AppointmentDay
