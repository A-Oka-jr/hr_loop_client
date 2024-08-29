import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 text-lg underline"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
