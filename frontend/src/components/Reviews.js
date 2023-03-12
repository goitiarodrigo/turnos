import ScrollableFeed from "react-scrollable-feed";
import EveryReview from "./EveryReview";
import doctorActions from "../redux/actions/doctorActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const Reviews = ({
  reviews,
  dataUser,
  doctorId,
  userToken,
  actionReview,
  socket,
  getOneDoctorReviews,
}) => {
  const [newReviews, setNewReview] = useState(reviews);
  const [text, setText] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [escribiendo, setEscribiendo] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("message", (mensaje) => {
        if (mensaje === "refetch") {
          setRefetch(!refetch);
          getOneDoctorReviews(doctorId).then((res) => {
            if (res.success) {
              setNewReview(res.res);
            } else {
              console.log("error");
            }
          });
        }
        if (mensaje.includes("escribiendo")) {
          setEscribiendo(mensaje);
          setTimeout(() => {
            setEscribiendo("");
          }, 1000);
        }
      });
    }
    return false;
    // eslint-disable-next-line
  }, [socket]);

  const deleteReviewHandler = (reviewId) => {
    actionReview(userToken, doctorId, text, "deleteReview", reviewId).then(
      (res) => {
        if (res.success) {
          socket.emit("message", `borrado`);
          setNewReview(res.res);
        } else {
          console.log(res);
        }
      }
    );
  };

  const editTextReviewHandler = (e) => {
    socket.emit("message", `Alguien está escribiendo...`);
    setText(e.target.value);
  };

  const addReviewHandler = () => {
    setText("");
    if (text) {
      actionReview(userToken, doctorId, text, "addReview").then((res) => {
        socket.emit("message", "nuevo mensaje");
        if (res.success) {
          setNewReview([...newReviews, res.res[res.res.length - 1]]);
        } else {
          console.log(res);
        }
      });
    }
  };

  const everyReview = newReviews.map((obj) => (
    <EveryReview
      key={obj._id}
      review={obj}
      user={dataUser}
      userToken={userToken}
      doctorId={doctorId}
      deleteReviewHandler={deleteReviewHandler}
      editTextReviewHandler={editTextReviewHandler}
    />
  ));
  return (
    <div className="divReview">
      <ScrollableFeed className="divComentaries">{everyReview}</ScrollableFeed>
      <div>
        <div className="isWriting">
          <span style={{ fontSize: 10, color: "gray", marginTop: 10 }}>
            {escribiendo}
          </span>
        </div>
        <input
          placeholder={
            !userToken
              ? "Creá tu cuenta para dejar feedback al profesional."
              : "Dejale feedback al profesional."
          }
          disabled={dataUser.doc || !userToken}
          onChange={editTextReviewHandler}
          value={text}
        />
        <button
          id="buttonSign"
          onClick={addReviewHandler}
          disabled={dataUser.doc || !userToken}
        >
          ENVIAR
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataUser: state.users.dataUser,
    userToken: state.users.token,
    socket: state.patients.socket,
  };
};
const mapDispatchToProps = {
  actionReview: doctorActions.actionReview,
  getOneDoctorReviews: doctorActions.getOneDoctorReviews,
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
