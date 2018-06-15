import { READ_SENT_MAIL } from "../actions/sentMail.js";
import { STORE_SENT_MAIL,DELETE_SENT_MAIL } from "../actions/sentMail.js";

let initialState = {};
initialState.id=1001;
initialState.data = [
  {
    id: 1000,
    from: "user@tcs.com",
    to: "ievolve@tcs.com",
    subject: "This is a sent mail",
    time: "2018-01-23T18:25",
    body: "All your mails that are successfullly sent will be listed here"
  }
];

export default (state = {}, action) => {
  switch (action.type) {
    case READ_SENT_MAIL:
      return state;
      break;
    case STORE_SENT_MAIL:
      
      return initialState;
      break;
    case DELETE_SENT_MAIL:
        
      return initialState;
      break; 
    default:
      return state;
  }
};