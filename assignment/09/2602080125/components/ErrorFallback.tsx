"use client";
import type { FallbackProps } from "./ErrorBoundary";

export default function ErrorFallback({ error, reset }: FallbackProps) {
    return (
        <div role="alert" className="rounded-lg border border-red-300 p-6">
            <h2 className="text-xl font-semibold">Oops, terjadi kesalahan 😕</h2>
            <p>Maaf, ada masalah saat menampilkan halaman ini.</p>
            <pre className="text-red-800">{error?.message}</pre>
            <button onClick={reset} className="mt-3 rounded bg-black px-4 py-2 text-white">
                Coba lagi
            </button>
        </div>
    );
}