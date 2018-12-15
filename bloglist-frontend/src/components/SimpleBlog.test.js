import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {

  it('renders content', () => {
    const testData = ({
      blog: {
        title: 'blog title',
        author: 'blog author',
        likes: 7,
      },
      onClick: () => null
    });

    const blog = shallow(<SimpleBlog {...testData} />);
    const headerDiv = blog.find('.blog-header');
    const detailsDiv = blog.find('.blog-details');

    expect(headerDiv.text()).toContain(testData.blog.title);
    expect(headerDiv.text()).toContain(testData.blog.author);

    expect(detailsDiv.text()).toContain(`blog has ${testData.blog.likes} likes`);
  });

  it('it calls click handler on click', () => {
    const mockHandler = jest.fn();

    const blogData = ({
      title: 'blog title',
      author: 'blog author',
      likes: 7,
    });


    const blogComponent = shallow(<SimpleBlog blog={blogData} onClick={mockHandler} />);
    const button = blogComponent.find('button.like-button');

    expect(mockHandler.mock.calls.length).toBe(0);

    button.simulate('click');
    button.simulate('click');

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
