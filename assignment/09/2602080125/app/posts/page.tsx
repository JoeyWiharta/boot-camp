"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Posts } from "@/types/posts";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";
import AddPostModal from "@/components/AddPostModal";

function PostList() {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(
            q,
            (snap) => {
                setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Posts));
                setError(null);
                setLoading(false);
            },
            (err) => {
                console.error(err);
                setError("Gagal memuat data. Periksa koneksi atau aturan Firestore.");
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    const filtered = useMemo(
        () => posts.filter((p) => p.title?.toLowerCase().includes(keyword.toLowerCase())),
        [posts, keyword]
    );

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p role="alert" className="text-red-600">{error}</p>;

    return (
        <>
            <input
                className="mb-4 w-full rounded border p-2"
                placeholder="Cari berdasarkan judul..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            {filtered.length === 0 ? (
                <p>Tidak ada post yang cocok.</p>
            ) : (
                filtered.map((p) => (
                    <article key={p.id} className="mb-4 rounded border p-4">
                        <h2 className="text-lg font-semibold">{p.title}</h2>
                        <p>{p.content}</p>
                        <small>{p.createdAt?.toDate().toLocaleString("id-ID")}</small>
                    </article>
                ))
            )}
        </>
    );
}

export default function PostsPage() {
    return (
        <main className="mx-auto max-w-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Posts</h1>
                <AddPostModal />
            </div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <PostList />
            </ErrorBoundary>
        </main>
    );
}