import { test } from "@playwright/test";
import ApplicationURL from "../../helpers/ApplicationURL";
import PageTitles from "../../helpers/PageTitles";
import LoginPage from "../../pages/LoginPage";
import ProductsPage from "../../pages/ProductsPage";

test.describe("Positive Login Scenarios", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
  });

  test.afterEach(async () => {
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
  });

  test("Login with standard_user", async () => {
    await loginPage.loginToApplication(process.env.STANDARD_USER);
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });

  test("Login with problem_user", async () => {
    await loginPage.loginToApplication(process.env.PROBLEM_USER);
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });

  test("Login with performance_glitch_user", async () => {
    await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER);
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });
});
