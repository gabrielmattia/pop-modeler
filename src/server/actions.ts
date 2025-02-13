"use server";

import { type UserSignUp } from "~/lib/types/user";
import { MUTATIONS } from "./db/queries";
import { user_table } from "./db/schema";
import { eq } from "drizzle-orm";
import { db } from "./db";

export async function createUser(data: UserSignUp) {
  const user = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  const [users] = await db
    .select()
    .from(user_table)
    .where(eq(user_table.email, user.email));

  console.log("users", users);
  if (users) {
    return { error: "Email already exists" };
  }

  await MUTATIONS.createUser(user);

  return { success: true };
}
