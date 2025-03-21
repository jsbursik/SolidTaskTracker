import postgres from "postgres";
import dotenv from "dotenv";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

dotenv.config();

const PG_PASS = process.env.POSTGRES_PASS;

const sql = postgres(`postgres://jsbursik:${PG_PASS}@jsbursik.com:5432/dev`);

export async function getTasks() {
  "use server";
  try {
    const tasks = await sql<Task[]>`SELECT * FROM solid.tasks`;
    if (!tasks || tasks.length === 0) {
      throw new Error("No tasks found");
    }
    return tasks;
  } catch (e) {
    console.error("Error retrieving tasks: ", e);
    return [];
  }
}

export default sql;
