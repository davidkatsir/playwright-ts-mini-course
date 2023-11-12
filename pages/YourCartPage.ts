import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class YourCartPage extends BasePage {
  private cartItem: Locator;
  private cartItemName: Locator;
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;
  private itemToRemoveFromCart: Locator;

  constructor(protected page: Page) {
    super(page);
    this.cartItem = this.page.locator('[class="cart_item"]');
    this.cartItemName = this.page.locator('[class="inventory_item_name"]');
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
    this.continueShoppingButton = this.page.locator(
      '[data-test="continue-shopping"]'
    );
    this.itemToRemoveFromCart = this.page.locator("");
  }

  public async validateNumberOfItems(expectedNumber: number) {
    await expect(this.cartItem).toHaveCount(expectedNumber);
  }

  public async validateItemExistsInCart(productName: string) {
    await expect(
      this.cartItemName.filter({ hasText: productName })
    ).toBeVisible();
  }

  public async goToCheckout() {
    await this.clickElement(this.checkoutButton);
  }

  public async continueShopping() {
    await this.clickElement(this.continueShoppingButton);
  }

  // This is what this function does:
  // -------------------------------
  // Input: Sauce Labs Bike Light
  // Output: remove-sauce-labs-bike-light

  // Explanation to '.replace(/\s+/g, "-")' -
  // '/': Delimiters for the regular expression.
  // '\s+': This matches one or more whitespace characters.
  // 'g': Global flag. It ensures that the replacement is applied globally to all occurrences in the input string.
  // So, '/\s+/g' is saying "find all occurrences of one or more whitespace characters in the string."

  public convertToSlug(productName: string): string {
    // Replace spaces with dashes and make all string to be a lowercase one
    const productNameToSlug = productName.replace(/\s+/g, "-").toLowerCase();
    // Add "remove-" to the beginning of the string
    const resultStr = `remove-${productNameToSlug}`;
    return resultStr;
  }

  public async removeItemFromCart(productName: string) {
    this.itemToRemoveFromCart = this.page.locator(
      `[data-test="${this.convertToSlug(productName)}"]`
    );
    await this.clickElement(this.itemToRemoveFromCart);
  }
}
