import { type NextPage } from "next";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { TodoList } from "../../../components/todos/TodoList";

const SingleSprintPage: NextPage = () => {
  const router = useRouter();
  const sprintId = router.query.sprintId as string;

  const { data, isLoading, isError } = api.sprint.getOneSprint.useQuery({
    sprintId,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went wrong:</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl">{data?.name}</h2>
        <p>{data?.number}</p>
      </div>

      <TodoList />
    </>
  );
};

export default SingleSprintPage;
