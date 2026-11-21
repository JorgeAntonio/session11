import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Mi CRM</h1>
      <p>Aplicación del bootcamp: probada, con CI y desplegada.</p>
      <Link href="/clientes" className="underline">
        Ir a Clientes
      </Link>
    </main>
  );
}
