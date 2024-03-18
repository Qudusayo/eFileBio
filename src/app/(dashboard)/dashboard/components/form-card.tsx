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
      className="cursor-pointer space-y-8 rounded-xl border border-[#F5F5F5] bg-[#FAFAFA] px-5 py-8"
      href={`/dashboard/${businessId}/${formId}`}
    >
      <Icons.SystemUpdate className="mx-auto !block h-20 w-20 !rounded-md !bg-transparent text-large" />

      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">BOIR Version {version}</h2>
        <p className="text-center text-sm text-[#525252]">
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
