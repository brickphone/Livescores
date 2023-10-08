import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/login"), 3000)
  });
  
  return (
    <div id="error-container" className="font-bold flex flex-col items-center text-center pt-44 space-y-2">
      <div className="flex items-center">
        <h1 className="text-4xl">Success</h1>
      <span className="text-3xl pl-2">✅</span>
      </div>
      <h2 className="text-xl">Your account has been registered, redirecting to login page</h2>
    </div>
  )
}

export default RegisterSuccess;