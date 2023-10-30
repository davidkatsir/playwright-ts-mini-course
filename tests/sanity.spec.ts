import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import PageTitles from "../helpers/PageTitles";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";
import CheckoutOverviewPage from "../pages/CheckoutOverviewPage";
import CheckoutYourInformationPage from "../pages/CheckoutYourInformationPage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import YourCartPage from "../pages/YourCartPage";

test.describe("Sanity Tests Block", () => {
  const products = [
    "Sauce Labs Backpack",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
  ];
  const firstName = "David";
  const lastName = "Katsir";
  const postalCode = "17000";
  const checkoutCompletePageFinalMessage = "Thank you for your order!";

  test("Validate doing simple transaction", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const yourCartPage = new YourCartPage(page);
    const checkoutYourInfoPage = new CheckoutYourInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle("Products");

    await productsPage.chooseProductByTitle(products[0]);
    await productsPage.chooseProductByTitle(products[1]);
    await productsPage.chooseProductByTitle(products[2]);

    await productsPage.validateNumberOfItems(products.length.toString());

    await productsPage.goToCart();

    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
    await yourCartPage.validateNumberOfItems(products.length);
    await yourCartPage.validateItemExistsInCart(products[0]);
    await yourCartPage.validateItemExistsInCart(products[1]);
    await yourCartPage.validateItemExistsInCart(products[2]);
    await yourCartPage.goToCheckout();
    // await page.pause();

    await checkoutYourInfoPage.validatePageUrl(
      ApplicationURL.CHECKOUT_YOUR_INFO_PAGE_URL
    );
    await checkoutYourInfoPage.validateTitle(
      PageTitles.CHECKOUT_YOUR_INFO_PAGE
    );
    await checkoutYourInfoPage.fillInformation(firstName, lastName, postalCode);
    await checkoutYourInfoPage.goToCheckoutOverview();

    await checkoutOverviewPage.validatePageUrl(
      ApplicationURL.CHECKOUT_OVERVIEW_PAGE_URL
    );
    await checkoutOverviewPage.validateTitle(PageTitles.CHECKOUT_OVERVIEW_PAGE);
    await checkoutOverviewPage.clickFinnishButton();

    await checkoutCompletePage.validatePageUrl(
      ApplicationURL.CHECKOUT_COMPLETE_PAGE_URL
    );
    await checkoutCompletePage.validateTitle(PageTitles.CHECKOUT_COMPLETE_PAGE);
    await checkoutCompletePage.validateFinalMessage(
      checkoutCompletePageFinalMessage
    );

    // await page.locator('[data-test="back-to-products"]').click();
    // await page.getByRole("button", { name: "Open Menu" }).click();
    // await page.getByRole("link", { name: "Reset App State" }).click();
    // await page.getByRole("link", { name: "Logout" }).click();
  });
});
