import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { PostCreateInputSchema } from "@acme/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.post.findMany({
      orderBy: {
        id: "desc"
      }
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findFirst({
        where: {
          id: input.id
        }
      });
    }),

  create: protectedProcedure
    .input(PostCreateInputSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({
        data: input
      })
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.post.delete({
      where: {
        id: input
      }
    });
  }),
} satisfies TRPCRouterRecord;
