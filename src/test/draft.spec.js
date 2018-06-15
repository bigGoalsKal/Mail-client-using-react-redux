import draft from "../reducers/draft";

describe("draft reducers", () => {
  let initialState = {};
  initialState.id = 2001;
  initialState.data = [
    {
      id: 2000,
      from: "user@tcs.com",
      to: "ievolve@tcs.com",
      subject: "Draft mail",
      time: "2018-01-23T18:25",
      body: "you can edit this"
    }
  ];

 

  it("READ_DRAFT_MAIL", () => {
    expect(
      draft(initialState, {
        type: "READ_DRAFT_MAIL"
      })
    ).toEqual(initialState);
  });

  it("STORE_DRAFT_MAIL", () => {
    var payload = {
      id: 2001,
      from: "user@tcs.com",
      to: "ievolve@tcs.com",
      subject: "Draft mail",
      time: "2018-01-23T18:25",
      body: "you can edit this"
    };
    expect(
      draft(initialState, {
        type: "STORE_DRAFT_MAIL",
        payload: payload
      })
    ).toEqual({
      data: [
        {
          body: "you can edit this",
          from: "user@tcs.com",
          id: 2000,
          subject: "Draft mail",
          time: "2018-01-23T18:25",
          to: "ievolve@tcs.com"
        },
        {
          body: "you can edit this",
          from: "user@tcs.com",
          id: 2001,
          subject: "Draft mail",
          time: new Date().toUTCString(),
          to: "ievolve@tcs.com"
        }
      ],
      id: 2002
    });
  });

  it("DELETE_DRAFT_MAIL", () => {
    expect(
      draft(initialState, {
        type: "DELETE_DRAFT_MAIL",
        payload: 2001
      })
    ).toEqual({
      data: [
        {
          body: "you can edit this",
          from: "user@tcs.com",
          id: 2000,
          subject: "Draft mail",
          time: "2018-01-23T18:25",
          to: "ievolve@tcs.com"
        }
      ],
      id: 2002
    });
  });

  it("RESTORE_DRAFT_MAIL", () => {
    var payload = {
      id: 2005,
      from: "user@tcs.com",
      to: "ievolve@tcs.com",
      subject: "Draft mail",
      time: "Thu, 29 Mar 2018 22:36:30 GMT",
      body: "you can edit this"
    };
    expect(
      draft(initialState, {
        type: "RESTORE_DRAFT_MAIL",
        payload: payload
      })
    ).toEqual({
      data: [
        {
          body: "you can edit this",
          from: "user@tcs.com",
          id: 2000,
          subject: "Draft mail",
          time: "2018-01-23T18:25",
          to: "ievolve@tcs.com"
        },
        {
          body: "you can edit this",
          from: "user@tcs.com",
          id: 2002,
          subject: "Draft mail",
          time: new Date().toUTCString(),
          to: "ievolve@tcs.com"
        }
      ],
      id: 2003
    });
  });
});