import { projectRouter } from "~/server/api/routers/project";
import { sprintRouter } from "~/server/api/routers/sprint";
import { todoRouter } from "~/server/api/routers/todo";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  sprint: sprintRouter,
  todo: todoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
