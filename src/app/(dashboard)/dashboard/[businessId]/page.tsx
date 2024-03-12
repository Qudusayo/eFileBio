import Link from "next/link";
import { ArrowLeft } from "iconsax-react";
import { Avatar, Button } from "@nextui-org/react";
import prisma from "@/lib/db";

const page = async ({ params }: { params: { businessId: string } }) => {
  const { businessId } = params;

  async function getBusiness() {
    const res = await prisma.business.findUnique({
      where: {
        id: businessId,
      },
    });

    return res;
  }

  const business = await getBusiness();

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div>
      <div className="bg-[#FAFAFA] border border-[#F5F5F5] rounded-2xl flex items-center justify-between p-3">
        <div className="flex gap-4 w-fit">
          <Avatar
            src={business.logo ?? ""}
            className="h-12 w-12 text-large !rounded-md !block mx-auto !bg-transparent"
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
    </div>
  );
};

export default page;
