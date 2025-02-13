import "server-only";

import { db } from "~/server/db";
import { user_table as userSchema } from "~/server/db/schema";

export const QUERIES = {};
export const MUTATIONS = {
  createUser: async function (user: {
    name: string;
    email: string;
    password: string;
  }) {
    return await db.insert(userSchema).values(user);
  },
};
