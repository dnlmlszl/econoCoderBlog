import { useEffect, useState } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGlobalContext } from '../context/blogContext';
import Comments from '../components/Comments';
import Button from '../components/Button';
import blogService from '../services/blogs';
import axios from 'axios';
import io from 'socket.io-client';
import { FaThumbsUp, FaTrashAlt } from 'react-icons/fa';

const singleBlogQuery = (id) => {
  return {
    queryKey: ['blog', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/v1/blogs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    try {
      await queryClient.ensureQueryData(singleBlogQuery(id));
    } catch (error) {
      if (error.response.status === 401) {
        return redirect('/');
      }
      console.error(error);
    }

    return { id };
  };

const SingleBlogPage = () => {
  const {
    setNotification,
    blogs,
    setBlogs,
    user: blogUser,
  } = useGlobalContext();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['blogs'] });

  const loaderData = useLoaderData();

  if (!loaderData || !loaderData?.id) {
    navigate('/');
    return null;
  }
  const { id } = loaderData;

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery(singleBlogQuery(id));

  useEffect(() => {
    if (!blog || isError) {
      setNotification({
        message: error.message,
        type: 'error',
      });
      const timer = setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError, error, setNotification]);

  const [newLikes, setNewLikes] = useState(blog?.likes || 0);
  const [likedBy, setLikedBy] = useState(blog?.likedBy || []);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!blog) return;

    const socket = io();

    socket.on('blogLiked', (data) => {
      if (data.blogId === blog.id) {
        setNewLikes(data.likes);
      }
    });

    socket.on('blogDeleted', (data) => {
      if (data.blogId === blog?.id) {
        const updatedBlogs = blogs.filter((b) => b.id !== data.blogId);
        setBlogs(updatedBlogs);
      }
    });

    return () => {
      socket.close();
    };
  }, [blog, setBlogs, blogUser, setNotification]);

  const handleLike = async (blogId) => {
    if (likedBy.includes(blogUser.id)) return;

    const updatedBlog = {
      ...blog,
      likes: newLikes,
    };

    setIsLiking(true);

    try {
      const updated = await blogService.updateBlog(blogId, updatedBlog);

      setNewLikes((prevLikes) => prevLikes);
      setLikedBy((prevLikedBy) => [...prevLikedBy, blogUser.id]);
    } catch (error) {
      setNotification({
        message: `Error: ${error.response.data.error}`,
        type: 'error',
      });
    } finally {
      setIsLiking(false);
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`))
      try {
        setIsDeleting(true);
        await blogService.deleteBlog(blogId);
        const updatedBlogs = blogs.filter((b) => b.id !== blogId);
        setBlogs(updatedBlogs);
        navigate('/');
        setNotification({
          message: `Successfully deleted blog ${blog.title}`,
          type: 'success',
        });
      } catch (error) {
        setNotification({
          message: `Error: ${error.response.data.error}`,
          type: 'error',
        });
      } finally {
        setIsDeleting(false);
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      }
  };

  if (isLoading) return <div className="loading" />;

  return (
    <section className="mb-4 p-6 bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-md mt-24">
      <p className="text-dynamich3 text-gray-300 font-bold mb-2">
        {blog?.title}
      </p>
      <p className="text-gray-300 text-dynamicp italic mb-4">
        Written by: {blog?.author}
      </p>

      <>
        <p className="mb-4 text-dynamicp text-gray-300">
          Created by: {blog?.user?.username}
        </p>
        <p className="mb-4 text-dynamicp text-gray-300">URL: {blog?.url}</p>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center my-2 sm:my-6">
          <p className="mb-2 sm:mb-4 text-dynamicp text-gray-300">
            Likes: {newLikes}
          </p>
          <Button
            onClick={() => handleLike(blog?.id)}
            className="flex items-center gap-2 px-3 py-1 bg-slate-800 text-yellow-600 text-dynamicbtn hover:bg-gray-800 transition-all duration-300 mb-2 sm:mb-4 rounded-md"
            disabled={isLiking || blog?.likedBy?.includes(blogUser?.id)}
          >
            {isLiking ? (
              <div className="loading-sm" />
            ) : (
              <>
                <FaThumbsUp size={16} />
                <span>Like</span>
              </>
            )}
          </Button>
          {blogUser?.id === blog?.user?.id && (
            <Button
              className="mb-4 flex items-center gap-2 px-3 py-1 text-white text-dynamicbtn bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-md"
              onClick={() => handleDelete(blog?.id)}
            >
              {isDeleting ? (
                <div className="loading-sm" />
              ) : (
                <>
                  <FaTrashAlt size={16} />
                  <span>Delete</span>
                </>
              )}
            </Button>
          )}
        </div>
        <Comments blog={blog} />
      </>
    </section>
  );
};

export default SingleBlogPage;
