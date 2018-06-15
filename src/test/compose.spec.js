import compose from '../reducers/compose';

describe('compose reducers', () => {


	let initialState = {};
initialState.data = {
  id: "",
  from: "user@tcs.com",
  to: "",
  subject: "",
  time: "",
  body: ""
};


  it('returns proper initial state', () => {
    expect(compose(undefined, {})).toEqual(initialState)

  });

it('STORE_COMPOSE_MAIL', () => {
	var payload=['sample quote 2', 'sample quote 3']
    expect(compose(initialState, {
      type: 'STORE_COMPOSE_MAIL',
      payload: payload,
    })).toEqual({"data": ["sample quote 2", "sample quote 3"]}
);
  });

  
});