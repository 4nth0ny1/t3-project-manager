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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, description });
      }}
      className="flex flex-col bg-slate-400 p-4"
    >
      <h2 className="text-white">Create A New Project</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Describe your project"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Create</button>
    </form>
  );
}
