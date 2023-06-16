import { api } from "../../utils/api";
import { useState } from "react";

type ProjectIdProps = {
  projectId: string;
};

export function CreateTodo({ projectId }: ProjectIdProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const ctx = api.useContext();

  const { mutate } = api.todo.createTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
      setName("");
      setDescription("");
    },
  });

  return (
    <div className="flex flex-row justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ name, description, projectId });
        }}
        className="flex flex-col gap-2 p-4 sm:w-full lg:w-[700px]"
      >
        <h2 className="text-white">Create A New Todo</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-bordered input w-full border-2 border-slate-400"
        />
        <input
          type="text"
          placeholder="Describe your todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-bordered input w-full border-2 border-slate-400"
        />
        <div className="flex flex-row justify-end">
          <button className="btn-accent btn w-1/5">Create</button>
        </div>
      </form>
    </div>
  );
}
