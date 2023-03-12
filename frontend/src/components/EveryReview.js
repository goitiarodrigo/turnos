import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

const EveryReview = ({
  review,
  user,
  userToken,
  deleteReviewHandler,
  actionReview,
  doctorId,
}) => {
  const { text, patientId, _id } = review;
  const [newText, setNewText] = useState({
    review: text,
    edit: false,
    editReview: text,
  });
  const [edit, setEdit] = useState(false);
  const [enable, setEnable] = useState({ edit: false, delete: false });

  useEffect(() => {
    if (userToken) {
      user._id === patientId._id ? setEdit(true) : setEdit(false);
    }

    // eslint-disable-next-line
  }, [user]);

  const enableEditHandler = (icon) => {
    icon === "cross" && setEnable({ delete: false, edit: false });
    icon === "edit" && setEnable({ delete: true, edit: true });
  };

  const editText = (e) => {
    setNewText({ ...newText, edit: !edit });
    setNewText({ ...newText, editReview: e.target.value });
  };

  const enableDeleteHandler = () => {
    setEnable({ ...enable, delete: true });
  };
  const actionReviewHandler = (text) => {
    actionReview(userToken, doctorId, text, "editReview", _id).then((res) => {
      if (res.success) {
        let obj = res.res.find((obj) => obj._id === _id);
        setNewText({ review: obj.text, edit: false, editReview: obj.text });
        setEnable({ delete: false, edit: false });
      } else {
        console.log(res);
      }
    });
  };
  const editReviews = !edit ? null : (
    <div>
      {!enable.edit && enable.delete && (
        <span>
          <h5 className="confirm">¿Realmente deseas eliminar tu comentario?</h5>
        </span>
      )}
      {!enable.delete && !enable.edit && (
        <img
          className="iconCom"
          src="/assets/delete.png"
          alt="delete"
          onClick={enableDeleteHandler}
        />
      )}
      {enable.edit && (
        <img
          className="iconCom"
          src="/assets/send.png"
          alt="delete"
          onClick={() => actionReviewHandler(newText.editReview, _id)}
        />
      )}
      {(enable.edit || enable.delete) && (
        <img
          className="iconCom"
          src="/assets/cross.png"
          alt="edit"
          onClick={() => enableEditHandler("cross")}
        />
      )}
      {!enable.edit && enable.delete && (
        <img
          className="iconCom"
          src="/assets/check.png"
          alt="edit"
          onClick={() => deleteReviewHandler(_id)}
        />
      )}
      {!enable.edit && !enable.delete && (
        <img
          className="iconCom"
          src="/assets/edit.png"
          alt="edit"
          onClick={() => enableEditHandler("edit")}
        />
      )}
    </div>
  );

  return (
    <div className="comment">
      <div
        className="iconperfil"
        style={{ backgroundImage: `url("${patientId.src}")` }}
      ></div>
      <div className="commentBox">
        <h4>
          {patientId.name} {patientId.lastName}
        </h4>
        <div>
          {!enable.edit && <p>{newText.review}</p>}
          {enable.edit && (
            <textarea
              className="textArea"
              maxLength="200"
              defaultValue={newText.review}
              onChange={editText}
              disabled={!enable}
            />
          )}
          {editReviews}
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  actionReview: doctorActions.actionReview,
};
export default connect(null, mapDispatchToProps)(EveryReview);
