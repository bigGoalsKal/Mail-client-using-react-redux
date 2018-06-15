import {RECEIVE_API_DATA, DELETE_INBOX_MAIL} from "../actions/inbox.js"


let initialState = {};


export default (state={},action) => {
  switch(action.type){
    case RECEIVE_API_DATA:
    
   
    	return initialState;
    	break;
    
    case DELETE_INBOX_MAIL:
    		

      return initialState;
      break;
          
 
      
    default:
      return state;
  }
};