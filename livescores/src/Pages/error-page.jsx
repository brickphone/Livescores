import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);


  return (
    <div id="error-container" className="flex justify-items-center">
      <h1>404 ERROR</h1>
    </div>
  )
}

export default ErrorPage