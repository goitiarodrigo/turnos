import axios from "axios"

const patientActions = {
   getCalendar: () => {
      return async (dispatch, getState) => {
         try {
            let calendar = await axios.get("http://localhost:4000/api/calendar")
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
               "http://localhost:4000/api/patient/" + id,
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
               `http://localhost:4000/api/appointment/${data.doctorId}`,
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
        let res = await axios.post("http://localhost:4000/api/mail",{info, doc, action}, {
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
       let res = await axios.get("http://localhost:4000/api/avatar");
       return { success: true, res: res.data.res };
     } catch (err) {
       return { success: false, res: err };
     }
   };
 },
 getSocialWork:()=>{
   return async () => {
      try {
        let res = await axios.get("http://localhost:4000/api/socialwork");
        return { success: true, res: res.data.res[0].names};
      } catch (err) {
        return { success: false, res: err };
      }
    }

 }
};

export default patientActions
