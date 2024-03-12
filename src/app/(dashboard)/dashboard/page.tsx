import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Business } from "@prisma/client/edge";
import BusinessCard from "./components/business-card";
import { CreateBusinessModal } from "./components/create-business-modal";

const Dashboard = async () => {
  const businesses = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return redirect("/");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return redirect("/");
    }

    return await prisma.business.findMany({
      where: {
        ownerId: user.id,
      },
    });
  };
  const userBusinesses = await businesses();

  return (
    <div className="grid grid-cols-3 gap-6">
      <CreateBusinessModal />
      {userBusinesses.map((business: Business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
};

export default Dashboard;
