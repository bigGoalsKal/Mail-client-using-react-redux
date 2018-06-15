import data from '../reducers/data';

describe('data reducers', () => {


	let initialState = {};

  it('returns proper initial state', () => {
    expect(data(undefined, {})).toEqual(initialState)

  });

it('RECEIVE_API_DATA', () => {
  var payload=[{"id":1}, {"id":2}]
    expect(data(initialState, {
      type: 'RECEIVE_API_DATA',
      payload: payload,
    })).toEqual({"data": [{"id":1}, {"id":2}]});
  });

it('DELETE_INBOX_MAIL', () => {
  var payload=[{"id":1}, {"id":2}]
    expect(data(initialState, {
      type: 'DELETE_INBOX_MAIL',
      payload: 1,
    })).toEqual({"data": [{"id": 2}]}
);
  });

  
});