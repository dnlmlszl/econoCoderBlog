import { useState, forwardRef, useImperativeHandle } from 'react';
import Button from './Button';
import { AiOutlineClose } from 'react-icons/ai';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div className={`${visible ? 'block' : 'hidden'}`}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          className="fixed top-[135px] right-3 my-3 bg-yellow-600 hover:bg-yellow-700 hover:animate-bounce text-white transition-all duration-300 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-slate-200"
        >
          <AiOutlineClose size={24} />
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
