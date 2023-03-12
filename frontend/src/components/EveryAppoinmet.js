import { useEffect, useState } from "react";

const EveryAppoinmet = ({
  hour,
  fullHour,
  bookAppointmentHandler,
  viewHandler,
  doctorName,
  day,
}) => {
  const [view, setView] = useState(true);

  useEffect(() => {
    if (fullHour[0]) {
      fullHour[0].date.hour === hour && setView(false);
    }

    // eslint-disable-next-line
  }, []);
  const functionHandler = () => {
    bookAppointmentHandler(hour, day, doctorName);
    viewHandler();
  };

  return (
    <div>
      {view && (
        <button className="hour" onClick={functionHandler}>
          {hour}
        </button>
      )}
    </div>
  );
};
export default EveryAppoinmet;
