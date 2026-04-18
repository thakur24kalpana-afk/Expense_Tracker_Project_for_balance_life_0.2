import { db } from "../../../../lib/db/db";
import { expenses } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await db
    .delete(expenses)
    .where(eq(expenses.id, Number(params.id)));

  return Response.json({ success: true });
}