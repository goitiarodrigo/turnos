import axios from "axios"

const patientActions = {
   getCalendar: () => {
      return async (dispatch, getState) => {
         try {
            let calendar = await axios.get("https://turno-test.onrender.com/api/calendar")
            dispatch({ type: "GET_CALENDAR", payload: calendar.data.res })
            return { success: true, res: calendar.data.res }
         } catch (err) {
            return { success: false }
         }
      }
   },

   postDescription: (id, token, description) => {
      return async () => {
         try {
            let res = await axios.put(
               "https://turno-test.onrender.com/api/patient/" + id,
               { description },
               {
                  headers: {
                     Authorization: "Bearer " + token,
                  },
               }
            )
            if (res.data.success) {
               return { success: true, res: res.data.res }
            } else {
               throw new Error("Database Error")
            }
         } catch (err) {
            return { success: false, error: err }
         }
      }
   },

   addAppointment: (data) => {
      return async () => {
         try {
            let res = await axios.post(
               `https://turno-test.onrender.com/api/appointment/${data.doctorId}`,
               { date: data.date },
               {
                  headers: {
                     Authorization: "Bearer " + data.patientId,
                  },
               }
            )
            if (res.data.success) {
               return { success: true }
            } else {
               throw Error()
            }
         } catch (err) {
            return { success: false }
         }
      }
   },

   getSocket: (socket) => {
      return async (dispatch) => {
         try {
            dispatch({
               type: "SOCKET",
               payload: { socket },
            })
         } catch (err) {
            console.log(err)
         }
      }
  },
  confirmFormMail: (info, user, doc, action) => {
    return async () => {
      try {
        let res = await axios.post("https://turno-test.onrender.com/api/mail",{info, doc, action}, {
            headers: {
              Authorization: "Bearer " + user,
            },
          });
        if(res.data.success){
            return({success:true, res:'Recibiras un e-mail con la confirmación del turno'})
        }else{
          throw Error
        }
      } catch (err) {
          return({success:false, res:''})
      }
    }
  },
  getAvatars: () => {
   return async () => {
     try {
       let res = await axios.get("https://turno-test.onrender.com/api/avatar");
       return { success: true, res: res.data.res };
     } catch (err) {
       return { success: false, res: err };
     }
   };
 },
 getSocialWork:()=>{
   return async () => {
      try {
        let res = await axios.get("https://turno-test.onrender.com/api/socialwork");
        return { success: true, res: res.data.res[0].names};
      } catch (err) {
        return { success: false, res: err };
      }
    }

 }
};

export default patientActions
