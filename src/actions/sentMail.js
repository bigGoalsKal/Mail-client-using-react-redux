export const READ_SENT_MAIL = "";
export const STORE_SENT_MAIL= "";
export const readSentMail = () => ({ type: READ_SENT_MAIL});
export const storeSentMail = (composeData) => ({ type: STORE_SENT_MAIL, payload: composeData});
export const DELETE_SENT_MAIL="DELETE_SENT_MAIL";
export const deleteSentMail = id => ({ type: DELETE_SENT_MAIL, payload:id });