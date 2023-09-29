import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error("error: ", error);

  return (
    <div id="error-container" className="font-bold flex flex-col items-center text-center pt-10 space-y-2">
      <div className="flex items-center">
        <h1 className="text-4xl">404</h1>
      <span className="text-3xl pl-2">☠️</span>
      </div>
      <h2 className="text-xl">The page you are looking for does not exist</h2>
    </div>
  );
};

export default ErrorPage;
