import type { Todo } from "../../types";
import dayjs from "dayjs";
// import Link from "next/link";
import { api } from "~/utils/api";

type TodoProps = {
  todo: Todo;
};

dayjs().format("L LT");

export function TodoItem({ todo }: TodoProps) {
  const { id, name, description, createdAt } = todo;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.todo.deleteTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
    },
  });

  return (
    <>
      <div className="card w-72 bg-base-100 shadow-lg">
        <div className="card-body">
          {/* <Link href={`/project/${id}`}> */}
          <h2 className="card-title">{name}</h2> {/* </Link> */}
          <p>{description}</p>
          <div className="card-actions justify-end">
            <span className="font-thin italic">{` Created ${dayjs(
              createdAt
            ).format("MM/DD/YYYY")}`}</span>
          </div>
          <button onClick={() => deleteMutation(id)}>delete</button>
        </div>
      </div>
    </>
  );
}
