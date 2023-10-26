import { set } from "mongoose";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();

  // Resetting password/user field
  const inputSelect = async (e) => {
    e.preventDefault();
    setIncorrect(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          pass: password,
        }),
      });

      console.log("Response from server:", response);

      if (response.ok) {
        console.log("Login successful");

        const data = await response.json();
        const token = data.token;
        // Store locally
        localStorage.setItem("token", token);
        navigate(`/login/success?token=${token}`);
      } else {
        const errorData = await response.json();
        console.log("Login failed:", error, errorData);

        // Display input field as "incorrect"
        setIncorrect(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred");
    }
  }

  return (
    <div id="create-account" className="flex flex-col items-center pt-12">
      <div id="signup-text" className="pr-24">
        <div id="signup-text" className="flex items-center">
          <h1 className="font-semibold text-2xl">Login</h1>
          <span className="text-2xl ml-2">🔐</span>
        </div>
        <h2 className="">Enter your details below to login</h2>
      </div>
      <div id="signup-container" className="pr-2">
        <div id="username" className="flex pt-2 space-y-3">
          <input
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            id="email-user"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email or Username"
            required
          />
        </div>
        <div id="password" className="flex flex-col items-center pt-2">
          {incorrect === true ? (
            <>
              <div>
                <input
                  type="password"
                  id="pass"
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={inputSelect}
                  className="border border-red-500 text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Incorrect password</span>
                </p>
              </div>
            </>
          ) : (
            <input
              type="password"
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
            />
          )}
        </div>
        <button
          type="submit"
          className="mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={handleSubmit} // Moved the onSubmit to the button
        >
          Login
        </button>
        <h2>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'blue' }}> Sign Up</Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
