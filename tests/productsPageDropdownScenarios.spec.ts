import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import PageTitles from "../helpers/PageTitles";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/productsPage/ProductsPage";
import ProductsPageData from "../pages/productsPage/ProductsPageData";

test.describe("products Page Dropdown Scenarios block", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let productsPageData: ProductsPageData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    productsPageData = new ProductsPageData();
  });
  // Test Case 01:
  // Login and navigate to Products Page
  // Products Page =>  Dropdown = Name (A to Z)
  // Test that all 6 products are ordered correctly
  test("Product page Dropdown = Name (A to Z)", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    // await page.pause();
    await productsPage.selectDropdownOption(
      productsPageData.dropdownOptions[0]
    );
    await productsPage.validateProductsByItemNames(
      productsPageData.productsDefaultListNameAtoZ
    );
  });

  //   Test Case 02:
  //   Login and navigate to Products Page
  //   Products Page =>  Dropdown = Name (Z to A)
  //   Test that all 6 products are ordered correctly
  test("Product page Dropdown = Name (Z to A)", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    // await page.pause();
    await productsPage.selectDropdownOption(
      productsPageData.dropdownOptions[1]
    );
    await productsPage.validateProductsByItemNames(
      productsPageData.productsListNameZtoA
    );
  });

  //   Test Case 03:
  //   Login and navigate to Products Page
  //   Products Page =>  Dropdown = Price (Low to High)
  //   Test that all 6 products are ordered correctly
  test("Product page Dropdown = Price (low to high)", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    // await page.pause();
    await productsPage.selectDropdownOption(
      productsPageData.dropdownOptions[2]
    );
    await productsPage.validateProductsByItemNames(
      productsPageData.productsListPriceLowToHigh
    );
  });

  //   Test Case 04:
  //   Login and navigate to Products Page
  //   Products Page =>  Dropdown = Price (High to Low)
  //   Test that all 6 products are ordered correctly
  test("Product page Dropdown = Price (high to low)", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    // await page.pause();
    await productsPage.selectDropdownOption(
      productsPageData.dropdownOptions[3]
    );
    await productsPage.validateProductsByItemNames(
      productsPageData.productsListPriceHighToLow
    );
  });
});
