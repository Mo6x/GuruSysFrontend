import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import useRegister from "../../../hooks/UserRegister";


const RegisterForm: React.FC = () => {
  const {
    formData,
    isLoading,
    isError,
    isSuccess,
    error,
    handleSubmit,
    handleInputChange,
  } = useRegister();

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <div className="relative flex flex-row">
            <span className="absolute top-2 left-2">
              <HiOutlineUser className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="text"
              name="username"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <div className="relative">
            <span className="absolute top-2 left-2">
              <HiOutlineMail className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <div className="relative">
            <span className="absolute top-2 left-2">
              <HiOutlineLockClosed className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
        {isError && <p className="text-red-500 text-xs italic mt-2">{error?.message || 'Error registering user'}</p>}
        {isSuccess && <p className="text-green-500 text-xs italic mt-2">User registered successfully</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
