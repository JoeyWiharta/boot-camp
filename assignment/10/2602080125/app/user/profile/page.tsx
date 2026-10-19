"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/provider/auth-provider";
import { RoleGuard } from "@/components/guard/role-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

function ProfileContent() {
    const { user, role, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        toast.success("Logout berhasil");
        router.push("/login");
    };

    return (
        <main className="flex flex-1 items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>Email: {user?.email}</p>
                    <p>Role: {role}</p>
                    {role === "admin" && (
                        <Link href="/admin/dashboard" className="block underline">
                            Ke Admin Dashboard
                        </Link>
                    )}
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}

export default function ProfilePage() {
    return (
        <RoleGuard>
            <ProfileContent />
        </RoleGuard>
    );
}