import React from 'react';
import { shallow, mount } from 'enzyme';
import Blog from './Blog';

describe('<Blog />', () => {

  it('renders content', () => {
    const testData = ({
      blog: {
        title: 'blog title',
        author: 'blog author',
        likes: 7,
      },
      toggleBlog: () => null,
      likeBlog: () => null,
      deleteBlog: () => null,
      username: 'test'
    });

    const blogComponent = shallow(<Blog {...testData} />);
    const headerDiv = blogComponent.find('.blog-header');

    expect(headerDiv.text()).toContain(testData.blog.title);
    expect(headerDiv.text()).toContain(testData.blog.author);
  });

  it('shows more info when clicked', () => {
    const toggleBlog = jest.fn();

    const testData = ({
      blog: {
        title: 'blog title',
        author: 'blog author',
        likes: 7,
      },
      toggleBlog,
      likeBlog: () => null,
      deleteBlog: () => null,
      username: 'test'
    });

    const blogComponent = mount(<Blog {...testData} />);
    expect(blogComponent.text()).not.toContain('likes');

    const expandBlogButton = blogComponent.find('div.blog-header');

    expandBlogButton.simulate('click');

    if(toggleBlog.mock.calls.length === 1) {
      blogComponent.setProps({ blog: {
        title: 'blog title',
        author: 'blog author',
        like: 7,
        expanded: true,
      }});
    }

    const likesAfter = blogComponent.find('span.blog-likes');

    expect(likesAfter.text()).toContain('likes');
  });
});
