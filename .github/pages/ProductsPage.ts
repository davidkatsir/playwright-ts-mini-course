import { Locator, Page, expect } from "@playwright/test";

export default class ProductsPage {
  private pageTitle: Locator;

  constructor(protected page: Page) {
    this.pageTitle = this.page.locator('[class="title"]');
  }

  public async validateTitle(title: string) {
    await expect(this.pageTitle).toContainText(title);
  }

  public async validatePageUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }
  
}
