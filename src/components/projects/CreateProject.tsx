import { api } from "../../utils/api";
import { useState } from "react";

export function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const ctx = api.useContext();

  const { mutate } = api.project.createProject.useMutation({
    onSettled: async () => {
      await ctx.project.getAllProjects.invalidate();
      setName("");
      setDescription("");
    },
  });
  return (
    <div className="flex flex-row justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ name, description });
        }}
        className="flex flex-col gap-2 p-4 sm:w-full lg:w-[700px]"
      >
        <h2 className="text-white">Create A New Project</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-bordered input w-full border-2 border-slate-400"
        />
        <input
          type="text"
          placeholder="Describe your project"
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
