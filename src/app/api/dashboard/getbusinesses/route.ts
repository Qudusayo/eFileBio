import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  // Get all businesses for a specific user
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const businesses = await prisma.business.findMany({
    where: {
      ownerId: user.id,
    },
  });

  return new Response(JSON.stringify({ businesses }), {
    status: 200,
  });
}
