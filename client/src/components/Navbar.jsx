import UserStatus from './UserStatus';

const Navbar = ({ registerFormRef, setShowLoginForm, showLoginForm }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center bg-slate-800 text-white justify-between p-6 w-full">
      <h2 className="text-center text-5xl text-white mt-3 mb-3">
        econo<span className="text-yellow-800">Coder</span>
      </h2>
      <UserStatus
        registerFormRef={registerFormRef}
        setShowLoginForm={setShowLoginForm}
        showLoginForm={showLoginForm}
      />
    </nav>
  );
};

export default Navbar;
