import inboxmail from '../reducers/inboxMail';

describe('sent reducers', () => {

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

  it('returns proper initial state', () => {
    expect(inboxmail(undefined, {})).toEqual({})

  });


  it('RECEIVE_INBOX_DATA', () => {
    var payload={
    id: 1,
    from: "user@tcs.com",
    to: "ievolve@tcs.com",
    subject: "some mail",
    time: "",
    body: "Hi to u"
  }
  
    expect(inboxmail(initialState, {
      type: 'RECEIVE_INBOX_DATA',
      inboxData: payload,
     
    })).toEqual(payload);
  });
    });