import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaPlusCircle } from 'react-icons/fa';
import { usePostGroup } from "../../services/group/use-post-group";
import { ErrorMessage } from "../presentational/error-message";

interface FormValues {
  groupName: string;
}

export const CreateGroup = () => {
  const { mutateAsync: postGroup } = usePostGroup({
    onSuccess: () => {
      reset();
    }
  });
  const { register, handleSubmit, formState: { errors, isDirty }, getValues, reset } = useForm<FormValues>();

  const onSubmit = useCallback((values: FormValues) => {
    postGroup({
      color: "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16) }),
      name: values.groupName
    });
  }, [postGroup]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center w-full mt-4">
        <div>
          <FaPlusCircle color="#B09A9A" />
        </div>
        <div className="w-full">
          <input
            className="w-full pl-4 focus:outline-none"
            placeholder="Add new Group"
            {...register('groupName', {
              required: 'Please provide a name'
            })}
          />
        </div>
        {
          isDirty && getValues('groupName') &&
          <button type="submit" className="p-1 text-white bg-green-600 rounded-full">
            <FaCheck />
          </button>
        }
      </form>
      <ErrorMessage name="groupName" errors={errors} />
    </>
  )
}