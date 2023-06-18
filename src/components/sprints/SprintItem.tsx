import type { Sprint } from "../../types";
import dayjs from "dayjs";
import { api } from "~/utils/api";
import { IoTrashBinSharp } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";

type SprintProps = {
  sprint: Sprint;
};

dayjs().format("L LT");

export function SprintItem({ sprint }: SprintProps) {
  const { id, name, number, createdAt } = sprint;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.sprint.deleteSprint.useMutation({
    onSettled: async () => {
      await ctx.sprint.getAllSprints.invalidate();
    },
  });

  return (
    <div className="flex w-[800px] flex-col rounded-xl border border-accent p-2 shadow-lg">
      <div className="flex flex-row justify-between gap-4">
        <Link href={`/project/sprint/${id}`}>
          <h2>{name}</h2>
        </Link>

        <span className="font-thin italic">{` Created ${dayjs(createdAt).format(
          "MM/DD/YYYY"
        )}`}</span>
        {number}

        <div className="flex flex-row justify-between">
          <button className="pr-2 text-2xl text-warning">
            <BiEdit />
          </button>
          <button
            className="pr-1 text-2xl text-error"
            onClick={() => deleteMutation(id)}
          >
            <IoTrashBinSharp />
          </button>
        </div>
      </div>
    </div>
  );
}
