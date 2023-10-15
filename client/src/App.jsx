import { useEffect, useRef, useState } from 'react';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import AddBlogForm from './components/AddBlogForm';
import BlogList from './components/Bloglist';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useGlobalContext } from './context/blogContext';

function App() {
  const { user } = useGlobalContext();

  const blogFormRef = useRef();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-start pt-[120px]">
        <Notification />
        <Sidebar blogFormRef={blogFormRef} />
        {user === null ? (
          <LoginForm />
        ) : (
          <section className="p-6 sm:p-12 mb-4 flex flex-col">
            <Togglable buttonLabel="add new blog" ref={blogFormRef}>
              <AddBlogForm blogFormRef={blogFormRef} />
            </Togglable>
            <BlogList />
          </section>
        )}
      </main>
    </>
  );
}

export default App;
