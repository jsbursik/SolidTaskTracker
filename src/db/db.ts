"use server";
import postgres from "postgres";
import dotenv from "dotenv";

import type { TaskObj } from "~/types";

dotenv.config();

const PG_PASS = process.env.POSTGRES_PASS;

const sql = postgres(`postgres://jsbursik:${PG_PASS}@jsbursik.com:5432/dev`);

export async function getTasks() {
  console.log("Fetching tasks...");
  try {
    const tasks: TaskObj[] = await sql<TaskObj[]>`SELECT * FROM solid.tasks ORDER BY "ID"`;
    if (!tasks.length) throw new Error("No tasks found");
    return tasks;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function toggleTask(t: TaskObj) {
  console.log("Toggling task...");
  try {
    await sql`UPDATE solid.tasks SET completed = ${!t.completed} WHERE "ID" = ${t.ID}`;
  } catch (e) {
    console.error(e);
  }
}
