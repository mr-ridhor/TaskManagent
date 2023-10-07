import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div>
        <p className="text-4xl font-bold">Task Management</p>
      </div>
      <div className="flex text-lg gap-10">
        <Link to={"/auth/login"}>Login</Link>
        <Link to={"/auth/register"}>Register</Link>
      </div>
    </div>
  );
};

export default HomePage;