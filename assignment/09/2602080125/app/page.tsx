import Link from "next/link";

const cards = [
  {
    href: "/posts-getdocs",
    title: "Browse Posts",
    desc: "Lihat semua post publik, dimuat sekali saat halaman dibuka.",
    note: "getDocs",
  },
  {
    href: "/posts",
    title: "Live Feed",
    desc: "Feed real-time dengan pencarian judul. Post baru muncul tanpa refresh.",
    note: "onSnapshot",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 p-6 py-16">

      {/*  Header Apps */}

      <header className="text-start flex flex-col gap-4">
        <h1 className="text-5xl font-medium tracking-tight">Public Posts</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Public Post Board — tempat berbagi dan membaca post secara real-time.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col justify-between rounded-xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {c.desc}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="font-medium group-hover:underline">Buka →</span>
              <code className="text-xs text-zinc-500">{c.note}</code>
            </div>
          </Link>
        ))}
      </section>

      <footer className="text-center text-xs text-zinc-500">
        Assignment 09 · Next.js + Firebase Firestore
      </footer>
    </main>
  );
}