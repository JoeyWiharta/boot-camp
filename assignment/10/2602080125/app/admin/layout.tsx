import RoleGuard from "@/components/guard/RoleGuard";
import MainLayout from "@/components/layout/MainLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard requiredRole="admin">
            <MainLayout>{children}</MainLayout>
        </RoleGuard>
    );
}