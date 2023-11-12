import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutYourInformationPage extends BasePage {
  private firstNameTextField: Locator;
  private lastNameTextField: Locator;
  private postalCodeTextField: Locator;
  private continueButton: Locator;
  private cancelButton: Locator;
  private errorMessageTextElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.firstNameTextField = this.page.locator('[data-test="firstName"]');
    this.lastNameTextField = this.page.locator('[data-test="lastName"]');
    this.postalCodeTextField = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.cancelButton = this.page.locator('[data-test="cancel"]');
    this.errorMessageTextElement = this.page.locator('[data-test="error"]');
  }

  public async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.fillText(this.firstNameTextField, firstName);
    await this.fillText(this.lastNameTextField, lastName);
    await this.fillText(this.postalCodeTextField, postalCode);
  }

  public async goToCheckoutOverview() {
    await this.clickElement(this.continueButton);
  }

  public async cancelCheckout() {
    await this.clickElement(this.cancelButton);
  }

  public async validateErrorMessage(expectedErrorMessage: string) {
    await this.validateElementText(
      this.errorMessageTextElement,
      expectedErrorMessage
    );
  }
}
