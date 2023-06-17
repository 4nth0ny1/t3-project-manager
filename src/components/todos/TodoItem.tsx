import type { Todo } from "../../types";
import dayjs from "dayjs";
import Link from "next/link";
import { api } from "~/utils/api";
import { IoTrashBinSharp } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";

type TodoProps = {
  todo: Todo;
};

dayjs().format("L LT");

export function TodoItem({ todo }: TodoProps) {
  const [showDescription, setShowDescription] = useState(false);
  const { id, name, description, createdAt } = todo;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.todo.deleteTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
    },
  });

  return (
    <div className="flex w-[800px] flex-col rounded-xl border border-accent p-2 shadow-lg">
      <div className="flex flex-row justify-between gap-4">
        <h2 onClick={() => setShowDescription(!showDescription)}>{name}</h2>

        <span className="font-thin italic">{` Created ${dayjs(createdAt).format(
          "MM/DD/YYYY"
        )}`}</span>

        <div className="flex flex-row justify-between">
          <button className="pr-2 text-2xl text-warning">
            <BiEdit />
          </button>
          <button
            className="pr-1 text-2xl text-error"
            onClick={() => deleteMutation(id)}
          >
            <IoTrashBinSharp />
          </button>
          {showDescription ? (
            <div
              onClick={() => setShowDescription(!showDescription)}
              className="text-3xl"
            >
              <MdKeyboardArrowUp />
            </div>
          ) : (
            <div
              onClick={() => setShowDescription(!showDescription)}
              className="text-3xl"
            >
              <MdKeyboardArrowDown />
            </div>
          )}
        </div>
      </div>
      <div className="">{showDescription && <p>{description}</p>}</div>
    </div>
  );
}
