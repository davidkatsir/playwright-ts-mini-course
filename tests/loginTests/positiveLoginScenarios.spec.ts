import LoginPage from "../../.github/pages/LoginPage";

import { test } from "@playwright/test";
import ApplicationURL from "../../helpers/ApplicationURL";
import UserCredentials from "../../helpers/UserCredentials";

test.describe("Positive Login Scenarios", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  })

  test("Login with standard_user", async ({ page }) => {
    await loginPage.loginToApplication(UserCredentials.STANDARD_USER)
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
  })

  test("Login with problem_user", async ({ page }) => {
    await loginPage.loginToApplication(UserCredentials.PROBLEM_USER)
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
  })

  test("Login with performance_glitch_user", async ({ page }) => {
    await loginPage.loginToApplication(UserCredentials.PERFORMANCE_GLITCH_USER)
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
  })
})
