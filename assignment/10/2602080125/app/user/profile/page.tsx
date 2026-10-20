"use client";

import { useAuth } from "@/components/provider/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formatDate = (value?: string | null) =>
    value ? new Date(value).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "-";

export default function ProfilePage() {
    const { user, role } = useAuth();

    const rows: { label: string; value: React.ReactNode }[] = [
        { label: "Email", value: user?.email ?? "-" },
        {
            label: "Role",
            value: role ? <Badge variant={role === "admin" ? "default" : "secondary"}>{role}</Badge> : "-",
        },
        { label: "User ID", value: user?.uid ?? "-" },
        { label: "Created at", value: formatDate(user?.metadata.creationTime) },
        { label: "Last sign-in", value: formatDate(user?.metadata.lastSignInTime) },
    ];

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">User Panel</h1>
                <p className="text-sm text-muted-foreground">Accessible to any authenticated user.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account information</CardTitle>
                    <CardDescription>Details of the account you are signed in with.</CardDescription>
                </CardHeader>
                <CardContent>
                    <dl className="divide-y">
                        {rows.map((row) => (
                            <div
                                key={row.label}
                                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                            >
                                <dt className="text-sm text-muted-foreground">{row.label}</dt>
                                <dd className="min-w-0 break-all text-sm font-medium sm:text-right">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>
        </section>
    );
}