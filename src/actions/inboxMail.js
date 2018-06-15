export const REQUEST_INBOX_DATA = "REQUEST_INBOX_DATA";
export const RECEIVE_INBOX_DATA = "RECEIVE_INBOX_DATA";

export const requestInboxData = (id) => ({ type: REQUEST_INBOX_DATA, payload: id });
export const receiveInboxData = inboxData => ({ type: RECEIVE_INBOX_DATA, inboxData });
