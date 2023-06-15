import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,

} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({


  getAllProjects: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),

  createProject: protectedProcedure
  .input(z.object({name: z.string(), description: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.prisma.project.create({
      data: {
        name: input.name,
        description: input.description,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      }
    })
  })


});
