import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class ProductsPage extends BasePage {
  private itemDescriptionElement: Locator;
  private shopingCartElement: Locator;
  private inventoryItemNameElement: Locator;
  private sortSelect: string;

  constructor(protected page: Page) {
    super(page);
    this.itemDescriptionElement = this.page.locator(
      '[class="inventory_item_description"]'
    );
    this.shopingCartElement = this.page.locator(
      'a[class="shopping_cart_link"]'
    );
    this.inventoryItemNameElement = this.page.locator(
      '[class="inventory_item_name "]'
    );
    this.sortSelect = '[data-test="product_sort_container"]';
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

  public async validateProductsByItemNames(expectedProductNames: string[]) {
    const allItemNameElements = await this.inventoryItemNameElement.all();
    if (expectedProductNames.length !== allItemNameElements.length) {
      throw new Error("Number of product names and elements don't match.");
    }
    for (let i = 0; i < expectedProductNames.length; i++) {
      await this.validateElementText(
        allItemNameElements[i],
        expectedProductNames[i]
      );
    }
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

  public async selectDropdownOption(optionValue: string) {
    await this.page.locator(this.sortSelect).selectOption(optionValue);
  }
}
