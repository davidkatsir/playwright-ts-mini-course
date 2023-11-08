import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";

test.describe("products Page Dropdown Scenarios block", () => {
  const pageTitle = "Products";
  const productsDefaultListNameAtoZ: string[] = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
  ];
  const productsListNameZtoA: string[] = [
    productsDefaultListNameAtoZ[5],
    productsDefaultListNameAtoZ[4],
    productsDefaultListNameAtoZ[3],
    productsDefaultListNameAtoZ[2],
    productsDefaultListNameAtoZ[1],
    productsDefaultListNameAtoZ[0],
  ];
  const productsListPriceLowToHigh: string[] = [
    productsDefaultListNameAtoZ[4],
    productsDefaultListNameAtoZ[1],
    productsDefaultListNameAtoZ[2],
    productsDefaultListNameAtoZ[5],
    productsDefaultListNameAtoZ[0],
    productsDefaultListNameAtoZ[3],
  ];
  const productsListPriceHighToLow: string[] = [
    productsDefaultListNameAtoZ[3],
    productsDefaultListNameAtoZ[0],
    productsDefaultListNameAtoZ[2],
    productsDefaultListNameAtoZ[5],
    productsDefaultListNameAtoZ[1],
    productsDefaultListNameAtoZ[4],
  ];

  const dropdownOptions: string[] = [
    "az", // "Name (A to Z)"
    "za", // "Name (Z to A)"
    "lohi", // "Price (low to high)"
    "hilo", // "Price (high to low)"
  ];

  // Test Case 01:
  // Login and navigate to Products Page
  // Products Page =>  Dropdown = Name (A to Z)
  // Test that all 6 products are ordered correctly
  test("Product page Dropdown = Name (A to Z)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(pageTitle);
    // await page.pause();
    await productsPage.selectDropdownOption(dropdownOptions[0]);
    await productsPage.validateProductsByItemNames(productsDefaultListNameAtoZ);
  });

  //   Test Case 02:
  //   Login and navigate to Products Page
  //   Products Page =>  Dropdown = Name (Z to A)
  //   Test that all 6 products are ordered correctly
  test("Product page Dropdown = Name (Z to A)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(pageTitle);
    // await page.pause();
    await productsPage.selectDropdownOption(dropdownOptions[1]);
    await productsPage.validateProductsByItemNames(productsListNameZtoA);
  });

  //   Test Case 03:
  //   Login and navigate to Products Page
  //   Products Page =>  Dropdown = Price (Low to High)
  //   Test that all 6 products are ordered correctly
  test("Product page Dropdown = Price (low to high)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(pageTitle);
    // await page.pause();
    await productsPage.selectDropdownOption(dropdownOptions[2]);
    await productsPage.validateProductsByItemNames(productsListPriceLowToHigh);
  });

  //   Test Case 04:
  //   Login and navigate to Products Page
  //   Products Page =>  Dropdown = Price (High to Low)
  //   Test that all 6 products are ordered correctly
  test("Product page Dropdown = Price (high to low)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(pageTitle);
    // await page.pause();
    await productsPage.selectDropdownOption(dropdownOptions[3]);
    await productsPage.validateProductsByItemNames(productsListPriceHighToLow);
  });
});
