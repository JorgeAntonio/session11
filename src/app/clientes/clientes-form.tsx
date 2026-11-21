"use client";

import { useState } from "react";
import { calcularSegmento, validarCliente, type Cliente, type Segmento } from "@/lib/clientes";

const estiloSegmento: Record<Segmento, string> = {
  nuevo: "bg-cyan-400 text-cyan-950",
  frecuente: "bg-amber-300 text-amber-950",
  vip: "bg-fuchsia-500 text-white",
};

const campo =
  "rounded-xl border-2 border-violet-200 bg-white p-2.5 text-violet-950 outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-200 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-50";

export default function ClientesForm() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [errores, setErrores] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const r = validarCliente({
      nombre: form.get("nombre"),
      email: form.get("email"),
      ruc: form.get("ruc"),
      montoCompras: Number(form.get("montoCompras") || 0),
    });
    if (!r.ok) {
      setErrores(r.errores);
      return;
    }
    setErrores([]);
    setClientes((prev) => [...prev, r.cliente]);
    e.currentTarget.reset();
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg shadow-violet-200/50 dark:bg-violet-950/60 dark:shadow-none"
        noValidate
      >
        <label className="grid gap-1.5 font-semibold text-violet-900 dark:text-violet-200">
          Nombre
          <input name="nombre" className={campo} />
        </label>
        <label className="grid gap-1.5 font-semibold text-violet-900 dark:text-violet-200">
          Email
          <input name="email" type="email" className={campo} />
        </label>
        <label className="grid gap-1.5 font-semibold text-violet-900 dark:text-violet-200">
          RUC
          <input name="ruc" className={campo} />
        </label>
        <label className="grid gap-1.5 font-semibold text-violet-900 dark:text-violet-200">
          Monto de compras (S/)
          <input name="montoCompras" type="number" className={campo} />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-violet-600 p-3 font-bold text-white shadow-md shadow-violet-600/30 transition hover:bg-fuchsia-600 active:scale-[0.98]"
        >
          Guardar cliente
        </button>
      </form>

      {errores.length > 0 && (
        <ul
          role="alert"
          aria-label="Errores del formulario"
          className="space-y-1 rounded-xl border-l-4 border-rose-500 bg-rose-100 p-4 font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300"
        >
          {errores.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <ul aria-label="Lista de clientes" className="grid gap-3">
        {clientes.map((c) => {
          const segmento = calcularSegmento(c.montoCompras);
          return (
            <li
              key={c.ruc}
              className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm dark:bg-violet-950/60"
            >
              <span className="font-semibold text-violet-950 dark:text-violet-100">{c.nombre}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${estiloSegmento[segmento]}`}
              >
                {segmento}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
