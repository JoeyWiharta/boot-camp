"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Posts } from "@/types/posts";

export default function PostsGetDocsPage() {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        (async () => {
            const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Posts));
        })();
    }, []);

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-4 text-2xl font-bold">Posts (getDocs)</h1>
            {posts.map((p) => (
                <article key={p.id} className="mb-4 rounded border p-4">
                    <h2 className="text-lg font-semibold">{p.title}</h2>
                    <p>{p.content}</p>
                </article>
            ))}
        </main>
    );
}