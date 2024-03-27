import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutOverviewPage extends BasePage {
  private finishButton: Locator;
  private cancelButton: Locator;
  private priceTotalItemTotalTextElement: Locator;
  private priceTotalTaxTextElement: Locator;
  private totalTextElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.priceTotalItemTotalTextElement = page.locator(
      '[class="summary_subtotal_label"]'
    );
    this.priceTotalTaxTextElement = page.locator('[class="summary_tax_label"]');
    this.totalTextElement = page.locator('[data-test="total-label"]');
  }

  public async clickFinishButton() {
    await this.clickElement(this.finishButton);
  }

  public async clickCancelButton() {
    await this.clickElement(this.cancelButton);
  }

  public async validatePriceTotalItemTotalValue(
    expectedPriceTotalItemTotalValue: string
  ) {
    await this.validateElementText(
      this.priceTotalItemTotalTextElement,
      expectedPriceTotalItemTotalValue
    );
  }
  public async validatePriceTotalTaxValue(expectedPriceTotalTaxValue: string) {
    await this.validateElementText(
      this.priceTotalTaxTextElement,
      expectedPriceTotalTaxValue
    );
  }
  public async validateTotalValue(expectedTotalValue: string) {
    await this.validateElementText(this.totalTextElement, expectedTotalValue);
  }
}
