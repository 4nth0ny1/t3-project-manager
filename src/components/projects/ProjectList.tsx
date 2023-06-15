import { ProjectItem } from "./ProjectItem";
import { api } from "../../utils/api";
import { CreateProject } from "./CreateProject";

export function ProjectList() {
  const { data, isLoading, isError } = api.project.getAllProjects.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      <CreateProject />
      <div className="flex flex-row flex-wrap gap-4">
        {data?.map((project) => {
          return <ProjectItem key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
