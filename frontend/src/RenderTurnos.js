import axios from "axios";
import { useEffect, useState } from "react";

const RenderTurnos = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getDoctor() {
      try {
        let response = await axios.get(
          `http://localhost:4000/api/doctor/6133dd2cd36ee78b7d6a8be6`
        );
        setAppointments(response.data.response.appointment);
      } catch (e) {}
    }
    getDoctor();
  }, []);
  return (
    <>
      {appointments.map((appointment, index) => {
        return (
          <div key={index}>
            <h1>{appointment.date.date}</h1>{" "}
            <span>{appointment.date.hour}</span>{" "}
          </div>
        );
      })}
    </>
  );
};

export default RenderTurnos;
