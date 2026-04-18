import { db } from "@/lib/db/db";
import { expenses } from "@/lib/db/schema";

export async function GET() {
  const data = await db.select().from(expenses);
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  await db.insert(expenses).values({
    amount: Number(body.amount),
    description: body.description,
  });

  return Response.json({ success: true });
}