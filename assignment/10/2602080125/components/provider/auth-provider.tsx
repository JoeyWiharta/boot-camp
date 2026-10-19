"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { authFirebase, dbFirebase } from "@/lib/firebase";

export type Role = "user" | "admin";

type AuthContextType = {
    user: User | null;
    role: Role | null;
    loading: boolean;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(authFirebase, async (u) => {
            setUser(u);
            if (u) {
                // saat register, dokumen user ditulis setelah akun dibuat,
                // jadi coba baca beberapa kali sebentar
                let r: Role | null = null;
                for (let i = 0; i < 5 && !r; i++) {
                    try {
                        const snap = await getDoc(doc(dbFirebase, "users", u.uid));
                        if (snap.exists()) r = snap.data().role as Role;
                    } catch { }
                    if (!r) await new Promise((res) => setTimeout(res, 500));
                }
                setRole(r);
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        return unsub;
    }, []);

    const logout = async () => {
        await signOut(authFirebase);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}