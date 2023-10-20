import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class YourCartPage extends BasePage {
  private pageTitleElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.pageTitleElement = this.page.locator('[class="title"]');
  }
}
