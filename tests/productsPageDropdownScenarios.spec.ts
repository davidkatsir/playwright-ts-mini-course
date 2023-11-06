import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";

test.describe("products Page Dropdown Scenarios block", () => {
  const productsDefaultListNameAtoZ: string[] = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
  ];
  const productsDefaultListNameZtoA: string[] = [
    productsDefaultListNameAtoZ[5],
    productsDefaultListNameAtoZ[4],
    productsDefaultListNameAtoZ[3],
    productsDefaultListNameAtoZ[2],
    productsDefaultListNameAtoZ[1],
    productsDefaultListNameAtoZ[0],
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
    await productsPage.validateTitle("Products");
    // Need to add Dropdown handling
    await productsPage.validateProductsByItemNames(productsDefaultListNameAtoZ);
  });

  //   Test Case 02:
  //   Login and navigate to Products Page
  //   Products Page =>  Dropdown = Name (Z to A)
  //   Test that all 6 products are ordered correctly
  
//   test("Product page Dropdown = Name (Z to A)", async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const productsPage = new ProductsPage(page);
//     await loginPage.loginToApplication();
//     await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
//     await productsPage.validateTitle("Products");
//     // Need to add Dropdown handling
//     await productsPage.validateProductsByItemNames(productsDefaultListNameZtoA);
//   });
});
