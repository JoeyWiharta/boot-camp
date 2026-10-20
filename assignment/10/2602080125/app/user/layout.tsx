import RoleGuard from "@/components/guard/RoleGuard";
import MainLayout from "@/components/layout/MainLayout";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard>
            <MainLayout>{children}</MainLayout>
        </RoleGuard>
    );
}