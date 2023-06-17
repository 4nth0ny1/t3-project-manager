import { TodoItem } from "./TodoItem";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

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
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        {data?.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
}
