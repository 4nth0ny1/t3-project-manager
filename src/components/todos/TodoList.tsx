import { TodoItem } from "./TodoItem";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
// import { CreateProject } from "./CreateProject";

export function TodoList() {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data, isLoading, isError } = api.todo.getAllTodos.useQuery({
    projectId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      {/* <CreateProject /> */}
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {data?.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
}
