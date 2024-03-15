import Icons from "@/components/icons";
import Link from "next/link";
import React from "react";

const FormCard = ({
  version,
  updatedAt,
  businessId,
  formId,
}: {
  version: number;
  updatedAt: Date;
  businessId: string;
  formId: string;
}) => {
  return (
    <Link
      className="bg-[#FAFAFA] rounded-xl py-8 px-5 cursor-pointer space-y-8 border border-[#F5F5F5]"
      href={`/dashboard/${businessId}/${formId}`}
    >
      <Icons.SystemUpdate className="h-20 w-20 text-large !rounded-md !block mx-auto !bg-transparent" />

      <div className="text-center space-y-2">
        <h2 className="font-semibold text-xl">BOIR Version {version}</h2>
        <p className="text-sm text-center text-[#525252]">
          Last Updated -{" "}
          {updatedAt
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .join(" / ")}
        </p>
      </div>
    </Link>
  );
};

export default FormCard;
