import axios from "axios";

const userActions = {
   signUpUser: (user) => {
      return async (dispatch) => {
         try {
            let res = await axios.post("http://localhost:4000/api/user", user)
            if (res.data.success) {
               dispatch({
                  type: "SIGN_UP",
                  payload: {
                     userExist: res.data.res.userExist,
                     token: res.data.res.token,
                  },
               })
               return { success: true, res: res }
            } else {
               return res.data
            }
         } catch (err) {
            return { success: false, res: err.message }
         }
      }
  },

   logUserWithLs: (token) => {
      return async (dispatch) => {
         try {
            let res = await axios.get("http://localhost:4000/api/verifyToken", {
               headers: {
                  Authorization: "Bearer " + token,
               },
            })
            dispatch({
               type: "SIGN_UP",
               payload: { userExist: res.data.userExist, token },
            })
         } catch (err) {
            return dispatch({ type: "LOG_OUT" })
         }
      }
    },

   logIn: (user, validUser) => {
      let typeUser = null
      if (validUser === "comun") {
         typeUser = "patient"
      } else {
         typeUser = "doctor"
      }
      return async (dispatch) => {
         try {
            let res = await axios.post(
               `http://localhost:4000/api/${typeUser}`,
               user
            )
            if (res.data.success) {
               dispatch({
                  type: "SIGN_UP",
                  payload: {
                     userExist: res.data.res.userExist,
                     token: res.data.res.token,
                  },
               })
               return { res: res.data.res }
            } else {
               return { success: false, res: res.data.res }
            }
         } catch (err) {
            return { success: false, res: err.message }
         }
      }
    },

  logOut: () => {
    return (dispatch) => {
      dispatch({ type: "LOG_OUT" });
    };
  },

  editProfile: (typeUser, profileEdited, token) => {
    let type = "";
    if (typeUser) type = "doctor";
    else type = "patient";
    return async (dispatch) => {
      try {
        let res = await axios.put(
          `http://localhost:4000/api/${type}`,
          { ...profileEdited },
            {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data.success) {
          dispatch({
            type: "EDIT_PROFILE",
            payload: {
              userExist: res.data.res,
            },
          });
          return { success: true };
        }else{
           throw new Error()
        }
      } catch (err) {
        return { success: false, res: err };
      }
    };
  },
};

export default userActions;
