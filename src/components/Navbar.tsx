import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">
          <span className="text-[hsl(280,100%,70%)]">T3</span> Project Manager
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <AuthShowcase />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="btn-accent btn rounded-full  px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
