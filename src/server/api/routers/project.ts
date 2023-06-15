import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,

} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({


  getAllProjects: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),


});
