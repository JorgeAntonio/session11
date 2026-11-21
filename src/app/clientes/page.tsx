import type { Metadata } from "next";
import ClientesForm from "./clientes-form";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Registro y segmentación de clientes",
};

export default function ClientesPage() {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Clientes</h1>
      <ClientesForm />
    </main>
  );
}
