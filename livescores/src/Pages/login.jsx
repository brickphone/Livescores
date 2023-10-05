const Login = () => {

  return (
    <form>
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
              type="email"
              id="email-user"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email or Username"
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
            type="submit" 
            className="mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Login</button>
        </div>
        <div id="or" className="flex items-center pt-6">
          <hr className="flex-grow border-t border-gray-400" />
          <h2 className="px-4">Or</h2>
          <hr className="flex-grow border-t border-black-400" /> 
        </div>
      </div>
    </form>
  )
}

export default Login;