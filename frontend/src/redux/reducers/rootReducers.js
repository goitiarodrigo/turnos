import { combineReducers } from "redux"
import usersReducer from "./usersReducer.js"
import doctorReducer from "./doctorReducer.js"
import patientsReducer from "./patientsReducer.js"

const rootReducer = combineReducers({
   users: usersReducer,
   doctors: doctorReducer,
   patients: patientsReducer,
})

export default rootReducer
