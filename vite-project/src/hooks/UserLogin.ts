import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginFormData, LoginResponse } from "../Types/LoginTypes";


const useLogin = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  
  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse, Error, LoginFormData>(
    async (userData: LoginFormData) => {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Login successful");
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message || "Error logging in");
      }
    }
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return {
    formData,
    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
    isSuccess: loginMutation.isSuccess,
    error: loginMutation.error,
    handleInputChange,
    handleSubmit,
  };
};

export default useLogin;
