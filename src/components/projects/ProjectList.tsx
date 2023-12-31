import { ProjectItem } from "./ProjectItem";
import { api } from "../../utils/api";
import { CreateProject } from "./CreateProject";

export function ProjectList() {
  const { data, isLoading, isError } = api.project.getAllProjects.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      <h2 className="text-center text-4xl">Your Projects</h2>
      <CreateProject />
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {data?.map((project) => {
          return <ProjectItem key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
