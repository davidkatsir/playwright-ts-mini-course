import test, { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
  private cartItemName: Locator;
  constructor(protected page: Page) {
    this.cartItemName = this.page.locator('[class="inventory_item_name"]');
  }

  public async validatePageUrl(url: string) {
    await test.step(`Validating that a correct value of URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

  public async validateTitle(title: string) {
    await this.validateElementText(this.page.locator('[class="title"]'), title);
  }

  protected async validateElementText(element: Locator, expectedText: string) {
    await test.step(`Validating that a correct element text is ${expectedText}`, async () => {
      await expect(element).toContainText(expectedText);
    });
  }

  protected async clickElement(element: Locator) {
    await test.step(`Clicking the '${element}' element`, async () => {
      await element.click();
    });
  }

  protected async fillText(element: Locator, textToFill: string) {
    await test.step(`Filling '${textToFill}' into the '${element}' element`, async () => {
      await element.fill(textToFill);
    });
  }

  public async validateItemExistsInCart(productName: string) {
    await expect(
      this.cartItemName.filter({ hasText: productName })
    ).toBeVisible();
  }
}
