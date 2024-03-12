import { Avatar } from "@nextui-org/react";
import { Business } from "@prisma/client";
import Link from "next/link";

const BusinessCard = ({ business }: { business: Business }) => {
  return (
    <Link
      className="bg-[#FAFAFA] rounded-xl py-8 px-5 cursor-pointer space-y-8 border border-[#F5F5F5]"
      href={`/dashboard/${business.id}`}
    >
      <Avatar
        src={business.logo ?? ""}
        className="h-16 w-16 text-large !rounded-md !block mx-auto !bg-transparent"
      />

      <div className="text-center space-y-2">
        <h2 className="font-semibold text-xl">{business.name}</h2>
        <p className="text-sm text-center text-[#525252]">
          {business.description}
        </p>
      </div>
    </Link>
  );
};

export default BusinessCard;
