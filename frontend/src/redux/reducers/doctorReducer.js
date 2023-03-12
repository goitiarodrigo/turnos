const doctorReducer = (state={doctors:[], doctor:{}}, action) => {
    switch (action.type) {
            case "GET_ALL_DOCTORS":
                return {
                  ...state,
                  doctors: action.payload,
                }
            case "GET_ONE_DOCTOR_DB":
                return{
                    ...state,
                    doctor:action.payload
                }
        default:
            return state
    }
    
}
export default doctorReducer