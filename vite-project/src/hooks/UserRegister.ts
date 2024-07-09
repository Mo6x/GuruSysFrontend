import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RegisterFormData, RegisterResponse } from "../Types/Registertypes";


const useRegister = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: ""
  });
  
  const navigate = useNavigate();

  const registerMutation = useMutation<RegisterResponse, Error, RegisterFormData>(
    async (userData: RegisterFormData) => {
      const response = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_BASE_URL}api/auth/register`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("User registered successfully");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.message || "Error registering user");
      }
    }
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return {
    formData,
    isLoading: registerMutation.isLoading,
    isError: registerMutation.isError,
    isSuccess: registerMutation.isSuccess,
    error: registerMutation.error,
    handleInputChange,
    handleSubmit,
  };
};

export default useRegister;
