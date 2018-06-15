import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData } from "../actions/inbox";
import { REQUEST_INBOX_DATA, receiveInboxData } from "../actions/inboxMail";
//import { fetchData } from "../apis/api";

const fetchInbox = async () => {
  try {
    const response = await fetch("http://localhost:8001/inbox");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const fetchInboxData = async (id) => {
  try {
    
    const response = await fetch("http://localhost:8001/mails/"+id);
    const inboxData = await response.json();
    return inboxData;
  } catch (e) {
    console.log(e);
  }
};



function* getApiData(action) {
  try {
    // do api call
    const data = yield call(fetchInbox);
    yield put(receiveApiData(data));
  } catch (e) {
    console.log(e);
  }
}

function* getInboxData(action) {
  try {
    // do api call
    const inboxData = yield call(fetchInboxData,action.payload);
    yield put(receiveInboxData(inboxData));
  } catch (e) {
    console.log(e);
  }
}
export function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}

export function* myInbox() {
  yield takeLatest(REQUEST_INBOX_DATA, getInboxData);
}
