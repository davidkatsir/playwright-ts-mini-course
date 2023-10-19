import test, { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
  constructor(protected page: Page) {}

  public async validatePageUrl(url: string) {
    await test.step(`Validating that a correct value of URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
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
}
