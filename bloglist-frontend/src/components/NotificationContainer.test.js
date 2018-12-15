import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from '../reducers/notificationReducer';
import NotificationContainer from './NotificationContainer';


const mockState = {
  notifications: [
    {message: 'lol', id: 1}
  ]
}

const reducer = combineReducers({
  notifications: notificationReducer,
});

const store = createStore(
  reducer,
  mockState,
  applyMiddleware(thunk)
);


describe('NotificationContainer', () => {
  it('renders blogs', () => {
    const component = renderer.create(
      <Provider store={store}>
        <NotificationContainer />
      </Provider>
    );
    
    console.log(component.toJSON());
    expect(component.toJSON()).toMatchSnapshot();
  });
});
