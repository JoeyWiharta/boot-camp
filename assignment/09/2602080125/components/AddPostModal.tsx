"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddPostModal() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const close = () => {
        setOpen(false);
        setError(null);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return;
        try {
            setSaving(true);
            setError(null);
            await addDoc(collection(db, "posts"), {
                title: title.trim(),
                content: content.trim(),
                createdAt: serverTimestamp(),
            });
            setTitle("");
            setContent("");
            setOpen(false);
        } catch (e) {
            console.error(e);
            setError("Gagal menyimpan. Cek koneksi atau Firestore Rules.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
            >
                + Tambah Post
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={close}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="w-full max-w-md rounded-lg bg-white p-6 text-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="mb-4 text-xl font-semibold">Tambah Post</h2>
                        <input
                            className="mb-3 w-full rounded border p-2"
                            placeholder="Judul"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="mb-3 w-full rounded border p-2"
                            rows={4}
                            placeholder="Isi post"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {error && (
                            <p role="alert" className="mb-3 text-red-600">
                                {error}
                            </p>
                        )}
                        <div className="flex justify-end gap-2">
                            <button onClick={close} className="rounded border px-4 py-2">
                                Batal
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving || !title.trim() || !content.trim()}
                                className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                            >
                                {saving ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}