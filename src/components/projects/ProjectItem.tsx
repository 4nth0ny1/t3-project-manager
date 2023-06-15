import type { Project } from "../../types";

type ProjectProps = {
  project: Project;
};

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description } = project;
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
