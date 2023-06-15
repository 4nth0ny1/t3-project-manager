import { ProjectItem } from "./ProjectItem";
import { api } from "../../utils/api";

export function ProjectList() {
  const { data, isLoading, isError } = api.project.getAllProjects.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      {data?.map((project) => {
        return <ProjectItem key={project.id} project={project} />;
      })}
    </div>
  );
}
