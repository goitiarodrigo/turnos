const patientsReducer = (
  state = {calendar: [], socket: null },
  action
) => {
  switch (action.type) {
    case "GET_CALENDAR":
      return {
        ...state,
        calendar: action.payload,
      }
    case "SOCKET":
      return {
        ...state,
        socket: action.payload.socket,
      };
    default:
      return state;
  }
};
export default patientsReducer;
