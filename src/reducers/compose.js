import { STORE_COMPOSE_MAIL } from "../actions/compose.js";

let initialState = {};
initialState.data = {
  id: "",
  from: "user@tcs.com",
  to: "",
  subject: "",
  time: "",
  body: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_COMPOSE_MAIL:
      if (action.payload) {
        let compose = {};
        
        return compose;
      } else {
        return initialState;
      }
    default:
      return null;
  }
}; 