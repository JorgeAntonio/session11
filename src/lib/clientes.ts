import { z } from "zod";

// Mismo schema que en la sesión 8: la validación vive en un solo lugar
// y se puede probar sin navegador ni base de datos.
export const clienteSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().trim().email("Email inválido"),
  ruc: z
    .string()
    .trim()
    .regex(/^(10|15|17|20)\d{9}$/, "RUC inválido (11 dígitos, empieza en 10, 15, 17 o 20)"),
  montoCompras: z.number().nonnegative("El monto no puede ser negativo").default(0),
});

export type Cliente = z.infer<typeof clienteSchema>;

export type Segmento = "nuevo" | "frecuente" | "vip";

// Regla de negocio pura: perfecta para un test unitario.
export function calcularSegmento(montoCompras: number): Segmento {
  if (montoCompras < 0) throw new Error("Monto negativo");
  if (montoCompras >= 10000) return "vip";
  if (montoCompras >= 1000) return "frecuente";
  return "nuevo";
}

export function validarCliente(data: unknown) {
  const resultado = clienteSchema.safeParse(data);
  if (!resultado.success) {
    return {
      ok: false as const,
      errores: resultado.error.issues.map((i) => i.message),
    };
  }
  return { ok: true as const, cliente: resultado.data };
}
