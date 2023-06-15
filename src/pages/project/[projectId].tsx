import { type NextPage } from "next";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const SingleProjectPage: NextPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data, isLoading, isError } = api.project.getOneProject.useQuery({
    projectId,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went wrong:</div>;

  return (
    <div>
      <h2>{data?.name}</h2>
      <p>{data?.description}</p>
    </div>
  );
};

export default SingleProjectPage;
