export const READ_DRAFT_MAIL = "READ_DRAFT_MAIL";
export const STORE_DRAFT_MAIL= "STORE_DRAFT_MAIL";
export const readDraftMail = () => ({ type: READ_DRAFT_MAIL});
export const storeDraftMail = (draftData) => ({ type: STORE_DRAFT_MAIL, payload: draftData});
export const DELETE_DRAFT_MAIL= "DELETE_DRAFT_MAIL";
export const deleteDraftMail = (id) => ({ type: DELETE_DRAFT_MAIL, payload: id});
export const restoreDraftMail = (draftData) => ({ type: RESTORE_DRAFT_MAIL, payload: draftData});
export const RESTORE_DRAFT_MAIL= "RESTORE_DRAFT_MAIL";
