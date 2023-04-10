import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthWrapper } from "../components/presentational/auth-wrapper";
import { ErrorMessage } from "../components/presentational/error-message";
import { useRegister } from "../services/auth/use-register";

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: registerFn } = useRegister({
    onSuccess: (args) => {
      navigate('/');
    },
    onError: (args) => {
      setError('passwordConfirm', {
        message: 'Something went wrong.'
      })
    }
  });

  const { handleSubmit, register, formState: { errors }, getValues, setError } = useForm<FormValues>();

  const onSubmit = useCallback((values: FormValues) => {
    registerFn({
      email: values.email,
      password: values.password
    })
  }, [registerFn]);

  return <AuthWrapper title="Register">
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
        placeholder="Password"
        {
        ...register('password',
          {
            required: 'Please provide password',
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters"
            }
          })
        }
      />
      <ErrorMessage name="password" errors={errors} />

      <input
        type="password"
        className="focus:outline-none bg-[#EFEFEF] rounded-md px-4 py-4 w-80"
        placeholder="Password Confirm"
        {
        ...register('passwordConfirm', {
          validate: value =>
            value === getValues('password') || "The passwords do not match"
        })
        }
      />
      <ErrorMessage name="passwordConfirm" errors={errors} />

      <Link to={'/login'} className="self-end">
        Already have an account?
      </Link>
      <button type="submit" className="bg-[#987EFF] text-white w-fit hover:bg-[#796ea5] duration-200 transition-all self-end px-10 py-2 rounded-md" >
        Register
      </button>
    </form>
  </AuthWrapper>
}