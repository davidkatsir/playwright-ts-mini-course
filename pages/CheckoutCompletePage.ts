import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutCompletePage extends BasePage {
  private backHomeButton: Locator;
  private thankYouMessageElement: Locator;
  constructor(protected page: Page) {
    super(page);
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.thankYouMessageElement = page.locator('[class="complete-header"]');
  }

  public async goBackToProducts() {
    await this.clickElement(this.backHomeButton);
  }

  public async validateFinalMessage(expectedMessage: string) {
    await this.validateElementText(
      this.thankYouMessageElement,
      expectedMessage
    );
  }
}
