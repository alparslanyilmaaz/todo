import { isEmpty } from "lodash";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { Todo } from "../../models/todo.model";
import { useCompleteTodo } from "../../services/todo/use-complete-todo";
import { useGetTodos } from "../../services/todo/use-get-todo";
import { EditTodo } from "./edit-todo";

interface IParsedTodo {
  [key: string]: Todo[];
}

export const TodoList = () => {
  const { data: todos, isLoading } = useGetTodos();

  if (!todos && isLoading) return null;
  /** 
   * Parse todos by date
   * 
   * Example: 
   * 
   * {
   *    "Today": Todo[],
   *    "Tomorrow": Todo[],
   * ....
   * } 
   * 
   * @type {*} 
   */
  const parsedTodos = todos?.reduce((acc: IParsedTodo, obj: Todo) => {
    const key = obj.parsedDate;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  return !isEmpty(parsedTodos) ? (
    <div>
      {Object.keys(parsedTodos).map((item) => {
        return <div key={item} className="mt-9">
          <p className="text-2xl font-bold text-white">{item}</p>
          <div>
            {
              parsedTodos[item]?.map((parsedTodo) => {
                return <ListItem todo={parsedTodo} key={parsedTodo.id} />
              })
            }
          </div>
        </div>
      })}
    </div>
  ) : null;
};

interface ListItemProps {
  todo: Todo;
}

const ListItem = ({ todo }: ListItemProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const { mutateAsync: completeTodo } = useCompleteTodo();

  return <>
    <div className="flex items-center gap-4">
      <div
        onClick={() => setShowEdit(true)}
        className={`flex items-center justify-between w-full px-5 py-4 mt-4 ${todo.isCompleted ? 'bg-white/60' : 'bg-white'} rounded-lg cursor-pointer`}>
        <p className="description-text-3">{todo.todo}</p>
        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-4 mx-4 w-14">
            {
              todo?.groups.map((item) => {
                return <div
                  data-tooltip-id="todo-group"
                  data-tooltip-content={item.name}
                  className="w-2 h-2 col-span-1 rounded-full"
                  style={{
                    backgroundColor: item.color
                  }} />
              })
            }
          </div>
          <Tooltip id="todo-group" />
          <p>{todo.parsedTime}</p>
        </div>
      </div>
      <div className="mt-5">
        <button
          className={`flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full ${todo.isCompleted ? 'bg-green-600 hover:bg-red-600' : 'bg-none hover:bg-green-600 '} group`}
          onClick={() => completeTodo({ id: todo.id, isCompleted: !todo.isCompleted })}>
          <FaCheck className={`text-white ${todo.isCompleted ? 'flex group-hover:hidden' : 'hidden group-hover:flex'}`} />
          <IoMdClose color="#fff" className={` text-lg text-white ${todo.isCompleted ? 'hidden group-hover:flex' : 'hidden group-hover:hidden'}`} />
        </button>
      </div>
    </div>
    {
      showEdit && <EditTodo
        setShowModal={setShowEdit}
        selectedTodo={todo}
      />
    }
  </>
}