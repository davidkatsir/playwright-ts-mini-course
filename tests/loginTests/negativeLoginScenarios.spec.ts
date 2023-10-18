import { test } from "@playwright/test";
import ApplicationURL from "../../helpers/ApplicationURL";
import { ErrorMessages } from "../../helpers/ErrorMessages";
import LoginPage from "../../pages/LoginPage";

test.describe("Negative Login Scenarios", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("Login with locked_out_user", async ({ page }) => {
    await loginPage.loginToApplication(process.env.LOCKED_OUT_USER);
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
    await loginPage.loginToApplication(process.env.STANDARD_USER, "wrongPWD");
    await loginPage.validateErrorMessage(
      ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS
    );
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });
});
