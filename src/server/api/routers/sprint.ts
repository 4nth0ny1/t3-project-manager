import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const sprintRouter = createTRPCRouter({
  getAllSprints: protectedProcedure
  .input(z.object({projectId: z.string().cuid()}))
  .query(({ ctx, input }) => {
    return ctx.prisma.sprint.findMany({
      where: {
        project: {
          id: input.projectId
        }
      },
        orderBy: [{ createdAt: "desc" }],
    });
  }),

  getOneSprint: protectedProcedure
  .input(z.object({sprintId: z.string()}))
  .query(async ({ctx, input}) => {
    return await ctx.prisma.sprint.findUnique({
      where: {
        id: input.sprintId
      }
    })
  }),

  createSprint: protectedProcedure
  .input(z.object({name: z.string(), number: z.number(), projectId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.prisma.sprint.create({
      data: {
        name: input.name,
        number: input.number,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }, 
        project: {
          connect: {
            id: input.projectId
          }
        }
      }
    })
  }), 

  deleteSprint: protectedProcedure
  .input(z.string())
  .mutation(({ctx, input}) => {
    return ctx.prisma.sprint.delete({
      where: {
        id: input
      }
    })
  })

})