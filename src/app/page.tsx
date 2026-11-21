import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 p-8">
      <div className="space-y-4 rounded-3xl bg-violet-600 p-10 text-white shadow-xl shadow-violet-600/30">
        <span className="inline-block rounded-full bg-fuchsia-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-fuchsia-950">
          Bootcamp Full Stack + IA
        </span>
        <h1 className="text-4xl font-black tracking-tight">Mi CRM</h1>
        <p className="text-violet-100">Aplicación del bootcamp: probada, con CI y desplegada.</p>
        <Link
          href="/clientes"
          className="inline-block rounded-xl bg-cyan-300 px-5 py-3 font-bold text-cyan-950 transition hover:bg-cyan-200"
        >
          Ir a Clientes →
        </Link>
      </div>
    </main>
  );
}
