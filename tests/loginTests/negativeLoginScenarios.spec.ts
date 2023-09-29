import LoginPage from "../../.github/pages/LoginPage";

import { test } from "@playwright/test";
import { ErrorMessages } from "../../helpers/ErrorMessages";
import UserCredentials from "../../helpers/UserCredentials";
import ApplicationURL from "../../helpers/ApplicationURL";

test.describe("Negative Login Scenarios", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("Login with locked_out_user", async ({ page }) => {
    await loginPage.loginToApplication(UserCredentials.LOCKED_OUT_USER);
    await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test("Login with incorrect Username", async ({ page }) => {
    await loginPage.loginToApplication("incorrectUser");
    await loginPage.validateErrorMessage(
      ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS
    );
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test("Login with incorrect Password", async ({ page }) => {
    await loginPage.loginToApplication(
      UserCredentials.STANDARD_USER,
      "wrongPWD"
    );
    await loginPage.validateErrorMessage(
      ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS
    );
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });
});
