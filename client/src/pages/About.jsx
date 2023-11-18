import socialBg from '../assets/social.jpg';
import writeBg from '../assets/writing.jpg';

const About = () => {
  return (
    <section className="flex justify-center items-center min-h-fit mt-32 mb-12 lg:mb-0">
      <div
        className="rounded-xl p-6 border-2 border-gray-300 shadow-lg mx-8"
        style={{ width: '80vw' }}
      >
        <div className="flex flex-col lg:flex-row">
          <article className="lg:w-1/2 lg:border-r-2 border-white p-4">
            <h1 className="text-2xl lg:text-3xl text-gray-300 font-bold mb-4">
              Why econo<span className="text-yellow-800">Coder</span>?
            </h1>
            <p className="mb-4 text-gray-300">
              Welcome to our blog, econo
              <span className="text-yellow-800">Coder</span>, where we share the
              latest news of writing and social life. Let's connect and get know
              more about our authors and how we deal with building strong
              community with the power of words.
            </p>
            <img src={writeBg} alt="ghostwriting" className="rounded-lg mb-4" />
            <p className="text-gray-300">
              Whether it's creative writing or social issues, here you'll find
              the content you're most interested in.
            </p>
          </article>
          <article className="lg:w-1/2 p-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-300 mb-4">
              Join us today!
            </h2>
            <p className="mb-4 text-gray-300">
              Discover how you can support and be a part of our community! There
              are lots of advantages beeing a member of econo
              <span className="text-yellow-800">Coder</span>.
            </p>
            <img src={socialBg} alt="social life" className="rounded-lg mb-4" />
            <p className="text-gray-300">
              Active community life, exciting events and inspiring
              conversations. Join us!
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
