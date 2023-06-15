import type { Project } from "../../types";

type ProjectProps = {
  project: Project;
};

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description } = project;
  return (
    <div>
      <button className="btn-neutral btn">{name}</button>
    </div>
  );
}
