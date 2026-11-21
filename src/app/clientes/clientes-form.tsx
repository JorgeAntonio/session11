"use client";

import { useState } from "react";
import { calcularSegmento, validarCliente, type Cliente } from "@/lib/clientes";

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
      <form onSubmit={onSubmit} className="grid gap-3" noValidate>
        <label className="grid gap-1">
          Nombre
          <input name="nombre" className="rounded border p-2" />
        </label>
        <label className="grid gap-1">
          Email
          <input name="email" type="email" className="rounded border p-2" />
        </label>
        <label className="grid gap-1">
          RUC
          <input name="ruc" className="rounded border p-2" />
        </label>
        <label className="grid gap-1">
          Monto de compras (S/)
          <input name="montoCompras" type="number" className="rounded border p-2" />
        </label>
        <button type="submit" className="rounded bg-black p-2 text-white">
          Guardar cliente
        </button>
      </form>

      {errores.length > 0 && (
        <ul role="alert" aria-label="Errores del formulario" className="text-red-600">
          {errores.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <ul aria-label="Lista de clientes" className="divide-y">
        {clientes.map((c) => (
          <li key={c.ruc} className="flex justify-between py-2">
            <span>{c.nombre}</span>
            <span className="text-sm uppercase">{calcularSegmento(c.montoCompras)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
