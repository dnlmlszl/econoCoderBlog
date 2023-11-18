import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';
import mainBg from '../assets/main.png';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <main
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <Sidebar />
      <div className="flex-1">
        <Notification />
        <section className="px-8 py-4 my-0 mx-auto max-w-6xl w-[95vw]">
          {isPageLoading ? <div className="loading" /> : <Outlet />}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default HomeLayout;
