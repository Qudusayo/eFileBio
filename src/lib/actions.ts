"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BusinessSchema = z.object({
  name: z.coerce
    .string({
      required_error: "Business name is required",
    })
    .min(3, {
      message: "Business name must be at least 3 characters long",
    }),
  description: z.string(),
  logo: z.string(),
});

export async function createBusiness(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return redirect("/login");
  }

  const businessFormData = BusinessSchema.safeParse({
    logo: formData.get("logoUrl"),
    name: formData.get("businessName"),
    description: formData.get("businessDescription"),
  });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return redirect("/");
  }

  if (!businessFormData.success) {
    return {
      errors: businessFormData.error.flatten().fieldErrors,
    };
  }

  const newBusiness = await prisma.business.create({
    data: {
      logo: businessFormData.data.logo,
      name: businessFormData.data.name,
      description: businessFormData.data.description,
      ownerId: user.id,
    },
  });

  if (!newBusiness) {
    return {
      errors: {
        server: "Failed to create business",
      },
    };
  }

  revalidatePath("/dashboard");
  return {
    business: newBusiness,
    created: true,
  };
}
