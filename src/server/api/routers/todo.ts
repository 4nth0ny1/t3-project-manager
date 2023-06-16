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

  createTodo: protectedProcedure
  .input(z.object({name: z.string(), description: z.string(), projectId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.prisma.todo.create({
      data: {
        name: input.name,
        description: input.description,
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