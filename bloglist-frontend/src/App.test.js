import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import sinon from 'sinon';

jest.mock('./services/service');

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import App from './App';

import * as blogActions from './actions/blogActions';
import * as userActions from './actions/userActions';

const userdata = ({
  name: 'test man',
  username: 'tm',
  token: 123,
});

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
});



describe('<App />', () => {
  let app;
  let store;

  describe('when user is logged in', () => {
    beforeEach(() => {
      window.localStorage.setItem('loggedInUser', JSON.stringify(userdata));
      
      store = createStore(
        reducer,
        applyMiddleware(thunk)
      );

      app = mount(
        <Provider store={store}>
          <App />
        </Provider>
      ); 
    });

    it('it renders blogs', () => {
      app.update();
      const blogComponents = app.find('.blog-listing');

      expect(blogComponents.length).toEqual(3);
    });

    // it('deleting a blog deletes a blog', () => {
    //   app.update();
    //   store.dispatch(blogActions.postDeleteBlog('5bf308d3eeae65359cac828c'));
    //   app.instance().forceUpdate();
    //   app.update();
    //   const blogComponents = app.find('.blog-listing');

    //   console.log(app.state());
    
    //   expect(blogComponents.length).toEqual(2);
    // });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      window.localStorage.clear();

      store = createStore(
        reducer,
        applyMiddleware(thunk)
      );

      app = mount(
        <Provider store={store}>
          <App />
        </Provider>
      ); 
    });

    

    it('it renders blogs', () => {
      app.update();
      const blogComponents = app.find('.blog-listing');
      expect(blogComponents.length).toEqual(3);
    });

    it('it should display a login form', () => {
      app.update();

      const loginFormComponents = app.find('form.login-form');
      expect(loginFormComponents.length).toEqual(1);
    });
  });

});
