import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
//   publicProcedure,

} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
    getAllTodos: protectedProcedure
    .input(z.object({projectId: z.string().cuid()}))
    .query(({ ctx, input }) => {
      return ctx.prisma.todo.findMany({
        where: {
          project: {
            id: input.projectId
          }
        },
          orderBy: [{ createdAt: "desc" }],
      });
    }),

    deleteTodo: protectedProcedure
    .input(z.string())
    .mutation(({ctx, input}) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input
        }
      })
    })

})