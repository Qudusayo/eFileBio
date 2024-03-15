import AuthNav from "../../components/auth-nav";
import Sidebar from "../../components/sidebar";
import { AuthProvider } from "../context/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <section className="h-screen flex">
        <Sidebar />
        <div className="bg-[#FAFAFA] h-full flex-1 flex flex-col">
          <AuthNav />
          <div className="px-4 py-5 overflow-y-auto flex-1 mb-8">
            {children}
          </div>
        </div>
      </section>
    </AuthProvider>
  );
}
