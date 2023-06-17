import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { ProjectList } from "../components/projects/ProjectList";
// import { Card } from "../components/Card";

function Card() {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>DEV-T3-PM</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        {!sessionData ? (
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <div className="flex flex-col items-center gap-2">
              <h1 className="sm:text-xl md:text-3xl lg:text-5xl">
                Welcome to the T3 Project Manager
              </h1>
              <p className="text-2xl">Sign In to Create a Project</p>
              <AuthShowcase />
              <div>
                <Card />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {sessionData && (
          <div>
            <h2 className="text-4xl">Your Projects</h2>
            <ProjectList />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="btn-accent btn rounded-full px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
