import axios from "axios"

const doctorActions = {
   getDoctors: () => {
      return async (dispatch, getState) => {
         try {
            let res = await axios.get("http://localhost:4000/api/doctors")
            dispatch({ type: "GET_ALL_DOCTORS", payload: res.data.res })
            return { success: true, res: res.data.res }
         } catch (err) {
            return { success: false, res: err }
         }
      }
   },
   getOneDoctorDB: (id) => {
      return async (dispatch, getState) => {
         try {
            let res = await axios.get(`http://localhost:4000/api/doctor/${id}`)
            if (res.data.success) {
               dispatch({ type: "GET_ONE_DOCTOR_DB", payload: res.data.res })
               return { success: true, res: res.data.res }
            }else{
               throw new Error()
            }
         } catch (err) {
            return { success: false, res: err }
         }
      }
   },
   actionReview: (user, id, text, action, reviewId) => {
      return async () => {
         try {
            let res = await axios.put(
               `http://localhost:4000/api/doctor/${id}`,
               {text, action, reviewId},
               {
                  headers: {
                     Authorization: "Bearer " + user,
                  },
               }
            )

            return { success: true, res: res.data.res }
         } catch (err) {
            return { success: false, res: err }
         }
      }
   },
   getAppointments: (token) => {
      return async () => {
         try {
            let res = await axios.get(
               "http://localhost:4000/api/appointments/",
               {
                  headers: {
                     Authorization: "Bearer " + token,
                  },
               }
            )
            if (res.data.success) {
               return { success: true, res: res.data.res }
            }else{
               throw new Error
            }
         } catch (err) {
            return { success: false, res: err }
         }
      }
   },
   deleteAppointment: (token, id) => {
      return async () => {
         try {
            let res = await axios.delete(
               `http://localhost:4000/api/appointment/${id}`,
               {
                  headers: {
                     Authorization: "Bearer " + token,
                  },
               }
            )
            if (res.data.success) {
               return { success: true, res: res.data.res }
            }else{
               throw new Error
            }
         } catch (err) {
            return { success: false, res: err.message }
         }
      }
   },
   getAppointementByDoctor: (dorctorid) => {
      return async () => {
         try {
            let res = await axios.get(
               `http://localhost:4000/api/appointment/${dorctorid}`
            )
            if(res.data.success){
               return { success: true, res: res.data.res }
            }else{
               throw new Error
            }
         } catch (err) {
            return { success: false }
         }
      }
   },
   getOneDoctorReviews: (id) => {
      return async () => {
         try {
            let res = await axios.get(`http://localhost:4000/api/doctor/${id}`)
            if (res.data.success) {
               return { success: true, res: res.data.res.review }
            }
         } catch (err) {
            return { success: false, res: err }
         }
      }
   },
   sendScore: (data) => {
      const { doc, point, action, user } = data
      return async () => {
         try {
            let res = await axios.put(
               `http://localhost:4000/api/doctor/${doc}`,
               { point, action },
               {
                  headers: {
                     Authorization: "Bearer " + user,
                  },
               }
            )
            if (res.data.success) {
               return { success: true, res: res.data.res }
            } else {
               throw Error
            }
         } catch (err) {
            return { success: false }
         }
      }
   },
   deleteProfileDoctor: (token) => {
      return async () => {
         try {
            let res = await axios.delete("http://localhost:4000/api/doctor", {
               headers: {
                  Authorization: "Bearer " + token,
               },
            })
            if (res.data.success) {
               return { success: true }
            } else {
               throw new Error()
            }
         } catch (err) {
            return { success: false }
         }
      }
   },
   deleteAllAppointmentByDoctor: (token) => {
      return async () => {
         try {
            let res = await axios.delete(
               "http://localhost:4000/api/appointments",
               {
                  headers: {
                     Authorization: "Bearer " + token,
                  },
               }
            )
            if (res.data.success) {
               return { success: true }
            } else {
               throw new Error()
            }
         } catch (err) {
            return { success: false }
         }
      }
   },
}

export default doctorActions
