import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import PageTitles from "../helpers/PageTitles";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";
import CheckoutOverviewPage from "../pages/CheckoutOverviewPage";
import CheckoutYourInformationPage from "../pages/CheckoutYourInformationPage";
import LoginPage from "../pages/LoginPage";
import YourCartPage from "../pages/YourCartPage";
import ProductsPage from "../pages/productsPage/ProductsPage";
import ProductsPageData from "../pages/productsPage/ProductsPageData";

test.describe("Sanity Tests Block", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let productsPageData: ProductsPageData;
  let yourCartPage: YourCartPage;
  let checkoutYourInfoPage: CheckoutYourInformationPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;
  const firstName = "David";
  const lastName = "Katsir";
  const postalCode = "17000";
  const checkoutCompletePageFinalMessage = "Thank you for your order!";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    productsPageData = new ProductsPageData();
    yourCartPage = new YourCartPage(page);
    checkoutYourInfoPage = new CheckoutYourInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test("Validate doing simple transaction", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);

    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[3]
    );
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[4]
    );

    await productsPage.validateNumberOfItems("3");

    await productsPage.goToCart();

    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
    await yourCartPage.validateNumberOfItems(3);
    await yourCartPage.validateItemExistsInCart(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await yourCartPage.validateItemExistsInCart(
      productsPageData.productsDefaultListNameAtoZ[3]
    );
    await yourCartPage.validateItemExistsInCart(
      productsPageData.productsDefaultListNameAtoZ[4]
    );
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
    await checkoutOverviewPage.clickFinishButton();

    await checkoutCompletePage.validatePageUrl(
      ApplicationURL.CHECKOUT_COMPLETE_PAGE_URL
    );
    await checkoutCompletePage.validateTitle(PageTitles.CHECKOUT_COMPLETE_PAGE);
    await checkoutCompletePage.validateFinalMessage(
      checkoutCompletePageFinalMessage
    );
  });
});
