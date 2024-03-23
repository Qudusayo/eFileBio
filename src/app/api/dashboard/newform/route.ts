import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { businessId } = await request.json();

  if (!session || !session.user || !session.user.email) {
    return redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return redirect("/");
  }

  if (!businessId) {
    return new Response("Business ID is required", {
      status: 400,
    });
  }

  const business = await prisma.business.findUnique({
    where: { id: businessId },
  });

  if (!business) {
    return new Response("Business not found", {
      status: 404,
    });
  }

  const newForm = await prisma.form.create({
    data: {
      businessId: business.id,
    },
  });

  revalidatePath(`/dashboard/${businessId}`);
  return new Response(JSON.stringify(newForm), {
    status: 200,
  });
}
