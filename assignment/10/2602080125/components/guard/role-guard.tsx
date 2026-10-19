"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role, useAuth } from "@/components/provider/auth-provider";
import { toast } from "sonner";

export function RoleGuard({
    children,
    requiredRole,
}: {
    children: React.ReactNode;
    requiredRole?: Role;
}) {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!user) router.replace("/login");
        else if (requiredRole && role !== requiredRole) {
            toast.error("Akses ditolak: halaman ini khusus admin");
            router.replace("/user/profile");
        }
    }, [user, role, loading, requiredRole, router]);

    if (loading || !user || (requiredRole && role !== requiredRole)) {
        return <p className="p-8 text-center">Loading...</p>;
    }

    return <>{children}</>;
}