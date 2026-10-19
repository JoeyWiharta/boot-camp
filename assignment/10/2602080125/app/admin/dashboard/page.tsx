"use client";

import Link from "next/link";
import { RoleGuard } from "@/components/guard/role-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
    return (
        <RoleGuard requiredRole="admin">
            <main className="flex flex-1 items-center justify-center p-4">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Admin Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p>Welcome, Admin.</p>
                        <Link href="/user/profile" className="underline">
                            Kembali ke Profile
                        </Link>
                    </CardContent>
                </Card>
            </main>
        </RoleGuard>
    );
}