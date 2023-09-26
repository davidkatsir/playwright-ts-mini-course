import { test } from "@playwright/test";
import LoginPage from "../.github/pages/LoginPage";
import UserCredentials from "../helpers/UserCredentials";

test("Sanity test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(
    UserCredentials.PERFORMANCE_GLITCH_USER,
    UserCredentials.CORRECT_PASSWORD
  );

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .click();
  await page.locator("a").filter({ hasText: "3" }).click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill("David");
  await page.locator('[data-test="lastName"]').fill("Katsir");
  // await page.pause();
  await page.locator("form").click();
  await page.locator('[data-test="postalCode"]').fill("17080200");
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.getByRole("link", { name: "Reset App State" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
});

test("Demo test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(
    UserCredentials.LOCKED_OUT_USER,
    UserCredentials.CORRECT_PASSWORD
  );
});

test("Demo test_2", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(
    UserCredentials.STANDARD_USER,
    UserCredentials.CORRECT_PASSWORD
  );
});
