import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";

test("Sanity test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  await loginPage.loginToApplication();
  await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  await productsPage.validateTitle("Products");

  await productsPage.chooseProductByTitle("Sauce Labs Backpack");
  await productsPage.chooseProductByTitle("Sauce Labs Fleece Jacket");
  await productsPage.chooseProductByTitle("Sauce Labs Onesie");

  await productsPage.validateNumberOfItems("3");

  await productsPage.goToCart();
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

test("Demo test_2", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(
    process.env.STANDARD_USER,
    process.env.CORRECT_PASSWORD,
    ApplicationURL.BASE_URL
  );
  const productsPage = new ProductsPage(page);
  await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  await productsPage.validateTitle("Products");
});
