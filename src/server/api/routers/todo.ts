import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAllTodos: protectedProcedure
  .input(z.object({sprintId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.prisma.todo.findMany({
      where: {
        sprint: {
            id: input.sprintId
        },
      },
        orderBy: [{ createdAt: "desc" }],
    });
  }),

//   createSprint: protectedProcedure
//   .input(z.object({name: z.string(), number: z.number(), projectId: z.string()}))
//   .mutation(({ctx, input}) => {
//     return ctx.prisma.sprint.create({
//       data: {
//         name: input.name,
//         number: input.number,
//         user: {
//           connect: {
//             id: ctx.session.user.id
//           }
//         }, 
//         project: {
//           connect: {
//             id: input.projectId
//           }
//         }
//       }
//     })
//   }), 

//   deleteSprint: protectedProcedure
//   .input(z.string())
//   .mutation(({ctx, input}) => {
//     return ctx.prisma.sprint.delete({
//       where: {
//         id: input
//       }
//     })
//   })

})