import type { Project } from "../../types";
import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import * as LocalizedFormat from "daysjs/plugin/LocalizedFormat";

type ProjectProps = {
  project: Project;
};

// dayjs.extend(relativeTime);
// dayjs.extend(LocalizedFormat);
dayjs().format("L LT");

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description, createdAt } = project;
  return (
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
  );
}
