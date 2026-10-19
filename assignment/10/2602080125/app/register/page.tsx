"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, User, UserPlus } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { authFirebase, dbFirebase } from "@/lib/firebase";
import { useAuth } from "@/components/provider/auth-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";

const schema = z.object({
    name: z
        .string()
        .min(1, "Nama wajib diisi")
        .max(50, "Nama maksimal 50 karakter"),
    email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
    password: z
        .string()
        .min(1, "Password wajib diisi")
        .min(6, "Password minimal 6 karakter"),
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    useEffect(() => {
        if (!loading && user) router.replace("/user/profile");
    }, [user, loading, router]);

    const onSubmit = async (data: FormData) => {
        try {
            const cred = await createUserWithEmailAndPassword(
                authFirebase,
                data.email,
                data.password
            );
            await setDoc(doc(dbFirebase, "users", cred.user.uid), {
                email: cred.user.email,
                name: data.name,
                role: "user",
                createdAt: serverTimestamp(),
            });
            toast.success("Registrasi berhasil");
            router.push("/user/profile");
        } catch (e: unknown) {
            console.error(e);
            const code = (e as { code?: string }).code;
            toast.error(
                code === "auth/email-already-in-use"
                    ? "Registrasi gagal: email sudah terdaftar"
                    : `Registrasi gagal (${code ?? "unknown"})`
            );
        }
    };

    return (
        <main className="flex flex-1 items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <UserPlus className="size-5" />
                    </div>
                    <CardTitle className="text-xl">Buat akun</CardTitle>
                    <CardDescription>Isi data di bawah untuk mendaftar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <InputGroup>
                                <InputGroupInput
                                    id="name"
                                    placeholder="Nama lengkap"
                                    autoComplete="name"
                                    required
                                    maxLength={50}
                                    aria-invalid={!!errors.name}
                                    {...register("name")}
                                />
                                <InputGroupAddon align="inline-start">
                                    <User />
                                </InputGroupAddon>
                            </InputGroup>
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <InputGroup>
                                <InputGroupInput
                                    id="email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    autoComplete="email"
                                    required
                                    aria-invalid={!!errors.email}
                                    {...register("email")}
                                />
                                <InputGroupAddon align="inline-start">
                                    <Mail />
                                </InputGroupAddon>
                            </InputGroup>
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <InputGroup>
                                <InputGroupInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimal 6 karakter"
                                    autoComplete="new-password"
                                    required
                                    minLength={6}
                                    aria-invalid={!!errors.password}
                                    {...register("password")}
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        type="button"
                                        size="icon-xs"
                                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                        onClick={() => setShowPassword((s) => !s)}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                "Register"
                            )}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Sudah punya akun?{" "}
                            <Link href="/login" className="font-medium text-foreground underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}