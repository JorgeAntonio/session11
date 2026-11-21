import { describe, expect, it } from "vitest";
import { calcularSegmento, validarCliente } from "./clientes";

describe("calcularSegmento", () => {
  it("clasifica como nuevo por debajo de 1000", () => {
    expect(calcularSegmento(0)).toBe("nuevo");
    expect(calcularSegmento(999.99)).toBe("nuevo");
  });

  it("clasifica como frecuente desde 1000 (caso límite)", () => {
    expect(calcularSegmento(1000)).toBe("frecuente");
  });

  it("clasifica como vip desde 10000", () => {
    expect(calcularSegmento(10000)).toBe("vip");
  });

  it("rechaza montos negativos", () => {
    expect(() => calcularSegmento(-1)).toThrow("Monto negativo");
  });
});

describe("validarCliente", () => {
  const valido = {
    nombre: "Ferretería Lima SAC",
    email: "ventas@ferreteria.pe",
    ruc: "20123456789",
    montoCompras: 1500,
  };

  it("acepta un cliente válido", () => {
    const r = validarCliente(valido);
    expect(r.ok).toBe(true);
  });

  it("rechaza un email inválido", () => {
    const r = validarCliente({ ...valido, email: "no-es-email" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errores).toContain("Email inválido");
  });

  it("rechaza un RUC con menos de 11 dígitos", () => {
    const r = validarCliente({ ...valido, ruc: "2012345" });
    expect(r.ok).toBe(false);
  });

  it("rechaza un monto de compras negativo", () => {
    const r = validarCliente({ ...valido, montoCompras: -1 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errores).toContain("El monto no puede ser negativo");
  });
});
