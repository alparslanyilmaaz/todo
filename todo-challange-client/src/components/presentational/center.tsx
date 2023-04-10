import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CreateTodo } from "../functional/create-todo";
import { TodoList } from "../functional/todo-list";
import { WelcomeText } from "./welcome-text";

export const Center = () => {
  const [showAdd, setShowAdd] = useState(false);

  return <>
    <div>
      <WelcomeText />
      <button
        className="flex items-center px-4 py-2 mt-8 bg-white rounded-lg"
        type="button"
        onClick={() => setShowAdd(true)}>
        <FaPlus className="text-[#9b9494]" />
        <p className="ml-4 font-bold">
          Create New TODO
        </p>
      </button>
      <div className="max-w-[70rem] lg:w-full">
        <TodoList />
      </div>
    </div>
    {
      showAdd &&
      <CreateTodo setShowModal={setShowAdd} />
    }
  </>
}