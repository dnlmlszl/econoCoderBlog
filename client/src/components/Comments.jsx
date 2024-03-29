import { useState, useEffect } from 'react';
import CommentsForm from './CommentsForm';
import Button from './Button';
import io from 'socket.io-client';

const Comments = ({ blog }) => {
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState(blog.comments);

  useEffect(() => {
    const socket = io();
    socket.on('commentCreated', (data) => {
      if (data.blogId === blog.id) {
        setComments((prevComments) => [...prevComments, data.comment]);
      }
    });

    return () => {
      socket.close();
    };
  }, [blog.id]);

  return (
    <article className="bg-gray-100 p-4 rounded-md my-4">
      <h3 className="text-left font-medium capitalize text-dynamich2 text-neutral-800 mt-3 mb-5">
        Comment section
      </h3>
      <Button
        onClick={() => setShowComments(!showComments)}
        className="mb-8 bg-neutral-950 text-white text-dynamicbtn rounded hover:bg-neutral-900 focus:outline-none focus:border-neutral-800 focus:ring focus:ring-neutral-200 transition-all duration-300"
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </Button>
      {showComments &&
        comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col justify-center items-start mb-2 p-6 bg-white rounded-md shadow-sm"
          >
            <div className="flex justify-between w-full">
              <p className="text-neutral-700 text-dynamicp">
                {new Date(comment.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-neutral-700 text-dynamicsmall">
                Added by{' '}
                <span className="capitalize font-bold text-dynamicsmall">
                  {comment.user}
                </span>
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md mt-2 w-full">
              <p className="text-neutral-700 text-dynamich4 my-4">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      <CommentsForm blog={blog} blogId={blog.id} />
    </article>
  );
};

export default Comments;
