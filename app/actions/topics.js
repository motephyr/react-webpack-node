// Including es6-promise so isomorphic fetch will work
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import * as types from 'constants';

polyfill();

let API_ENDPOINT = '/topic';

// If this is a test, we must use an absolute url
if (__TEST__) {
  API_ENDPOINT = 'http://localhost:9876/topic';
}

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
function makeTopicRequest(method, data) {
  return fetch(API_ENDPOINT, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function increment(index) {
  return { type: types.INCREMENT_COUNT, index };
}

function decrement(index) {
  return { type: types.DECREMENT_COUNT, index };
}

function destroy(index) {
  return { type: types.DESTROY_TOPIC, index };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
function createTopicRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    count: data.count,
    text: data.text
  };
}

function createTopicSuccess() {
  return {
    type: types.CREATE_TOPIC_SUCCESS
  };
}

function createTopicFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    ex: data.ex
  };
}

function createTopicDuplicate() {
  return {
    type: types.CREATE_TOPIC_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createTopic(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();
    const data = {
      count: 1,
      text
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (topic.topics.filter(topicItem => topicItem.text === text).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return dispatch(createTopicDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createTopicRequest(data));

    return makeTopicRequest('post', data)
      .then(res => {
        if (res.ok) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createTopicSuccess());
        } else {
          throw new Error("Oops! Something went wrong and we couldn't create your topic");
        }
      })
      .catch(ex => {
        return dispatch(createTopicFailure({ ex: ex.message }));
      });
  };
}

export function incrementCount(id, index) {
  return dispatch => {
    dispatch(increment(index));

    return makeTopicRequest('put', {
        id: id,
        isFull: false,
        isIncrement: true
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

export function decrementCount(id, index) {
  return dispatch => {
    dispatch(decrement(index));
    return makeTopicRequest('put', {
        id: id,
        isFull: false,
        isIncrement: false
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

export function destroyTopic(id, index) {
  return dispatch => {
    dispatch(destroy(index));
    return makeTopicRequest('delete', {
        id: id
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}
