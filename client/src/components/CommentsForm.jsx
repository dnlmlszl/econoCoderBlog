import { useState } from 'react';
import { useGlobalContext } from '../context/blogContext';
import blogService from '../services/blogs';
import Button from './Button';

const CommentsForm = ({ blogId }) => {
  const { setNotification } = useGlobalContext();
  const [newContent, setNewContent] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const addComment = async (e) => {
    e.preventDefault();

    setIsCommenting(true);
    try {
      await blogService.createComment(blogId, newContent);
      setNotification({
        message: 'Comment successfully added!',
        type: 'success',
      });
    } catch (error) {
      console.error(error);
      setNotification({
        message: `Error: ${error.response.data.error}`,
        type: 'error',
      });
    } finally {
      setIsCommenting(false);
      setNewContent('');
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };
  return (
    <article className="mt-6">
      <form onSubmit={addComment}>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-center capitalize text-2xl text-slate-500 my-3"
          >
            say your words
          </label>
          <textarea
            value={newContent}
            name="Content"
            id="content"
            rows="6"
            onChange={({ target }) => setNewContent(target.value)}
            className="mt-3 p-2 w-full border rounded-md shadow-sm"
          >
            Add comment here...
          </textarea>
        </div>
        <Button
          type="submit"
          className="my-3 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:border-slate-800 focus:ring focus:ring-slate-200"
        >
          {isCommenting ? <div className="loading-sm" /> : 'Submit'}
        </Button>
      </form>
    </article>
  );
};

export default CommentsForm;
