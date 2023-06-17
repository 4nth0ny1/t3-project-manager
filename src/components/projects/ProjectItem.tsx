import type { Project } from "../../types";
import dayjs from "dayjs";
import Link from "next/link";
import { api } from "~/utils/api";
import { IoTrashBinSharp } from "react-icons/io5";

type ProjectProps = {
  project: Project;
};

dayjs().format("L LT");

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description, createdAt } = project;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.project.deleteProject.useMutation({
    onSettled: async () => {
      await ctx.project.getAllProjects.invalidate();
    },
  });

  return (
    <>
      <div className="card w-72 bg-base-100 shadow-lg">
        <div className="card-body">
          <Link href={`/project/${id}`}>
            <h2 className="card-title">{name}</h2>{" "}
          </Link>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <span className="font-thin italic">{` Created ${dayjs(
              createdAt
            ).format("MM/DD/YYYY")}`}</span>
          </div>
          <div className="flex flex-row justify-end">
            <button
              className="pr-1 text-2xl text-error"
              onClick={() => deleteMutation(id)}
            >
              <IoTrashBinSharp />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
