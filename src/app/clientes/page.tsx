import type { Metadata } from "next";
import ClientesForm from "./clientes-form";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Registro y segmentación de clientes",
};

export default function ClientesPage() {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-black tracking-tight text-violet-700 dark:text-violet-300">
        Clientes
      </h1>
      <ClientesForm />
    </main>
  );
}
