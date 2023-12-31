import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const router = useRouter();

  const sprintId = router.query.sprintId as string;

  const { data, isLoading, isError } = api.todo.getAllTodos.useQuery({
    sprintId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <h1>hi there</h1>
        {data?.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
}
