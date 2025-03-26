import type { APIEvent } from "@solidjs/start/server";
import sql from "~/db/db";

export async function GET() {
  const tasks = await sql`SELECT * FROM solid.tasks`;
  if (!tasks) throw new Error("No tasks found");
  return tasks;
}

export async function POST({ request }: APIEvent) {
  const body = await request.json();
  const task = await sql`
    INSERT INTO solid.tasks (title, description)
    VALUES (${body.title}, ${body.description})
    RETURNING *`;
  return task;
}
