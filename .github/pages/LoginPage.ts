import { Locator, Page, expect } from "@playwright/test";
import ApplicationURL from "../../helpers/ApplicationURL";
import UserCredentials from "../../helpers/UserCredentials";

export default class LoginPage {
  private userNameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;

  constructor(protected page: Page) {
    this.userNameField = this.page.locator('[data-test="username"]');
    this.passwordField = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

  public async loginToApplication(
    username = UserCredentials.STANDARD_USER,
    password = UserCredentials.CORRECT_PASSWORD,
    url = ApplicationURL.BASE_URL
  ) {
    await this.page.goto(url);
    await this.validatePageUrl(ApplicationURL.BASE_URL);

    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.validatePageUrl(`${ApplicationURL.BASE_URL}inventory.html`);
  }

  public async validatePageUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }
}
