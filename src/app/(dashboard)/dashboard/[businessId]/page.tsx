import prisma from "@/lib/db";
import { Avatar, Button } from "@nextui-org/react";
import { Business, Form } from "@prisma/client";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormCard from "../components/form-card";

const page = async ({ params }: { params: { businessId: string } }) => {
  const { businessId } = params;

  async function getBusiness() {
    const res = await prisma.business.findUnique({
      where: {
        id: businessId,
      },

      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        forms: true,
      },
    });

    return res;
  }
  const business = await getBusiness();

  if (!business) {
    return redirect("/dashboard");
  }

  const businessForms: Form[] = business.forms;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-[#F5F5F5] bg-[#FAFAFA] p-3">
        <div className="flex w-fit gap-4">
          <Avatar
            src={business.logo ?? ""}
            className="mx-auto !block h-12 w-12 !rounded-md !bg-transparent text-large"
          />
          <div>
            <h2 className="text-xl font-semibold">{business.name}</h2>
            <p className="text-sm">{business.description}</p>
          </div>
        </div>
        <Button
          isIconOnly
          aria-label="Like"
          variant="flat"
          className="h-12 w-12"
          as={Link}
          href="/dashboard"
        >
          <ArrowLeft />
        </Button>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessForms.map((form) => (
            <FormCard
              key={form.id}
              formId={form.id}
              businessId={businessId}
              version={form.version}
              updatedAt={form.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
