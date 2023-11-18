import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { loader as singleBlogLoader } from './pages/SingleBlogPage';
import { loader as blogListLoader } from './pages/Landing';
import { loader as usersLoader } from './pages/UsersPage';
import { loader as userLoader } from './pages/SingleUser';

import {
  HomeLayout,
  About,
  Error,
  SinglePageError,
  Landing,
  SingleBlogPage,
  NewBlog,
  LoginPage,
  RegisterPage,
  UsersPage,
  SingleUser,
} from './pages';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 5 * 1000,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          loader: blogListLoader(queryClient),
          errorElement: <SinglePageError />,
        },
        {
          path: 'about',
          element: <About />,
          errorElement: <SinglePageError />,
        },
        {
          path: 'blog/new',
          element: (
            <PrivateRoute>
              <NewBlog />
            </PrivateRoute>
          ),
          errorElement: <SinglePageError />,
        },
        {
          path: 'blog/:id',
          element: <SingleBlogPage />,
          loader: singleBlogLoader(queryClient),
          errorElement: <SinglePageError />,
        },
        {
          path: 'users',
          element: <UsersPage />,
          loader: usersLoader(queryClient),
          errorElement: <SinglePageError />,
        },
        {
          path: 'users/:id',
          element: <SingleUser />,
          loader: userLoader(queryClient),
          errorElement: <SinglePageError />,
        },
      ],
    },
    { path: 'login', element: <LoginPage />, errorElement: <Error /> },
    { path: 'register', element: <RegisterPage />, errorElement: <Error /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
