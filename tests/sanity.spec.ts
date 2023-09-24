import { test } from "@playwright/test";
import LoginPage from "../.github/pages/LoginPage";

const username = "standard_user";
const password = "secret_sauce";

test("Sanity test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(username, password);

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
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(username, password);

});
