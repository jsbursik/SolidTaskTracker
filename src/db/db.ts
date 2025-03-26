import postgres from "postgres";
import dotenv from "dotenv";

import type { Task } from "~/types";

dotenv.config();

const PG_PASS = process.env.POSTGRES_PASS;

const sql = postgres(`postgres://jsbursik:${PG_PASS}@jsbursik.com:5432/dev`);

export async function getTasks() {
  "use server";
  console.log("Loading Tasks from DB");
  try {
    const tasks = await sql<Task[]>`SELECT * FROM solid.tasks ORDER BY "ID"`;
    if (!tasks || tasks.length === 0) {
      throw new Error("No tasks found");
    }
    return tasks;
  } catch (e) {
    console.error("Error retrieving tasks: ", e);
    return [];
  }
}

export async function toggleTask(t: Task) {
  "use server";
  try {
    await sql`UPDATE solid.tasks SET completed = ${!t.completed} WHERE "ID" = ${t.ID}`;
  } catch (e) {
    console.error("Error modifying task: ", e);
  }
}

export default sql;
