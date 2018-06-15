import {combineReducers} from "redux";

import data from "./data.js";
import sent from "./sent.js";
import inboxMail from "./inboxMail.js";
import draft from "./draft.js";
import compose from "./compose.js";
import trash from "./trash.js"



export default combineReducers({
	data,inboxMail,sent,draft,compose,trash
});