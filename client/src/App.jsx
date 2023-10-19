import { useRef, useState } from 'react';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import BlogList from './components/Bloglist';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useGlobalContext } from './context/blogContext';
import RegisterForm from './components/RegisterForm';

function App() {
  const { user } = useGlobalContext();
  const [showLoginForm, setShowLoginForm] = useState(true);

  const blogFormRef = useRef();
  const registerFormRef = useRef();

  return (
    <>
      <Navbar
        buttonLabel="register"
        registerFormRef={registerFormRef}
        setShowLoginForm={setShowLoginForm}
        showLoginForm={showLoginForm}
      />
      <main className="min-h-screen flex flex-col justify-start pt-[120px]">
        <Notification />
        <Sidebar blogFormRef={blogFormRef} />
        {user === null ? (
          <section className="p-6 sm:p-12 mb-4 flex flex-col">
            {showLoginForm ? <LoginForm /> : null}
            <Togglable ref={registerFormRef}>
              <RegisterForm />
            </Togglable>
          </section>
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
