import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#050807] text-white">
      <main className="container mx-auto flex min-h-[70vh] items-center px-4 py-24">
        <section className="max-w-2xl">
          <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-emerald-200">404</p>
          <h1 className="text-6xl font-black uppercase leading-[0.82] md:text-8xl">This route is not public.</h1>
          <p className="mt-8 text-xl leading-9 text-slate-300">
            The public JAVURO website now focuses on verified participation, token utility, docs, rewards, and community.
          </p>
          <Link href="/">
            <span className="mt-10 inline-flex h-14 items-center justify-center bg-emerald-200 px-6 font-extrabold text-[#07110d]">
              Return home
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
