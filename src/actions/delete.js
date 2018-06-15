export const READ_TRASH_MAIL= "READ_TRASH_MAIL";
export const readDeleteMail = () => ({ type: READ_TRASH_MAIL});
export const STORE_TRASH_MAIL= "STORE_TRASH_MAIL";
export const storeDeleteMail = (composeData) => ({ type: STORE_TRASH_MAIL, payload: composeData});
export const RESTORE_TRASH_MAIL= "RESTORE_TRASH_MAIL";
export const restoreDeleteMail = (id) => ({ type: RESTORE_TRASH_MAIL, payload: id});
