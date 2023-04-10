import { Dispatch, SetStateAction } from "react";
import { Todo } from "../../models/todo.model";
import { useDeleteTodo } from "../../services/todo/use-delete-todo";
import { useEditTodo } from "../../services/todo/use-edit-todo";
import { ModalWrapper } from "../presentational/modal-wrapper";
import { TodoForm, TodoFormValues } from "./todo-form";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedTodo: Todo;
}

export const EditTodo = ({
  setShowModal,
  selectedTodo
}: Props) => {
  const { mutateAsync: edit } = useEditTodo();
  const { mutateAsync: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      setShowModal(false);
    }
  });

  if (!selectedTodo) {
    setShowModal(false);
    return null;
  }

  const defaultValues: TodoFormValues = {
    startDate: selectedTodo.executionDate.toString(),
    startTime: selectedTodo.parsedTime,
    groups: selectedTodo.groups?.map((item) => {
      return {
        name: item.name,
        value: item.id,
        id: item.id
      }
    }),
    todo: selectedTodo.todo,
  }

  return <ModalWrapper
    title="Edit Todo"
    onCloseCallback={() => setShowModal(false)}>
    <TodoForm
      showDelete
      onDeleteCallback={() => deleteTodo(selectedTodo.id)}
      defaultValues={defaultValues}
      onSubmitCallback={(groupIds, todo, executionDate) => edit({
        id: selectedTodo.id,
        executionDate,
        todo,
        groupIds,
      })}
    />
  </ModalWrapper>
}