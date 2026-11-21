import { expect, test } from "@playwright/test";

test.describe("Flujo crítico: registrar cliente", () => {
  test("registra un cliente válido y muestra su segmento", async ({ page }) => {
    await page.goto("/clientes");

    await page.getByLabel("Nombre").fill("Ferretería Lima SAC");
    await page.getByLabel("Email").fill("ventas@ferreteria.pe");
    await page.getByLabel("RUC").fill("20123456789");
    await page.getByLabel("Monto de compras (S/)").fill("1500");
    await page.getByRole("button", { name: "Guardar cliente" }).click();

    const lista = page.getByRole("list", { name: "Lista de clientes" });
    await expect(lista).toContainText("Ferretería Lima SAC");
    await expect(lista).toContainText("frecuente");
  });

  test("muestra errores si el formulario es inválido", async ({ page }) => {
    await page.goto("/clientes");

    await page.getByLabel("Nombre").fill("A");
    await page.getByLabel("Email").fill("no-es-email");
    await page.getByRole("button", { name: "Guardar cliente" }).click();

    await expect(page.getByRole("alert", { name: "Errores del formulario" })).toContainText(
      "Email inválido",
    );
  });
});

test("health check responde ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();
  expect((await res.json()).status).toBe("ok");
});
