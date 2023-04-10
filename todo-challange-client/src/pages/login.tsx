import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthWrapper } from "../components/presentational/auth-wrapper";
import { ErrorMessage } from "../components/presentational/error-message";
import { useLogin } from "../services/auth/use-login";

interface FormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const { handleSubmit, register, setError, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const { mutateAsync: login } = useLogin({
    onSuccess: (res) => {
      navigate('/');
    },
    onError: (err) => {
      setError('password', {
        message: 'Something went wrong!'
      })
    }
  });

  const onSubmit = useCallback((values: FormValues) => {
    login(values);
  }, [login])

  return <AuthWrapper title="Login">
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        className="focus:outline-none bg-[#EFEFEF] rounded-md px-4 py-4 w-80"
        placeholder="Email"
        type="text"
        {
        ...register("email", {
          required: 'Please provide email.',
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Please provide a valid email.",
          },
        })
        } />
      <ErrorMessage name="email" errors={errors} />
      <input
        type="password"
        className="focus:outline-none bg-[#EFEFEF] rounded-md px-4 py-4 w-80"
        placeholder="password"
        {
        ...register('password')
        }
      />
      <ErrorMessage name="password" errors={errors} />
      <Link to={'/register'} className="self-end">
        Don't have an account? Register here
      </Link>
      <button type="submit" className="bg-[#987EFF] text-white w-fit hover:bg-[#796ea5] duration-200 transition-all self-end px-10 py-2 rounded-md" >
        Login
      </button>
    </form>
  </AuthWrapper>
}