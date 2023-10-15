const Button = ({ className, onClick, type, children }) => {
  return (
    <button
      className={`px-4 py-2 tracking-widest rounded capitalize ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
