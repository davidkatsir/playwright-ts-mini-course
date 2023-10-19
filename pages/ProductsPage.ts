import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class ProductsPage extends BasePage {
  private pageTitleElement: Locator;
  private itemDescriptionElement: Locator;
  private shopingCartElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.pageTitleElement = this.page.locator('[class="title"]');
    this.itemDescriptionElement = this.page.locator(
      '[class="inventory_item_description"]'
    );
    this.shopingCartElement = this.page.locator(
      'a[class="shopping_cart_link"]'
    );
  }

  public async validateTitle(title: string) {
    await this.validateElementText(this.pageTitleElement, title);
  }

  // public async chooseProductByTitle(expextedProductTitle: string) {
  //   for (let product of await this.itemDescriptionElement.all()) {
  //     const productTitle = await product
  //       .locator('[class="inventory_item_name "]')
  //       .innerText();
  //     if (productTitle === expextedProductTitle) {
  //       await product.locator("button").click();
  //     }
  //   }
  // }

  public async chooseProductByTitle(expextedProductTitle: string) {
    await this.itemDescriptionElement
      .filter({ hasText: expextedProductTitle })
      .locator("button")
      .click();
  }

  public async validateNumberOfItems(expectedNumberOfItems: string) {
    await this.validateElementText(
      this.shopingCartElement,
      expectedNumberOfItems
    );
  }

  public async goToCart() {
    await this.clickElement(this.shopingCartElement);
  }
}
