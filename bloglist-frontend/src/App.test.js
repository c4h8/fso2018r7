import React from 'react';
import { mount } from 'enzyme';

jest.mock('./services/service');

import Blog from './components/Blog';
import App from './App';

const userdata = ({
  name: 'test man',
  username: 'tm',
  token: 123,
});

describe('<App />', () => {
  let app;

  describe('when user is logged in', () => {
    beforeEach(() => {
      window.localStorage.setItem('loggedInUser', JSON.stringify(userdata));
      app = mount(<App />); 
    });

    it('it should render blogs fetched from backend', () => {
      app.update();

      const loginFormComponents = app.find('form.login-form');
      expect(loginFormComponents.length).toEqual(0);

      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(3);
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      window.localStorage.clear();
      app = mount(<App />); 
    });

    it('it should display a login form', () => {
      app.update();

      const loginFormComponents = app.find('form.login-form');
      expect(loginFormComponents.length).toEqual(1);

      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(0);
    });
  });

});
