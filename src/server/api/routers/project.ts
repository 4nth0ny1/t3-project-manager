import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,

} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({


  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),

  getOneProject: protectedProcedure
  .input(z.object({projectId: z.string().cuid()}))
  .query(({ctx, input}) => {
    return ctx.prisma.project.findUnique({
      where: {
        id: input.projectId
      }
    })
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
