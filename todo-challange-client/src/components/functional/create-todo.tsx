import { Dispatch, SetStateAction } from "react";
import { useCreateTodo } from "../../services/todo/use-create-todo";
import { ModalWrapper } from "../presentational/modal-wrapper";
import { TodoForm } from "./todo-form";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateTodo = ({ setShowModal }: Props) => {
  const { mutateAsync: createTodo } = useCreateTodo({
    onSuccess: () => {
      setShowModal(false);
    },
    onError: () => {
    }
  });

  return <ModalWrapper
    title="Create Todo"
    onCloseCallback={() => setShowModal(false)}>
    <TodoForm
      onSubmitCallback={(groupIds, todo, executionDate) => createTodo({
        executionDate,
        todo,
        groupIds,
      })}
    />
  </ModalWrapper>
}