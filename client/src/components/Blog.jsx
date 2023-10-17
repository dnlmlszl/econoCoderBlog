import { useEffect, useState } from 'react';
import Button from './Button';
import blogService from '../services/blogs';
import { FaThumbsUp, FaTrashAlt } from 'react-icons/fa';
import { useGlobalContext } from '../context/blogContext';
import io from 'socket.io-client';

const Blog = ({ blog }) => {
  const {
    setNotification,
    blogs,
    setBlogs,
    user: blogUser,
  } = useGlobalContext();
  const { author, user, likes, title, url } = blog;

  const [openBlog, setOpenBlog] = useState(false);
  const [newLikes, setNewLikes] = useState(likes);
  const [likedBy, setLikedBy] = useState(blog.likedBy);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const socket = io();

    socket.on('blogLiked', (data) => {
      if (data.blogId === blog.id) {
        setNewLikes(data.likes);
        console.log(data);
      }
    });

    return () => {
      socket.close();
    };
  }, [blog.id]);

  const handleLike = async (blogId) => {
    if (likedBy.includes(blogUser.id)) return;

    const updatedBlog = {
      ...blog,
      likes: newLikes,
    };

    setIsLiking(true);

    try {
      const updated = await blogService.updateBlog(blogId, updatedBlog);
      console.log(updated);

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

  return (
    <section className="mb-4 p-6 bg-white shadow-lg rounded-md">
      <p className="text-2xl text-slate-800 font-bold mb-2">{title} </p>
      <p className="text-slate-700 italic mb-4">Written by: {author}</p>
      {openBlog && (
        <>
          <p className="mb-4 text-slate-800">Created by: {user.name}</p>
          <p className="mb-4 text-slate-800">URL: {url}</p>
          <div className="flex gap-4 items-center my-6">
            <p className="mb-4 text-slate-800">Likes: {newLikes}</p>
            <Button
              onClick={() => handleLike(blog.id)}
              className="flex items-center gap-2 px-3 py-1 bg-slate-800 text-yellow-600 hover:bg-gray-800 transition-all duration-300 mb-4 rounded-md"
              disabled={isLiking || likedBy.includes(blogUser.id)}
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
            {blogUser.id === blog.user.id && (
              <Button
                className="mb-4 flex items-center gap-2 px-3 py-1 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-md"
                onClick={() => handleDelete(blog.id)}
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
        </>
      )}
      <Button
        className="text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200"
        onClick={() => setOpenBlog((op) => !op)}
      >
        {openBlog ? 'Close' : 'View details'}
      </Button>
    </section>
  );
};

export default Blog;
