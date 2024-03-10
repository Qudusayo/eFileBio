import { Add } from "iconsax-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="bg-white flex-1 rounded-2xl p-6">
        <div className="grid grid-cols-3 gap-6">
          <BusinessCard />
        </div>
      </div>
    </div>
  );
};

const BusinessCard = () => {
  return (
    <div className="bg-[#f59f0b30] rounded-xl border border-dashed border-[#F59E0B] py-8 px-5 cursor-pointer">
      <Add size="100" color="#F59E0B" className="block mx-auto mb-4" />
      <div className="text-center space-y-2">
        <h2 className="font-semibold">Business Card</h2>
        <p className="text-sm text-balance">
          Create a Business to manage eFiling with our help
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
