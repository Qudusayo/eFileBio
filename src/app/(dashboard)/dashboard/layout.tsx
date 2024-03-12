"use client";

import { Button } from "@nextui-org/react";
import { Add } from "iconsax-react";
import { useParams } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {Object.keys(params)[0] === "businessId" && (
          <Button startContent={<Add />}>New BOIR</Button>
        )}
      </div>
      <div className="bg-white flex-1 rounded-2xl p-4">{children}</div>
    </div>
  );
};

export default Layout;
