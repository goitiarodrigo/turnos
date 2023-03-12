import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";
import patientActions from "../redux/actions/patientActions";
import AppointmentDay from "../components/AppointmentDay";

const Appointment = ({
  doctors,
  getDoctors,
  userToken,
  addAppointment,
  confirmFormMail,
  getCalendar,
  calendar,
  getAppointementByDoctor,
}) => {
  const [newDoctors, setNewDoctors] = useState(doctors);
  const [newCalendar, setNewCalendar] = useState(calendar);
  const [docName, setDocName] = useState(null);
  const [diaryByDoc, setDiaryByDoc] = useState([]);
  const [confirmAppointment, setConfirmAppointment] = useState("");
  const [views, setViews] = useState({
    view: false,
    confirm: false,
    ok: false,
  });
  const [appointmentReady, setAppointmentReady] = useState({
    date: {
      hour: "",
      date: "",
    },
    doctorId: "",
    patientId: "",
  });
  useEffect(() => {
      window.scroll(0, 0)
      if(!doctors.length){
        getDoctors()
        .then(res=>{
          if(res.success){
            setNewDoctors(res.res)
          }
        })
      }
      if(!calendar.length){
        getCalendar()
        .then(res=>{
          if(res.success){
            setNewCalendar(res.res)
          }else{
            console.log(res.res)
          }
        })
      }
      // eslint-disable-next-line
  },[]);
  
  const appointmentValueHandler = (e) => {
    if(!e.target.value){
      setViews({...views, view:false})
    }else{
      !views.view && setViews({...views, view:true})
      setAppointmentReady({...appointmentReady, [e.target.name]:e.target.value})
      getAppointementByDoctor(e.target.value)
      .then(res=> {
        setDiaryByDoc(res.res)})
      setDocName(newDoctors.find(obj => obj._id === e.target.value))
    }
  }
  const bookAppointmentHandler=(hour,day)=>{
    setViews({...views, view:false, confirm:true, ok:false})
    setAppointmentReady({...appointmentReady,
      date: {
        hour: hour,
        date: day,
      },
      patientId: userToken,
    })
  }
  const optionDoctor = newDoctors.map(obj => <option key={obj._id} value={obj._id}>{obj.name} {obj.lastName} - {obj.specialty}</option>)
 
  const inputDay = newCalendar.map(obj =>{
    const appointmentByDay = !diaryByDoc.length ? [] : diaryByDoc.filter(diary=>diary.date.date === obj.day)
    return(
      <AppointmentDay key={obj._id} day={obj.day} docName={`${obj.name} ${obj.lastName}`} fullDay={appointmentByDay.length === 18} appointmentByDay={appointmentByDay} bookAppointmentHandler={bookAppointmentHandler} timeTable={obj.timeTable}/>
    )
  })
  const confirmAppointmentHandler =(data)=>{
    addAppointment(data)
    .then(res=>{
      if(res.success){
        setConfirmAppointment('Tu turno fue agendado exitosamente. ¡Gracias!')
        confirmFormMail(data.date, data.patientId, docName, true)
      }else{
        setConfirmAppointment('Lo sentimos, ha ocurrido un error. Por favor, intentá de nuevo más tarde.')
      }
      getAppointementByDoctor(appointmentReady.doctorId).then((res) =>
        setDiaryByDoc(res.res)
      );
      setTimeout(() => {
        setViews({ view: false, confirm: false, ok:false});
      }, 3000);
    });
    setViews({ view: false, confirm: false, ok:true});
  };
  return (
    <>
      <div className="container">
        <div className="grayContainer">
        <img src="/assets/appointment.png" alt="" />
        <h3>
          ¡Bienvenido! Seleccioná el profesional para ver sus turnos disponibles.
        </h3>
        <select id="optionDoctor" name="doctorId" defaultValue={appointmentReady.doctorId} disabled={views.ok} onClick={appointmentValueHandler}>
            <option value="" >Seleccioná un profesional</option>
            {optionDoctor}
          </select>
          {views.ok && (
            <div>
              <h2>{confirmAppointment}</h2>
              <span>Te llegará un mail con la información del turno.</span>
            </div>
          )}
          {views.confirm && (
            <div>
              <h3>Confirmación de turno</h3>
              <p>
                Profesional: {docName.name} {docName.lastName}
              </p>
              <p>Día: {appointmentReady.date.date}</p>
              <p>Hora: {appointmentReady.date.hour}</p>
              <img
                className="iconTurn"
                src="/assets/cross.png"
                alt="edit"
                onClick={() => setViews({ ...views, confirm: false })}
              />
              <img
                className="iconTurn"
                src="/assets/check.png"
                alt="edit"
                onClick={() => confirmAppointmentHandler(appointmentReady)}
              />
            </div>
          )}
          {views.view && <div className="container2">{inputDay}</div>}
          {!views.view && (
            <div className="protocolo">
              <h3>Protocolo COVID:</h3>
              <h4>Cuidémonos entre todos.</h4>
              <p>
                Por favor, asistir sólo con turno previamente acordado y ante
                cualquier síntoma, solicitá la reprogramación.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors,
    userToken: state.users.token,
    calendar: state.patients.calendar,
  };
};

const mapDispatchToProps = {
  getDoctors: doctorActions.getDoctors,
  getCalendar: patientActions.getCalendar,
  getAppointementByDoctor: doctorActions.getAppointementByDoctor,
  addAppointment: patientActions.addAppointment,
  confirmFormMail: patientActions.confirmFormMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
