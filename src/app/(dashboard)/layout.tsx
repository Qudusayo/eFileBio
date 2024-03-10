import AuthNav from "../../components/auth-nav";
import Sidebar from "../../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex">
      <Sidebar />
      <div className="bg-[#FAFAFA] h-full flex-1 flex flex-col">
        <AuthNav />
        <div className="px-4 py-5 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </section>
  );
}
