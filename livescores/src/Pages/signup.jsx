import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <form>
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
              type="username"
              id="user"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              required
            />
          </div>
          <div id="email" className="flex pt-2 space-y-3">
            <input
              type="email"
              id="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email Adress"
              required
            />
          </div>
          <div id="password" className="flex items-center pt-2">
          <input
              type="password"
              id="pass"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
            <button 
            type="button" 
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