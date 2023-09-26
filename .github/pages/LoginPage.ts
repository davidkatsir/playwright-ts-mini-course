import { Locator, Page } from "@playwright/test";
import ApplicationURL from "../../helpers/ApplicationURL";

export default class LoginPage {
  userNameField: Locator;
  passwordField: Locator;
  loginButton: Locator;

  constructor(protected page: Page) {
    this.userNameField = this.page.locator('[data-test="username"]');
    this.passwordField = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

  public async loginToApplication(username: string, password: string) {
    await this.page.goto(ApplicationURL.BASE_URL);
    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
