import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { SprintItem } from "./SprintItem";

export function SprintList() {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data, isLoading, isError } = api.sprint.getAllSprints.useQuery({
    projectId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        {data?.map((sprint) => {
          return <SprintItem key={sprint.id} sprint={sprint} />;
        })}
      </div>
    </div>
  );
}
