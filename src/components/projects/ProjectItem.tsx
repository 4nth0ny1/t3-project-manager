import type { Project } from "../../types";
import dayjs from "dayjs";
import Link from "next/link";

type ProjectProps = {
  project: Project;
};

dayjs().format("L LT");

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description, createdAt } = project;
  return (
    <>
      <Link href={`/project/${id}`}>
        <div className="card w-72 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            <div className="card-actions justify-end">
              <span className="font-thin italic">{` Created ${dayjs(
                createdAt
              ).format("MM/DD/YYYY")}`}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
