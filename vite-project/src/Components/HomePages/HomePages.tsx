import React, { useState } from "react";
import RegisterForm from "../Authentication/Registers/Registers";
import LoginForm from "../Authentication/Logins/Logins";
import welcomeImage from "../../assets/blogimage.png"; 


export const HomePages: React.FC = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="flex flex-row items-center justify-center bg-white shadow-md rounded px-40 py-20">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">GuruSys Assessment</h2>
          <img src={welcomeImage} alt="Welcome" className="rounded-lg shadow-md w-40" />
        </div>
        <div className="max-w-md">
          {isRegister ? (
            <>
              <RegisterForm />
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  Login
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  Register
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePages;
