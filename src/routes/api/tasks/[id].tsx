import type { APIEvent } from "@solidjs/start/server";
import sql from "~/db/db";

export async function GET({ params }: APIEvent) {
  try {
    const id = params.id;
    const response = await sql`SELECT * FROM solid.tasks WHERE "ID" = ${id}`;
    if (!response || response.length === 0) {
      throw new Error("No task found");
    }
    return response;
  } catch (e) {
    console.error("Error fetching task: ", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// If a task exists with the given ID, it's "completed" boolean column will be flipped
export async function POST({ params }: APIEvent) {
  try {
    const id = params.id;
    const response = await sql`SELECT * FROM solid.tasks WHERE "ID" = ${id}`;
    if (response.length === 0) {
      throw new Error("No task found");
    }
    const task = response[0];
    task.completed = !task.completed;
    const updated = await sql`UPDATE solid.tasks SET "completed" = ${task.completed} WHERE "ID" = ${id}`;
    return updated;
  } catch (e) {
    console.error("Error updating task: ", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
