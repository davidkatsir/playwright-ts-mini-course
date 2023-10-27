import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import PageTitles from "../helpers/PageTitles";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import YourCartPage from "../pages/YourCartPage";

test.describe("Sanity Tests Block", () => {
  const products = [
    "Sauce Labs Backpack",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
  ];

  test("Validate doing simple transaction", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const yourCartPage = new YourCartPage(page);
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle("Products");

    await productsPage.chooseProductByTitle(products[0]);
    await productsPage.chooseProductByTitle(products[1]);
    await productsPage.chooseProductByTitle(products[2]);

    await productsPage.validateNumberOfItems(products.length.toString());

    await productsPage.goToCart();

    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
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
});
