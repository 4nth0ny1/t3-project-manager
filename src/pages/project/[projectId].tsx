import { type NextPage } from "next";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { TodoList } from "../../components/todos/TodoList";
import { CreateTodo } from "../../components/todos/CreateTodo";

const SingleProjectPage: NextPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data, isLoading, isError } = api.project.getOneProject.useQuery({
    projectId,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went wrong:</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl">{data?.name}</h2>
        <p>{data?.description}</p>
      </div>
      <div>
        <CreateTodo projectId={projectId} />
        <TodoList />
      </div>
    </>
  );
};

export default SingleProjectPage;
