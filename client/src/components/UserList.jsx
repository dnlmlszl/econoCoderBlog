import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const UserList = ({ users, blogUser, isLoading }) => {
  const queryClient = useQueryClient();

  let displayedUsers = users;

  blogUser && blogUser.role === 'user'
    ? (displayedUsers = users.filter((user) => user.name === blogUser.name))
    : (displayedUsers = users);

  if (isLoading) return <div className="loading" />;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8 mb-4">
      {displayedUsers.map((user) => (
        <li
          key={user.id}
          className="p-4 bg-white bg-opacity-10 backdrop-blur-md border border-gray-300 rounded shadow"
        >
          <h3 className="font-bolder text-dynamich3 mb-2">Name: {user.name}</h3>
          <p className="mb-1 text-dynamicp">Username: {user.username}</p>
          <p className="mb-2 text-dynamicp">Email: {user.email}</p>
          <Link
            to={`/users/${user.id}`}
            className="inline-block mb-4 text-gray-300 hover:text-white transition duration-300"
          >
            More
          </Link>
          <article>
            <h4 className="font-bold text-dynamich4 my-2">Blogs:</h4>
            {user?.blogs?.map((blog) => (
              <article key={blog.id} className="mb-2">
                <p className="mb-2 text-dynamicp">{blog.author}:</p>
                <div className="flex items-center justify-between">
                  <p className="text-dynamicp">{blog.title}</p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    Visit
                  </Link>
                </div>
              </article>
            ))}
          </article>
          <p className="mt-4 text-dynamicp">
            No of comments: {user?.comments?.length || 0}
          </p>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
