import expect from 'expect';
import reducer from 'reducers/topic';
import * as types from 'constants';

describe('Topics reducer', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        topics: [],
        newTopic: ''
      }
    );
  });

  it('Should add a new topic to an empty initial state', () => {
    const topic = 'A time machine';
    expect(
      reducer(undefined, {
        type: types.CREATE_TOPIC_REQUEST,
        count: 1,
        text: topic
      })
    ).toEqual({
      topics: [
        {
          count: 1,
          text: topic
        }
      ],
      newTopic: ''
    });
  });

});
