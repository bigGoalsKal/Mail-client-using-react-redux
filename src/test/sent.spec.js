import sent from "../reducers/sent";

describe("sent reducers", () => {
  let initialState = {};
  initialState.id = 1001;
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

  

 

  it("STORE_SENT_MAIL", () => {
    var payload = {
      id: 1,
      from: "user@tcs.com",
      to: "ievolve@tcs.com",
      subject: "some mail",
      time: "",
      body: "Hi to u"
    };
    expect(
      sent(initialState, {
        type: "STORE_SENT_MAIL",
        payload: payload
      })
    ).toEqual({
      data: [
        {
          body:
            "All your mails that are successfullly sent will be listed here",
          from: "user@tcs.com",
          id: 1000,
          subject: "This is a sent mail",
          time: "2018-01-23T18:25",
          to: "ievolve@tcs.com"
        },
        {
          body: "Hi to u",
          from: "user@tcs.com",
          id: 1001,
          subject: "some mail",
          time: new Date().toUTCString(),
          to: "ievolve@tcs.com"
        }
      ],
      id: 1002
    });
  });

  it("DELETE_SENT_MAIL", () => {
    expect(
      sent(initialState, {
        type: "DELETE_SENT_MAIL",
        payload: 1001
      })
    ).toEqual({
      data: [
        {
          body:
            "All your mails that are successfullly sent will be listed here",
          from: "user@tcs.com",
          id: 1000,
          subject: "This is a sent mail",
          time: "2018-01-23T18:25",
          to: "ievolve@tcs.com"
        }
      ],
      id: 1002
    });
  });
});