import { ErrorMessage } from "@hookform/error-message";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetGroups } from "../../services/group/use-get-groups";
import { SelectDropdown, SelectDropdownOption } from "../presentational/select-dropdown";

const inputClassName = 'px-4 py-5 transition-all duration-200 border rounded-md resize-none border-black/20 hover:border-black/40 focus:outline-[#987EFF]';

export interface TodoFormValues {
  groups: SelectDropdownOption[];
  todo: string;
  startDate: string;
  startTime: string;
}

interface Props {
  onSubmitCallback?: (groupIds: string[], todo: string, executionDate: Date) => void;
  defaultValues?: TodoFormValues;
  onDeleteCallback?: () => void;
  showDelete?: boolean;
}
export const TodoForm = ({
  onSubmitCallback,
  defaultValues,
  showDelete = false,
  onDeleteCallback,
}: Props) => {
  const { data: groups } = useGetGroups();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<TodoFormValues>({
    defaultValues: defaultValues || {}
  });

  const onSubmit = useCallback((values: TodoFormValues) => {
    let groupIds: string[] = [];
    if (values?.groups?.length) {
      groupIds = values.groups.map((item) => item.id) as string[];
    }
    const executionDate = new Date(`${values.startDate}T${values.startTime}`);

    onSubmitCallback?.(groupIds, values.todo, executionDate)

  }, [onSubmitCallback]);


  const selectOptions: SelectDropdownOption[] = groups?.map((item) => ({
    value: item.id,
    name: item.name,
    id: item.id
  } as SelectDropdownOption)) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
      <Controller
        control={control}
        name="groups"
        render={({ field: { onChange } }) => (
          <SelectDropdown
            isMulti
            defaultValue={defaultValues?.groups}
            onChange={onChange}
            placeholder="Select Groups"
            options={selectOptions}
          />
        )}
      />
      <div>
        <textarea
          placeholder="What is your next task?"
          className={`${inputClassName} w-full`}
          {
          ...register('todo', {
            required: 'Please provide a value.'
          })
          }
        />
        <ErrorMessage name="todo" errors={errors} />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <input
            type="date"
            min={new Date().toISOString().substr(0, 10)}
            className={`${inputClassName} w-full`}
            {
            ...register('startDate', {
              required: "Please provide a valid date"
            })
            }
          />
          <ErrorMessage name="startDate" errors={errors} />
        </div>
        <div className="w-2/4">
          <input
            type="time"
            className={`${inputClassName} w-full`}
            {
            ...register('startTime', {
              required: 'Please provide a time'
            })
            }
          />
          <ErrorMessage name="startTime" errors={errors} />
        </div>
      </div>
      <div className="flex justify-end w-full gap-4">
        {
          showDelete &&
          <button
            type="button"
            onClick={() => onDeleteCallback?.()}
            className="px-10 py-4 mt-6 text-white bg-red-600 rounded-md">
            Delete
          </button>
        }
        <button
          className="bg-[#987EFF] px-10 rounded-md text-white py-4 mt-6"
          type="submit">
          Save
        </button>
      </div>
    </form>
  )
}