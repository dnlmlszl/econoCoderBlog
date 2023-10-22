import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Blog from '../src/components/Blog';
import AddBlogForm from '../src/components/AddBlogForm';
import { BlogProvider, useGlobalContext } from '../src/context/blogContext.jsx';

jest.mock('../src/context/blogContext', () => {
  const originalModule = jest.requireActual('../src/context/blogContext');
  return {
    ...originalModule,
    useGlobalContext: jest.fn(),
  };
});

const mockContextValue = {
  setNotification: jest.fn(),
  setBlogs: jest.fn(),
  isLoading: false,
  setIsLoading: jest.fn(),
  // ... egyéb szükséges értékek és függvények
};

useGlobalContext.mockReturnValue(mockContextValue);

test('renders blog title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
  };

  const component = render(
    <BlogProvider value={mockContextValue}>
      <Blog blog={blog} />
    </BlogProvider>
  );

  expect(component.getByText('Test Blog')).toBeInTheDocument();
  expect(component.getByText('Written by: Test Author')).toBeInTheDocument();
  expect(component.queryByText('URL:')).not.toBeInTheDocument();
  expect(component.queryByText('Likes:')).not.toBeInTheDocument();
});
// #2
test('shows URL and likes when the details button is clicked', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
  };

  const component = render(
    <BlogProvider value={mockContextValue}>
      <Blog blog={blog} />
    </BlogProvider>
  );
  const button = component.getByText('View details');
  fireEvent.click(button);

  expect(component.getByText('URL: http://test.com')).toBeInTheDocument();
  expect(component.getByText('Likes: 5')).toBeInTheDocument();
});
// #3
test('clicking the like button twice calls the event handler twice', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
  };

  const mockHandler = jest.fn();

  const component = render(
    <BlogProvider value={mockContextValue}>
      <Blog blog={blog} handleLike={mockHandler} />
    </BlogProvider>
  );
  const button = component.getByText('Like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

// #4
test('form calls the event handler with the right details when a new blog is created', () => {
  const createBlog = jest.fn();

  const component = render(
    <BlogProvider value={mockContextValue}>
      <AddBlogForm createBlog={createBlog} />{' '}
    </BlogProvider>
  );
  const input = component.container.querySelector('input');
  const form = component.container.querySelector('form');

  fireEvent.change(input, { target: { value: 'testing form...' } });
  fireEvent.submit(form);

  expect(createBlog.mock.calls[0][0].title).toBe('testing form...');
});
