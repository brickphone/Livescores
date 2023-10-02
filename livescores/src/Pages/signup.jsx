import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user", {
        email: email,
        username: username,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response);
      setSuccess(true);
      setErrorMessage("");
    } catch (error) {
      console.error(error.response.data);
      setSuccess(false);
      setErrorMessage("Error occured during signup. Try again.")
    }

  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div id="create-account" className="flex flex-col items-center pt-12">
        <div id="signup-text">
        <div id="signup-text" className="flex items-center">
          <h1 className="font-semibold text-2xl">Create an account</h1>
          <span className="text-2xl ml-2">🚀</span>
        </div>
          <h2 className="">Enter your email below to create your account</h2>
        </div>
        <div id="signup-container" className="pr-2">
        <div id="username" className="flex pt-2 space-y-3">
            <input
              type="text"
              id="user"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div id="email" className="flex pt-2 space-y-3">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email Adress"
              required
            />
          </div>
          <div id="password" className="flex items-center pt-2">
          <input
              type="password"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
            <button 
            type="submit" 
            className="mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sign Up</button>
            <h2>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'blue' }}> Login</Link>
            </h2>
        </div>
        <div id="or" className="flex items-center pt-6">
          <hr className="flex-grow border-t border-gray-400" />
          <h2 className="px-4">Or</h2>
          <hr className="flex-grow border-t border-black-400" /> 
        </div>
      </div>
    </form>
  );
}

export default Signup;
